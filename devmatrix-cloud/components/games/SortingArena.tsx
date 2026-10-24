'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pause, Trophy, Coins } from 'lucide-react';

const SortingArena = () => {
  const [array, setArray] = useState<number[]>([]);
  const [array2, setArray2] = useState<number[]>([]);
  const [leftAlgo, setLeftAlgo] = useState('bubble');
  const [rightAlgo, setRightAlgo] = useState('quick');
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(50);

  const [stats1, setStats1] = useState({ comparisons: 0, swaps: 0, finished: false });
  const [stats2, setStats2] = useState({ comparisons: 0, swaps: 0, finished: false });

  const [bet, setBet] = useState<'left' | 'right' | null>(null);
  const [winner, setWinner] = useState<'left' | 'right' | null>(null);
  const [points, setPoints] = useState(100);

  const sortingRef = useRef(false);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    sortingRef.current = false;
    setIsSorting(false);
    setStats1({ comparisons: 0, swaps: 0, finished: false });
    setStats2({ comparisons: 0, swaps: 0, finished: false });
    setWinner(null);
    setBet(null);

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray([...newArray]);
    setArray2([...newArray]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startBattle = async () => {
    if (!bet) {
        alert("Place your bet first!");
        return;
    }
    setIsSorting(true);
    sortingRef.current = true;
    setWinner(null);

    // Run both concurrently
    Promise.all([
        runSort(leftAlgo, array, setArray, setStats1, 1),
        runSort(rightAlgo, array2, setArray2, setStats2, 2)
    ]).then(() => {
        setIsSorting(false);
        sortingRef.current = false;
    });
  };

  const runSort = async (algo: string, arr: number[], setArr: any, setStats: any, id: number) => {
      const updateStats = (cmp: number, swp: number) => {
          setStats((prev: any) => ({ ...prev, comparisons: prev.comparisons + cmp, swaps: prev.swaps + swp }));
      };

      if (algo === 'bubble') await bubbleSort(arr, setArr, updateStats);
      else if (algo === 'quick') await quickSort(arr, 0, arr.length - 1, setArr, updateStats);
      else if (algo === 'merge') await mergeSort(arr, 0, arr.length - 1, setArr, updateStats);
      else if (algo === 'insertion') await insertionSort(arr, setArr, updateStats);

      setStats((prev: any) => {
          // Check winner logic
          if (!winner) {
               const winId = id === 1 ? 'left' : 'right';
               setWinner(winId);
               if (bet === winId) setPoints(p => p + 50);
               else setPoints(p => Math.max(0, p - 50));
          }
          return { ...prev, finished: true };
      });
  };

  // --- Algorithms ---
  const bubbleSort = async (arr: number[], setArr: any, updateStats: any) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (!sortingRef.current) return;
        updateStats(1, 0);
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArr([...arr]);
          updateStats(0, 1);
          await sleep(100 - speed);
        }
      }
    }
  };

  const insertionSort = async (arr: number[], setArr: any, updateStats: any) => {
      for (let i = 1; i < arr.length; i++) {
          let current = arr[i];
          let j = i - 1;
          while (j > -1 && current < arr[j]) {
              if(!sortingRef.current) return;
              updateStats(1, 1);
              arr[j+1] = arr[j];
              setArr([...arr]);
              await sleep(100 - speed);
              j--;
          }
          arr[j+1] = current;
          setArr([...arr]);
      }
  }

  const quickSort = async (arr: number[], start: number, end: number, setArr: any, updateStats: any) => {
      if (start >= end || !sortingRef.current) return;
      let index = await partition(arr, start, end, setArr, updateStats);
      await Promise.all([
          quickSort(arr, start, index - 1, setArr, updateStats),
          quickSort(arr, index + 1, end, setArr, updateStats)
      ]);
  }

  const partition = async (arr: number[], start: number, end: number, setArr: any, updateStats: any) => {
      let pivotValue = arr[end];
      let pivotIndex = start;
      for(let i = start; i < end; i++) {
          if(!sortingRef.current) return start;
          updateStats(1, 0);
          if(arr[i] < pivotValue) {
              [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
              setArr([...arr]);
              updateStats(0, 1);
              await sleep(100 - speed);
              pivotIndex++;
          }
      }
      [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
      setArr([...arr]);
      updateStats(0, 1);
      await sleep(100 - speed);
      return pivotIndex;
  }

  const mergeSort = async (arr: number[], left: number, right: number, setArr: any, updateStats: any) => {
      if(left >= right || !sortingRef.current) return;
      const middle = Math.floor((left + right) / 2);
      await mergeSort(arr, left, middle, setArr, updateStats);
      await mergeSort(arr, middle + 1, right, setArr, updateStats);
      await merge(arr, left, middle, right, setArr, updateStats);
  }

  const merge = async (arr: number[], left: number, middle: number, right: number, setArr: any, updateStats: any) => {
    const leftArr = arr.slice(left, middle + 1);
    const rightArr = arr.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if(!sortingRef.current) return;
        updateStats(1, 0);
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        setArr([...arr]);
        updateStats(0, 1);
        await sleep(100 - speed);
        k++;
    }

    while (i < leftArr.length) {
        if(!sortingRef.current) return;
        arr[k] = leftArr[i];
        setArr([...arr]);
        await sleep(100 - speed);
        i++;
        k++;
    }

    while (j < rightArr.length) {
        if(!sortingRef.current) return;
        arr[k] = rightArr[j];
        setArr([...arr]);
        await sleep(100 - speed);
        j++;
        k++;
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4">
      {/* Controls & Betting */}
      <div className="flex flex-wrap gap-6 mb-8 w-full items-center justify-between bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-4">
             <div className="bg-black/40 p-3 rounded-lg flex items-center gap-2 border border-yellow-500/20">
                 <Coins className="text-yellow-400" />
                 <span className="text-2xl font-bold text-white">{points}</span>
             </div>

             <div className="flex flex-col gap-1">
                 <span className="text-xs text-gray-500 font-bold uppercase">Size</span>
                 <input type="range" min="10" max="100" value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} disabled={isSorting} className="accent-neonBlue"/>
             </div>
             <div className="flex flex-col gap-1">
                 <span className="text-xs text-gray-500 font-bold uppercase">Speed</span>
                 <input type="range" min="1" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="accent-neonBlue"/>
             </div>
          </div>

          <div className="flex gap-4">
               {!bet && !isSorting && (
                   <div className="flex gap-2">
                       <button onClick={() => setBet('left')} className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800 border border-purple-500 rounded text-purple-200 font-bold">Bet Left</button>
                       <button onClick={() => setBet('right')} className="px-4 py-2 bg-blue-900/50 hover:bg-blue-800 border border-blue-500 rounded text-blue-200 font-bold">Bet Right</button>
                   </div>
               )}
               {bet && !isSorting && (
                   <div className="text-gray-300 font-bold px-4 py-2 bg-gray-800 rounded">
                       Bet on: <span className={bet === 'left' ? 'text-purple-400' : 'text-blue-400'}>{bet.toUpperCase()}</span>
                   </div>
               )}

               <button onClick={startBattle} disabled={isSorting} className={`px-8 py-2 rounded-lg font-bold flex items-center gap-2 ${isSorting ? 'bg-gray-700' : 'bg-neonBlue text-black hover:bg-blue-400'}`}>
                   {isSorting ? <Pause size={18} /> : <Play size={18} />} {isSorting ? 'Racing...' : 'Start Battle'}
               </button>
               <button onClick={resetArray} disabled={isSorting} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700"><RotateCcw size={20}/></button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Left Arena */}
          <div className={`relative bg-gray-900 border-2 rounded-xl p-4 transition-all ${winner === 'left' ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'border-purple-500/30'}`}>
              <div className="flex justify-between mb-4">
                   <select value={leftAlgo} onChange={(e) => setLeftAlgo(e.target.value)} disabled={isSorting} className="bg-gray-800 text-purple-400 font-bold p-2 rounded border border-purple-500/30">
                       <option value="bubble">Bubble Sort</option>
                       <option value="insertion">Insertion Sort</option>
                       <option value="merge">Merge Sort</option>
                       <option value="quick">Quick Sort</option>
                   </select>
                   <div className="text-right text-xs text-gray-500 font-mono">
                       <div>CMP: {stats1.comparisons}</div>
                       <div>SWP: {stats1.swaps}</div>
                   </div>
              </div>
              <div className="flex items-end h-[400px] gap-[1px]">
                  {array.map((val, idx) => (
                      <div key={idx} style={{ height: `${(val/500)*100}%`, width: `${100/arraySize}%` }} className="bg-purple-500 rounded-t-sm" />
                  ))}
              </div>
              {winner === 'left' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 font-black text-6xl drop-shadow-lg rotate-12 border-4 border-yellow-400 p-4 rounded-xl bg-black/80">WINNER</div>}
          </div>

          {/* Right Arena */}
          <div className={`relative bg-gray-900 border-2 rounded-xl p-4 transition-all ${winner === 'right' ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'border-blue-500/30'}`}>
              <div className="flex justify-between mb-4">
                   <select value={rightAlgo} onChange={(e) => setRightAlgo(e.target.value)} disabled={isSorting} className="bg-gray-800 text-blue-400 font-bold p-2 rounded border border-blue-500/30">
                       <option value="bubble">Bubble Sort</option>
                       <option value="insertion">Insertion Sort</option>
                       <option value="merge">Merge Sort</option>
                       <option value="quick">Quick Sort</option>
                   </select>
                   <div className="text-right text-xs text-gray-500 font-mono">
                       <div>CMP: {stats2.comparisons}</div>
                       <div>SWP: {stats2.swaps}</div>
                   </div>
              </div>
              <div className="flex items-end h-[400px] gap-[1px]">
                  {array2.map((val, idx) => (
                      <div key={idx} style={{ height: `${(val/500)*100}%`, width: `${100/arraySize}%` }} className="bg-blue-500 rounded-t-sm" />
                  ))}
              </div>
              {winner === 'right' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 font-black text-6xl drop-shadow-lg -rotate-12 border-4 border-yellow-400 p-4 rounded-xl bg-black/80">WINNER</div>}
          </div>
      </div>
    </div>
  );
};

export default SortingArena;
