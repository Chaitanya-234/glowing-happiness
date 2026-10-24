import { Chess, Move, PieceSymbol } from 'chess.js';

// Piece weights for evaluation
const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 900,
};

// Simplified position tables (bonus for better positions)
// These are from white's perspective. Mirror for black.
const PAWN_TABLE = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_TABLE = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
];

const BISHOP_TABLE = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
];

const ROOK_TABLE = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
];

const QUEEN_TABLE = [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
];

const KING_TABLE_MID = [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
];

// Returns score from white's perspective
function evaluateBoard(game: Chess): number {
  let totalEvaluation = 0;
  const board = game.board();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece) {
        const value = PIECE_VALUES[piece.type];

        // Positional score
        let positionalScore = 0;
        // Adjust row/col for black to use the same tables (mirroring)
        const tRow = piece.color === 'w' ? r : 7 - r;
        const tCol = c; // Symmetric left-right mostly

        switch(piece.type) {
            case 'p': positionalScore = PAWN_TABLE[tRow][tCol]; break;
            case 'n': positionalScore = KNIGHT_TABLE[tRow][tCol]; break;
            case 'b': positionalScore = BISHOP_TABLE[tRow][tCol]; break;
            case 'r': positionalScore = ROOK_TABLE[tRow][tCol]; break;
            case 'q': positionalScore = QUEEN_TABLE[tRow][tCol]; break;
            case 'k': positionalScore = KING_TABLE_MID[tRow][tCol]; break;
        }

        if (piece.color === 'w') {
          totalEvaluation += (value + positionalScore);
        } else {
          totalEvaluation -= (value + positionalScore);
        }
      }
    }
  }
  return totalEvaluation;
}

// Minimax with Alpha-Beta Pruning
function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizingPlayer: boolean
): number {
  // Check for draw first
  if (game.isDraw()) {
    return 0;
  }

  // Checkmate
  if (game.isCheckmate()) {
      // If we are Maximizing (White), and it's checkmate, it means White has no moves and is in check?
      // No, isCheckmate() is true if the side whose turn it is is in checkmate.
      // If turn is White, White lost. Score should be -10000.
      // If turn is Black, Black lost. Score should be +10000.
      return game.turn() === 'w' ? -10000 : 10000;
  }

  if (depth === 0) {
    return evaluateBoard(game);
  }

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    const moves = game.moves({ verbose: true });
    // Sort moves for better pruning (capture first)
    moves.sort((a, b) => (b.captured ? 10 : 0) - (a.captured ? 10 : 0));

    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalValue);
      alpha = Math.max(alpha, evalValue);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    const moves = game.moves({ verbose: true });
    moves.sort((a, b) => (b.captured ? 10 : 0) - (a.captured ? 10 : 0));

    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalValue);
      beta = Math.min(beta, evalValue);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function getBestMove(originalGame: Chess, depth: number = 3): Move | null {
  // Clone the game to avoid mutating the UI state during calculation
  const game = new Chess(originalGame.fen());

  const possibleMoves = game.moves({ verbose: true });
  if (possibleMoves.length === 0) return null;

  let bestMove: Move | null = null;
  // If turn is White, we want to maximize. If Black, minimize.
  // Note: game.turn() is the side to move *now*.
  const isWhiteTurn = game.turn() === 'w';
  let bestValue = isWhiteTurn ? -Infinity : Infinity;
  let alpha = -Infinity;
  let beta = Infinity;

  // Randomize moves to avoid deterministic repetitive play
  possibleMoves.sort(() => Math.random() - 0.5);
  // Sort by captures to improve alpha-beta
  possibleMoves.sort((a, b) => (b.captured ? 10 : 0) - (a.captured ? 10 : 0));

  for (const move of possibleMoves) {
    game.move(move);
    // After move, turn flips.
    // If I was White (maximizing), I called move(), now it's Black's turn.
    // I want minimax to return value from White's perspective.
    // minimax(...) call needs to know if the *current* recursion step (which is now Black's turn) is maximizing?
    // Wait. My minimax signature: minimax(game, depth, alpha, beta, isMaximizingPlayer).
    // If it's Black's turn, isMaximizingPlayer should be false.
    // If it's White's turn, isMaximizingPlayer should be true.
    // `game.turn()` is correct *after* the move.

    const boardValue = minimax(game, depth - 1, alpha, beta, game.turn() === 'w');
    game.undo();

    if (isWhiteTurn) {
        if (boardValue > bestValue) {
            bestValue = boardValue;
            bestMove = move;
        }
        alpha = Math.max(alpha, bestValue);
        if (beta <= alpha) break; // Pruning
    } else {
        if (boardValue < bestValue) {
            bestValue = boardValue;
            bestMove = move;
        }
        beta = Math.min(beta, bestValue);
        if (beta <= alpha) break; // Pruning
    }
  }

  return bestMove || possibleMoves[0];
}

export function getHint(fen: string): string | null {
    const game = new Chess(fen);
    const move = getBestMove(game, 2); // Shallower depth for quick hint
    return move ? move.san : null;
}
