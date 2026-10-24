'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, MousePointer2, Flag, Disc, Zap, Map } from 'lucide-react';

const ROWS = 20;
const COLS = 40;

type NodeType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path' | 'weight';

interface Node {
  row: number;
  col: number;
  type: NodeType;
  distance: number;
  totalDistance: number; // For A* (g + h)
  heuristic: number; // For A* (h)
  previousNode: Node | null;
  weight: number; // 1 for empty, 5 for weight/mud
}

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<Node[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNode, setStartNode] = useState<{ row: number; col: number }>({ row: 10, col: 5 });
  const [endNode, setEndNode] = useState<{ row: number; col: number }>({ row: 10, col: 35 });
  const [algorithm, setAlgorithm] = useState<'dijkstra' | 'bfs' | 'dfs' | 'astar'>('dijkstra');
  const [tool, setTool] = useState<'wall' | 'weight'>('wall');

  const initializeGrid = useCallback(() => {
    const newGrid: Node[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const currentRow: Node[] = [];
      for (let c = 0; c < COLS; c++) {
        let type: NodeType = 'empty';
        if (r === startNode.row && c === startNode.col) type = 'start';
        else if (r === endNode.row && c === endNode.col) type = 'end';

        currentRow.push({
          row: r,
          col: c,
          type,
          distance: Infinity,
          totalDistance: Infinity,
          heuristic: Infinity,
          previousNode: null,
          weight: 1
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  }, [startNode, endNode]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    setMouseIsPressed(true);
    toggleNode(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return;
    toggleNode(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const toggleNode = (row: number, col: number) => {
    if ((row === startNode.row && col === startNode.col) || (row === endNode.row && col === endNode.col)) return;

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      const node = newGrid[row][col];

      if (tool === 'wall') {
           const newType = node.type === 'wall' ? 'empty' : 'wall';
           newGrid[row][col] = { ...node, type: newType, weight: 1 };
      } else {
           const newType = node.type === 'weight' ? 'empty' : 'weight';
           newGrid[row][col] = { ...node, type: newType, weight: newType === 'weight' ? 5 : 1 };
      }

      return newGrid;
    });
  };

  const generateMaze = () => {
      if (isRunning) return;
      // Simple Random Maze for now (Recursive Division is better but verbose)
      // Let's do random walls
      initializeGrid();
      setTimeout(() => {
          setGrid(prev => {
              const newGrid = prev.map(row => row.map(node => {
                  if (node.type === 'start' || node.type === 'end') return node;
                  const newType: NodeType = Math.random() < 0.3 ? 'wall' : node.type;
                  return { ...node, type: newType };
              }));
              return newGrid;
          });
      }, 100);
  };

  const visualizeAlgorithm = async () => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset visited/path nodes but keep walls/weights
    const resetGrid = grid.map(row => row.map(node => ({
      ...node,
      distance: Infinity,
      totalDistance: Infinity,
      previousNode: null,
      type: (node.type === 'visited' || node.type === 'path') ? 'empty' : node.type
    })));
    setGrid(resetGrid);

    const start = resetGrid[startNode.row][startNode.col];
    const end = resetGrid[endNode.row][endNode.col];
    start.distance = 0;

    let visitedNodesInOrder: Node[] = [];

    if (algorithm === 'dijkstra') {
        visitedNodesInOrder = dijkstra(resetGrid, start, end);
    } else if (algorithm === 'astar') {
        visitedNodesInOrder = astar(resetGrid, start, end);
    } else if (algorithm === 'bfs') {
        visitedNodesInOrder = bfs(resetGrid, start, end);
    } else if (algorithm === 'dfs') {
        visitedNodesInOrder = dfs(resetGrid, start, end);
    }

    await animateVisitedNodes(visitedNodesInOrder, end);
    setIsRunning(false);
  };

  // Algorithms
  const dijkstra = (grid: Node[][], start: Node, end: Node): Node[] => {
    const visitedNodes: Node[] = [];
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (!closestNode || closestNode.distance === Infinity) return visitedNodes;
      if (closestNode.type === 'wall') continue;

      closestNode.type = (closestNode === start || closestNode === end) ? closestNode.type : 'visited';
      visitedNodes.push(closestNode);
      if (closestNode === end) return visitedNodes;

      updateUnvisitedNeighbors(closestNode, grid);
    }
    return visitedNodes;
  };

  const astar = (grid: Node[][], start: Node, end: Node): Node[] => {
      const visitedNodes: Node[] = [];
      const openSet: Node[] = [start];
      start.distance = 0;
      start.heuristic = Math.abs(start.row - end.row) + Math.abs(start.col - end.col); // Manhattan
      start.totalDistance = start.distance + start.heuristic;

      while (openSet.length > 0) {
          // Sort by total distance (f score)
          openSet.sort((a, b) => a.totalDistance - b.totalDistance);
          const current = openSet.shift();

          if (!current) break;
          if (current.type === 'wall') continue;

          visitedNodes.push(current);
          if (current === end) return visitedNodes;

          if(current !== start && current !== end) current.type = 'visited';

          const neighbors = getNeighbors(current, grid);
          for (const neighbor of neighbors) {
              if (neighbor.type === 'visited' || neighbor.type === 'wall') continue; // Closed set logic implicitly handled by type check mostly

              const tempG = current.distance + neighbor.weight;

              // If simpler path or not in open set
              if (tempG < neighbor.distance) {
                  neighbor.previousNode = current;
                  neighbor.distance = tempG;
                  neighbor.heuristic = Math.abs(neighbor.row - end.row) + Math.abs(neighbor.col - end.col);
                  neighbor.totalDistance = neighbor.distance + neighbor.heuristic;

                  if (!openSet.includes(neighbor)) {
                      openSet.push(neighbor);
                  }
              }
          }
      }
      return visitedNodes;
  }

  const bfs = (grid: Node[][], start: Node, end: Node): Node[] => {
      const visitedNodes: Node[] = [];
      const queue: Node[] = [start];
      start.type = 'visited'; // Mark start for algo logic (visuals handle start type)
      // Note: BFS doesn't respect weights, strictly shortest path in unweighted

      while (queue.length > 0) {
          const currentNode = queue.shift();
          if (!currentNode) continue;
          if (currentNode.type === 'wall') continue;

          visitedNodes.push(currentNode);
          if (currentNode === end) return visitedNodes;

          const neighbors = getNeighbors(currentNode, grid);
          for (const neighbor of neighbors) {
              if (neighbor.type !== 'visited' && neighbor.type !== 'wall' && neighbor !== start) {
                  neighbor.type = 'visited';
                  neighbor.previousNode = currentNode;
                  neighbor.distance = currentNode.distance + 1;
                  queue.push(neighbor);
              }
          }
      }
      return visitedNodes;
  }

  const dfs = (grid: Node[][], start: Node, end: Node): Node[] => {
    const visitedNodes: Node[] = [];
    const stack: Node[] = [start];

    while(stack.length > 0) {
        const currentNode = stack.pop();
        if(!currentNode) continue;
        if (currentNode.type === 'visited' && currentNode !== start) continue;
        if (currentNode.type === 'wall') continue;

        visitedNodes.push(currentNode);
        if(currentNode !== start && currentNode !== end) currentNode.type = 'visited';
        if (currentNode === end) return visitedNodes;

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
             if (neighbor.type !== 'visited') {
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
             }
        }
    }
    return visitedNodes;
  }

  // Helpers
  const getAllNodes = (grid: Node[][]): Node[] => {
    const nodes: Node[] = [];
    for (const row of grid) for (const node of row) nodes.push(node);
    return nodes;
  };

  const sortNodesByDistance = (unvisitedNodes: Node[]) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  const updateUnvisitedNeighbors = (node: Node, grid: Node[][]) => {
    const unvisitedNeighbors = getNeighbors(node, grid).filter(n => n.type !== 'visited');
    for (const neighbor of unvisitedNeighbors) {
      const newDist = node.distance + neighbor.weight;
      if (newDist < neighbor.distance) {
          neighbor.distance = newDist;
          neighbor.previousNode = node;
      }
    }
  };

  const getNeighbors = (node: Node, grid: Node[][]): Node[] => {
    const neighbors: Node[] = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < COLS - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  };

  const animateVisitedNodes = async (visitedNodesInOrder: Node[], endNode: Node) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        await animateShortestPath(endNode);
        return;
      }
      const node = visitedNodesInOrder[i];
      await new Promise(resolve => setTimeout(resolve, 5)); // Fast animation

      setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          if(node.type !== 'start' && node.type !== 'end') {
             newGrid[node.row][node.col] = { ...node, type: 'visited' };
          }
          return newGrid;
      });
    }
  };

  const animateShortestPath = async (endNode: Node) => {
    const nodesInShortestPathOrder: Node[] = [];
    let currentNode: Node | null = endNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        const node = nodesInShortestPathOrder[i];
        await new Promise(resolve => setTimeout(resolve, 30));
         setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          if(node.type !== 'start' && node.type !== 'end') {
             newGrid[node.row][node.col] = { ...node, type: 'path' };
          }
          return newGrid;
      });
    }
  };

  const resetBoard = () => {
      initializeGrid();
      setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 select-none">
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center bg-gray-900 p-4 rounded-xl border border-gray-800">
        <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as any)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
            disabled={isRunning}
        >
            <option value="dijkstra">Dijkstra (Weighted)</option>
            <option value="astar">A* Search (Weighted)</option>
            <option value="bfs">Breadth-First Search</option>
            <option value="dfs">Depth-First Search</option>
        </select>

        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
                onClick={() => setTool('wall')}
                className={`px-3 py-1 rounded text-sm font-bold flex items-center gap-2 ${tool === 'wall' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
                <div className="w-3 h-3 bg-gray-500"></div> Wall
            </button>
            <button
                onClick={() => setTool('weight')}
                className={`px-3 py-1 rounded text-sm font-bold flex items-center gap-2 ${tool === 'weight' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
                <div className="w-3 h-3 bg-blue-900 border border-blue-500"></div> Weight (5x)
            </button>
        </div>

        <button onClick={generateMaze} disabled={isRunning} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 flex items-center gap-2">
            <Map size={16} /> Generate Maze
        </button>

        <button
          onClick={visualizeAlgorithm}
          disabled={isRunning}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${
            isRunning
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-neonBlue text-black hover:bg-blue-400'
          }`}
        >
          <Play size={18} />
          Visualize
        </button>

        <button
          onClick={resetBoard}
          disabled={isRunning}
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-bold bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-colors"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      <div className="flex gap-6 mb-4 text-sm text-gray-400">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded-sm"></div> Start</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded-sm"></div> End</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-sm animate-pulse"></div> Visited</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-400 rounded-sm"></div> Path</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-700 rounded-sm"></div> Wall</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-900 border border-blue-500 rounded-sm"></div> Weight</div>
      </div>

      <div
        className="grid bg-gray-900 p-1 border border-gray-800 rounded-lg overflow-hidden touch-none"
        style={{
             gridTemplateColumns: `repeat(${COLS}, 20px)`,
        }}
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIdx) =>
          row.map((node, colIdx) => (
            <NodeComponent
              key={`${rowIdx}-${colIdx}`}
              node={node}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />
          ))
        )}
      </div>
    </div>
  );
};

const NodeComponent = React.memo(({
    node,
    onMouseDown,
    onMouseEnter,
    onMouseUp
}: {
    node: Node,
    onMouseDown: (r: number, c: number) => void,
    onMouseEnter: (r: number, c: number) => void,
    onMouseUp: () => void
}) => {
    const { row, col, type, weight } = node;

    let bgClass = 'bg-gray-900';
    let extraClass = '';

    if (type === 'start') bgClass = 'bg-green-500 scale-110 shadow-lg z-10';
    else if (type === 'end') bgClass = 'bg-red-500 scale-110 shadow-lg z-10';
    else if (type === 'wall') bgClass = 'bg-gray-700';
    else if (type === 'weight') bgClass = 'bg-blue-900/50 border border-blue-500/30';
    else if (type === 'visited') bgClass = 'bg-blue-500/50 animate-pulse';
    else if (type === 'path') bgClass = 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] z-10';

    return (
        <div
            className={`w-5 h-5 border border-gray-800/20 ${bgClass} ${extraClass} transition-all duration-200 select-none`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={onMouseUp}
        >
             {weight > 1 && type !== 'start' && type !== 'end' && type !== 'wall' && (
                 <div className="w-full h-full flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                 </div>
             )}
        </div>
    );
});
NodeComponent.displayName = 'NodeComponent';

export default PathfindingVisualizer;
