import { useEffect, useRef, useState } from 'react';

const size = 400;
const tetrisWidth = 200;
const cells = 20;
const pongLimit = 10;
const colors = ['#00e5ff', '#b026ff', '#39ff14', '#ffcf33', '#ff5c8a', '#7c5cff', '#ffffff'];
const pieces = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]]
];

function randomPiece() {
  const index = Math.floor(Math.random() * pieces.length);
  return { shape: pieces[index], color: index };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function Arcade() {
  const canvasRef = useRef(null);
  const stateRef = useRef({});
  const keysRef = useRef({});
  const actionsRef = useRef({});
  const touchRef = useRef(null);
  const runningRef = useRef(false);
  const [game, setGame] = useState('snake');
  const [mode, setMode] = useState('ai');
  const [score, setScore] = useState(0);
  const [pongScore, setPongScore] = useState({ left: 0, right: 0 });
  const [status, setStatus] = useState('Snake ready');
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nextPiece, setNextPiece] = useState(null);
  const [resetNonce, setResetNonce] = useState(0);

  const chooseGame = (nextGame) => {
    setGame(nextGame);
    setRunning(nextGame !== 'snake');
    setGameOver(false);
    setResetNonce((value) => value + 1);
  };

  const restart = () => {
    setRunning(game !== 'snake');
    setGameOver(false);
    setResetNonce((value) => value + 1);
  };

  const startSnake = () => {
    if (game !== 'snake') return;
    setRunning(true);
    setGameOver(false);
    setStatus('Snake: arrows or swipe');
  };

  const invoke = (name, ...args) => {
    actionsRef.current[name]?.(...args);
  };

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let timer;

    const updateScore = (value) => {
      stateRef.current.score = value;
      setScore(value);
    };

    const finishGame = (message) => {
      stateRef.current.over = true;
      setStatus(message);
      setGameOver(true);
      setRunning(false);
    };

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const grid = (cols, rows = cols) => {
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= cols; i += 1) {
        const pos = i * (canvas.width / cols);
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= rows; i += 1) {
        const pos = i * (canvas.height / rows);
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
      }
    };

    const block = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fillRect(x * 20 + 1, y * 20 + 1, 18, 18);
      ctx.shadowBlur = 0;
    };

    const initSnake = () => {
      stateRef.current = {
        type: 'snake',
        snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
        direction: 'right',
        nextDirection: 'right',
        food: { x: 14, y: 10 },
        score: 0,
        over: false
      };
      updateScore(0);
      setNextPiece(null);
      setPongScore({ left: 0, right: 0 });
      setStatus(running ? 'Snake: arrows or swipe' : 'Snake ready. Click start.');
    };

    const placeFood = () => {
      const state = stateRef.current;
      let food;
      do {
        food = {
          x: Math.floor(Math.random() * cells),
          y: Math.floor(Math.random() * cells)
        };
      } while (state.snake.some((part) => part.x === food.x && part.y === food.y));
      state.food = food;
    };

    const setSnakeDirection = (direction) => {
      const state = stateRef.current;
      if (state.type !== 'snake' || state.over) return;
      if (direction === 'up' && state.direction !== 'down') state.nextDirection = 'up';
      if (direction === 'down' && state.direction !== 'up') state.nextDirection = 'down';
      if (direction === 'left' && state.direction !== 'right') state.nextDirection = 'left';
      if (direction === 'right' && state.direction !== 'left') state.nextDirection = 'right';
    };

    const drawSnake = () => {
      const state = stateRef.current;
      clear();
      grid(cells);
      state.snake.forEach((part, index) => {
        const color = index === 0 ? '#00e5ff' : '#b026ff';
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = index === 0 ? 14 : 5;
        ctx.fillRect(part.x * 20 + 1, part.y * 20 + 1, 18, 18);
        ctx.shadowBlur = 0;
      });
      ctx.fillStyle = '#39ff14';
      ctx.shadowColor = '#39ff14';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(state.food.x * 20 + 10, state.food.y * 20 + 10, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const tickSnake = () => {
      const state = stateRef.current;
      if (state.over || !runningRef.current) return;
      state.direction = state.nextDirection;
      const head = { ...state.snake[0] };
      if (state.direction === 'right') head.x += 1;
      if (state.direction === 'left') head.x -= 1;
      if (state.direction === 'up') head.y -= 1;
      if (state.direction === 'down') head.y += 1;
      const hitWall = head.x < 0 || head.x >= cells || head.y < 0 || head.y >= cells;
      const hitSelf = state.snake.some((part) => part.x === head.x && part.y === head.y);
      if (hitWall || hitSelf) {
        finishGame('Snake lost. Play again?');
        drawSnake();
        return;
      }
      state.snake.unshift(head);
      if (head.x === state.food.x && head.y === state.food.y) {
        updateScore(state.score + 1);
        placeFood();
      } else {
        state.snake.pop();
      }
      drawSnake();
    };

    const initTetris = () => {
      const next = randomPiece();
      stateRef.current = {
        type: 'tetris',
        board: Array.from({ length: 20 }, () => Array(10).fill(0)),
        piece: null,
        next,
        score: 0,
        over: false
      };
      updateScore(0);
      setPongScore({ left: 0, right: 0 });
      setStatus('Tetris: arrows or buttons');
      spawnPiece();
    };

    const valid = (shape, x, y) => {
      const state = stateRef.current;
      return shape.every((row, r) =>
        row.every((cell, c) => {
          if (!cell) return true;
          const px = x + c;
          const py = y + r;
          return px >= 0 && px < 10 && py < 20 && py >= 0 && !state.board[py][px];
        })
      );
    };

    const spawnPiece = () => {
      const state = stateRef.current;
      const piece = {
        ...state.next,
        x: Math.floor((10 - state.next.shape[0].length) / 2),
        y: 0
      };
      state.piece = piece;
      state.next = randomPiece();
      setNextPiece(state.next);
      if (!valid(piece.shape, piece.x, piece.y)) {
        finishGame('Tetris lost. Play again?');
      }
    };

    const drawTetris = () => {
      const state = stateRef.current;
      clear();
      for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 10; c += 1) {
          const value = state.board[r][c];
          if (value) block(c, r, colors[value - 1]);
        }
      }
      if (state.piece) {
        state.piece.shape.forEach((row, r) => {
          row.forEach((cell, c) => {
            if (cell) block(state.piece.x + c, state.piece.y + r, colors[state.piece.color]);
          });
        });
      }
      grid(10, 20);
    };

    const lockPiece = () => {
      const state = stateRef.current;
      state.piece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (cell) state.board[state.piece.y + r][state.piece.x + c] = state.piece.color + 1;
        });
      });
      let cleared = 0;
      state.board = state.board.filter((row) => {
        const full = row.every(Boolean);
        if (full) cleared += 1;
        return !full;
      });
      while (state.board.length < 20) state.board.unshift(Array(10).fill(0));
      if (cleared) updateScore(state.score + cleared * 10);
      spawnPiece();
    };

    const moveTetris = (dx, dy) => {
      const state = stateRef.current;
      if (state.type !== 'tetris' || !state.piece || state.over) return;
      if (valid(state.piece.shape, state.piece.x + dx, state.piece.y + dy)) {
        state.piece.x += dx;
        state.piece.y += dy;
      } else if (dy) {
        lockPiece();
      }
      drawTetris();
    };

    const rotateTetris = () => {
      const state = stateRef.current;
      if (state.type !== 'tetris' || !state.piece || state.over) return;
      const rotated = state.piece.shape[0].map((_, index) => state.piece.shape.map((row) => row[index]).reverse());
      if (valid(rotated, state.piece.x, state.piece.y)) state.piece.shape = rotated;
      drawTetris();
    };

    const initPong = () => {
      stateRef.current = {
        type: 'pong',
        ball: { x: 200, y: 200, dx: 3, dy: 2, r: 6 },
        left: { x: 10, y: 160, w: 8, h: 64 },
        right: { x: 382, y: 160, w: 8, h: 64 },
        leftScore: 0,
        rightScore: 0,
        score: 0,
        over: false
      };
      updateScore(0);
      setNextPiece(null);
      setPongScore({ left: 0, right: 0 });
      setStatus(mode === 'ai' ? `Pong: first to ${pongLimit}. W/S or buttons.` : `Pong: first to ${pongLimit}. Shared-device controls.`);
    };

    const paddle = (pad, color) => {
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillRect(pad.x, pad.y, pad.w, pad.h);
      ctx.shadowBlur = 0;
    };

    const drawPong = () => {
      const state = stateRef.current;
      clear();
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.moveTo(200, 0);
      ctx.lineTo(200, 400);
      ctx.stroke();
      ctx.setLineDash([]);
      paddle(state.left, '#00e5ff');
      paddle(state.right, '#39ff14');
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.font = '20px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillText(state.leftScore, 70, 50);
      ctx.fillText(state.rightScore, 310, 50);
    };

    const resetBall = (dir = 1) => {
      const state = stateRef.current;
      state.ball = { x: 200, y: 200, dx: 3 * dir, dy: Math.random() * 4 - 2, r: 6 };
    };

    const movePaddle = (player, direction) => {
      const state = stateRef.current;
      if (state.type !== 'pong' || state.over) return;
      const pad = player === 'left' ? state.left : state.right;
      pad.y = clamp(pad.y + direction * 18, 0, size - pad.h);
      drawPong();
    };

    const tickPong = () => {
      const state = stateRef.current;
      const keys = keysRef.current;
      if (state.over) return;
      if (keys.w) state.left.y -= 5;
      if (keys.s) state.left.y += 5;
      if (mode === 'ai') {
        state.right.y += state.ball.y > state.right.y + state.right.h / 2 ? 3 : -3;
      } else {
        if (keys.ArrowUp) state.right.y -= 5;
        if (keys.ArrowDown) state.right.y += 5;
      }
      state.left.y = clamp(state.left.y, 0, size - state.left.h);
      state.right.y = clamp(state.right.y, 0, size - state.right.h);
      state.ball.x += state.ball.dx;
      state.ball.y += state.ball.dy;
      if (state.ball.y < 6 || state.ball.y > size - 6) state.ball.dy *= -1;
      [state.left, state.right].forEach((pad) => {
        const hit = state.ball.x > pad.x && state.ball.x < pad.x + pad.w && state.ball.y > pad.y && state.ball.y < pad.y + pad.h;
        if (hit) state.ball.dx *= -1.05;
      });
      if (state.ball.x < -10) {
        state.rightScore += 1;
        setPongScore({ left: state.leftScore, right: state.rightScore });
        resetBall(1);
      }
      if (state.ball.x > size + 10) {
        state.leftScore += 1;
        updateScore(state.leftScore);
        setPongScore({ left: state.leftScore, right: state.rightScore });
        resetBall(-1);
      }
      if (state.leftScore >= pongLimit || state.rightScore >= pongLimit) {
        finishGame(state.leftScore >= pongLimit ? 'Player 1 wins. Play again?' : `${mode === 'ai' ? 'AI' : 'Player 2'} wins. Play again?`);
      }
      drawPong();
    };

    const onKeyDown = (event) => {
      const state = stateRef.current;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S'].includes(event.key)) {
        event.preventDefault();
      }
      if (state.type === 'snake') {
        if (!running && !state.over) startSnake();
        if (event.key === 'ArrowUp') setSnakeDirection('up');
        if (event.key === 'ArrowDown') setSnakeDirection('down');
        if (event.key === 'ArrowLeft') setSnakeDirection('left');
        if (event.key === 'ArrowRight') setSnakeDirection('right');
      }
      if (state.type === 'tetris') {
        if (event.key === 'ArrowLeft') moveTetris(-1, 0);
        if (event.key === 'ArrowRight') moveTetris(1, 0);
        if (event.key === 'ArrowDown') moveTetris(0, 1);
        if (event.key === 'ArrowUp') rotateTetris();
      }
      keysRef.current[event.key.length === 1 ? event.key.toLowerCase() : event.key] = true;
    };

    const onKeyUp = (event) => {
      keysRef.current[event.key.length === 1 ? event.key.toLowerCase() : event.key] = false;
    };

    actionsRef.current = {
      snake: setSnakeDirection,
      tetrisLeft: () => moveTetris(-1, 0),
      tetrisRight: () => moveTetris(1, 0),
      tetrisDown: () => moveTetris(0, 1),
      tetrisRotate: rotateTetris,
      pongLeftUp: () => movePaddle('left', -1),
      pongLeftDown: () => movePaddle('left', 1),
      pongRightUp: () => movePaddle('right', -1),
      pongRightDown: () => movePaddle('right', 1)
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    if (game === 'snake') {
      initSnake();
      drawSnake();
      timer = window.setInterval(tickSnake, 130);
    }
    if (game === 'tetris') {
      initTetris();
      drawTetris();
      timer = window.setInterval(() => moveTetris(0, 1), 420);
    }
    if (game === 'pong') {
      initPong();
      drawPong();
      timer = window.setInterval(tickPong, 18);
    }

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [game, mode, resetNonce]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (game !== 'snake' || !touchRef.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchRef.current.x;
    const dy = touch.clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (!running) startSnake();
    if (Math.abs(dx) > Math.abs(dy)) invoke('snake', dx > 0 ? 'right' : 'left');
    else invoke('snake', dy > 0 ? 'down' : 'up');
  };

  return (
    <section className="section arcade-section">
      <div className="container">
        <div className="arcade-controls">
          {['snake', 'tetris', 'pong'].map((item) => (
            <button key={item} className={game === item ? 'active' : ''} type="button" onClick={() => chooseGame(item)}>
              {item}
            </button>
          ))}
        </div>
        {game === 'pong' && (
          <div className="arcade-controls small">
            <button className={mode === 'ai' ? 'active' : ''} type="button" onClick={() => setMode('ai')}>
              vs AI
            </button>
            <button className={mode === 'pvp' ? 'active' : ''} type="button" onClick={() => setMode('pvp')}>
              vs Player
            </button>
          </div>
        )}

        {game === 'pong' && mode === 'pvp' && (
          <PongControls player="Player 1" onUp={() => invoke('pongLeftUp')} onDown={() => invoke('pongLeftDown')} />
        )}

        <div className={`arcade-layout ${game === 'tetris' ? 'with-sidebar' : ''}`}>
          <div className={`arcade-stage ${game === 'tetris' ? 'tetris-stage' : ''}`}>
            {!running && game === 'snake' && !gameOver && (
              <div className="game-overlay">
                <p>Snake is ready.</p>
                <button type="button" onClick={startSnake}>Start</button>
              </div>
            )}
            {gameOver && (
              <div className="game-overlay">
                <p>{status}</p>
                <button type="button" onClick={restart}>Play again?</button>
              </div>
            )}
            <canvas
              ref={canvasRef}
              width={game === 'tetris' ? tetrisWidth : size}
              height={size}
              aria-label={`${game} game canvas`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          {game === 'tetris' && <TetrisSidebar nextPiece={nextPiece} score={score} />}
        </div>

        {game === 'pong' && (
          <div className="pong-score">
            <span>Player 1: {pongScore.left}</span>
            <span>Target: {pongLimit}</span>
            <span>{mode === 'ai' ? 'AI' : 'Player 2'}: {pongScore.right}</span>
          </div>
        )}

        <div className="arcade-meta">
          <span>score: {score}</span>
          <span>{status}</span>
        </div>

        {game === 'snake' && (
          <div className="desktop-snake-controls snake-pad" aria-label="Snake desktop controls">
            <button type="button" onClick={() => invoke('snake', 'up')} aria-label="Snake up">↑</button>
            <button type="button" onClick={() => invoke('snake', 'left')} aria-label="Snake left">←</button>
            <button type="button" onClick={() => invoke('snake', 'right')} aria-label="Snake right">→</button>
            <button type="button" onClick={() => invoke('snake', 'down')} aria-label="Snake down">↓</button>
          </div>
        )}

        {game === 'tetris' && (
          <div className="mobile-game-controls tetris-pad" aria-label="Tetris controls">
            <button type="button" onClick={() => invoke('tetrisLeft')}>Left</button>
            <button type="button" onClick={() => invoke('tetrisRotate')}>Rotate</button>
            <button type="button" onClick={() => invoke('tetrisRight')}>Right</button>
            <button type="button" onClick={() => invoke('tetrisDown')}>Drop</button>
          </div>
        )}

        {game === 'pong' && (
          <div className="pong-mobile-controls">
            {mode === 'ai' && <PongControls player="Player 1" onUp={() => invoke('pongLeftUp')} onDown={() => invoke('pongLeftDown')} />}
            {mode === 'pvp' && <PongControls player="Player 2" onUp={() => invoke('pongRightUp')} onDown={() => invoke('pongRightDown')} />}
          </div>
        )}

      </div>
    </section>
  );
}

function TetrisSidebar({ nextPiece, score }) {
  return (
    <aside className="tetris-side-panel" aria-label="Tetris scoreboard">
      <div>
        <span className="panel-label">Score</span>
        <strong>{score}</strong>
      </div>
      <div>
        <span className="panel-label">Next</span>
        <div className="piece-preview" aria-label="Next Tetris block">
          {nextPiece?.shape.map((row, rowIndex) => (
            <div className="piece-row" key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <span
                  className={cell ? 'filled' : ''}
                  key={`cell-${rowIndex}-${cellIndex}`}
                  style={cell ? { '--piece-color': colors[nextPiece.color] } : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function PongControls({ player, onUp, onDown }) {
  return (
    <div className="pong-player-controls">
      <span>{player}</span>
      <div>
        <button type="button" onClick={onUp}>Up</button>
        <button type="button" onClick={onDown}>Down</button>
      </div>
    </div>
  );
}
