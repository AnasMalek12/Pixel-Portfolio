import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// --- TYPE DEFINITIONS ---
// Defines the structure for all objects in the game.
interface GameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'enemy' | 'bullet' | 'star' | 'powerUp' | 'shieldPowerUp';
  direction?: number;
  speed?: number;
  color?: string;
}

// Defines the complete state of the game.
interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  isPaused: boolean; // Tracks pause state
  score: number;
  level: number;
  lives: number;
  powerUpActive: boolean;
  powerUpEndTime: number | null;
  shieldActive: boolean; // NEW: Tracks shield state
  shieldEndTime: number | null; // NEW: Tracks shield duration
  highScore: number;
  player: GameObject;
  bullets: GameObject[];
  enemies: GameObject[];
  stars: GameObject[];
  powerUps: GameObject[];
  message: { id: number; text: string } | null;
  keys: {
    moveLeft: boolean;
    moveRight: boolean;
    shoot: boolean;
  };
}

// Defines all possible actions that can change the game state.
type GameAction =
  | { type: 'START_GAME' }
  | { type: 'GAME_OVER' }
  | { type: 'STOP_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'TICK'; payload: { delta: number } }
  | { type: 'KEY_DOWN'; payload: { key: string } }
  | { type: 'KEY_UP'; payload: { key: string } }
  | { type: 'TAP_SHOOT' }
  | { type: 'SET_PLAYER_POSITION'; payload: { x: number } }
  | { type: 'CLEAR_MESSAGE' };

// --- CONSTANTS AND HELPERS ---
const PLAYER_SPEED = 0.5;
const BULLET_SPEED = 0.8;
const ENEMY_BASE_SPEED = 0.05;
const STAR_SPEED = 0.05;
const POWERUP_SPEED = 0.1;
const PLAYER_WIDTH = 6;
const PLAYER_HEIGHT = 6;
const GAME_WIDTH = 100;

// Generates a set of stars for the background.
const initializeStars = (): GameObject[] => {
  const newStars: GameObject[] = [];
  for (let i = 0; i < 30; i++) {
    newStars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 1 + 0.5,
      height: Math.random() * 1 + 0.5,
      type: 'star',
      speed: Math.random() * STAR_SPEED + 0.01,
      color: Math.random() > 0.7 ? '#61DCFF' : (Math.random() > 0.5 ? '#FF61DC' : '#FFFFFF')
    });
  }
  return newStars;
};

// --- INITIAL STATE ---
const getInitialState = (highScore: number): GameState => ({
  gameStarted: false,
  gameOver: false,
  isPaused: false,
  score: 0,
  level: 1,
  lives: 3,
  powerUpActive: false,
  powerUpEndTime: null,
  shieldActive: false, // NEW
  shieldEndTime: null, // NEW
  highScore,
  player: {
    id: 0,
    x: (GAME_WIDTH - PLAYER_WIDTH) / 2,
    y: 85,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    type: 'player'
  },
  bullets: [],
  enemies: [],
  stars: initializeStars(),
  powerUps: [],
  message: null,
  keys: {
    moveLeft: false,
    moveRight: false,
    shoot: false,
  },
});

// --- GAME REDUCER ---
// This function handles all state updates for the game.
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...getInitialState(state.highScore),
        gameStarted: true,
        stars: state.stars, // Keep existing stars
      };
    case 'PAUSE_GAME':
      return { ...state, isPaused: true };
    case 'RESUME_GAME':
      return { ...state, isPaused: false };

    case 'STOP_GAME': {
        const newHighScore = Math.max(state.highScore, state.score);
        if (newHighScore > state.highScore) {
            localStorage.setItem('pixel-game-highscore', newHighScore.toString());
        }
        return {
            ...getInitialState(newHighScore),
            stars: state.stars,
        };
    }

    case 'GAME_OVER': {
      const newHighScore = Math.max(state.highScore, state.score);
      if (newHighScore > state.highScore) {
        localStorage.setItem('pixel-game-highscore', newHighScore.toString());
      }
      return {
        ...state,
        gameStarted: false,
        gameOver: true,
        highScore: newHighScore,
      };
    }

    case 'KEY_DOWN': {
      const newKeys = { ...state.keys };
      if (action.payload.key === 'ArrowLeft') newKeys.moveLeft = true;
      if (action.payload.key === 'ArrowRight') newKeys.moveRight = true;
      if (action.payload.key === ' ') newKeys.shoot = true;
      if (action.payload.key.toLowerCase() === 'p' && state.gameStarted && !state.gameOver) {
        return gameReducer(state, { type: state.isPaused ? 'RESUME_GAME' : 'PAUSE_GAME' });
      }
      return { ...state, keys: newKeys };
    }

    case 'KEY_UP': {
      const newKeys = { ...state.keys };
      if (action.payload.key === 'ArrowLeft') newKeys.moveLeft = false;
      if (action.payload.key === 'ArrowRight') newKeys.moveRight = false;
      if (action.payload.key === ' ') newKeys.shoot = false;
      return { ...state, keys: newKeys };
    }
    
    case 'SET_PLAYER_POSITION': {
      const newX = Math.max(0, Math.min(GAME_WIDTH - state.player.width, action.payload.x));
      return { ...state, player: { ...state.player, x: newX } };
    }

    case 'TAP_SHOOT': {
        const bulletCooldown = state.powerUpActive ? 150 : 300;
        if (Date.now() - (state.player.id || 0) < bulletCooldown) {
            return state; // Cooldown is active, do nothing
        }
        
        const { player, powerUpActive } = state;
        const newBullets = [...state.bullets];
        const newPlayerState = { ...player, id: Date.now() }; // Update last shot timestamp on player

        const shots = powerUpActive
          ? [
              { id: Date.now(), x: player.x + player.width / 2 - 0.5, y: player.y - 3, width: 1, height: 3, type: 'bullet' as const, color: '#FFFFFF' },
              { id: Date.now() + 1, x: player.x + player.width / 2 - 2.5, y: player.y - 2, width: 1, height: 3, type: 'bullet' as const, color: '#ef4444' },
              { id: Date.now() + 2, x: player.x + player.width / 2 + 1.5, y: player.y - 2, width: 1, height: 3, type: 'bullet' as const, color: '#ef4444' },
            ]
          : [{ id: Date.now(), x: player.x + player.width / 2 - 0.5, y: player.y - 3, width: 1, height: 3, type: 'bullet' as const, color: '#FFFFFF' }];
        
        newBullets.push(...shots);

        return { ...state, bullets: newBullets, player: newPlayerState };
    }

    case 'CLEAR_MESSAGE':
        return { ...state, message: null };

    case 'TICK': {
      if (!state.gameStarted || state.gameOver || state.isPaused) return state;

      const nextState = { ...state };

      // --- MOVEMENT & UPDATES ---
      if (nextState.keys.moveLeft && nextState.player.x > 0) nextState.player.x = Math.max(0, nextState.player.x - PLAYER_SPEED);
      if (nextState.keys.moveRight && nextState.player.x < GAME_WIDTH - nextState.player.width) nextState.player.x = Math.min(GAME_WIDTH - nextState.player.width, nextState.player.x + PLAYER_SPEED);
      
      nextState.bullets = nextState.bullets.map(b => ({ ...b, y: b.y - BULLET_SPEED })).filter(b => b.y > -5);
      nextState.enemies = nextState.enemies.map(e => {
        const newX = e.x + (e.direction || 1) * (e.speed || 0.1);
        let newDirection = e.direction;
        if (newX <= 0 || newX >= 95) newDirection = -(newDirection || 1);
        return { ...e, x: newX, y: e.y + 0.1, direction: newDirection };
      }).filter(e => e.y < 100);
      nextState.powerUps = nextState.powerUps.map(p => ({ ...p, y: p.y + (p.speed || POWERUP_SPEED) })).filter(p => p.y < 100);
      nextState.stars = nextState.stars.map(s => ({ ...s, y: s.y < 100 ? s.y + (s.speed || STAR_SPEED) : -5, x: s.y >= 100 ? Math.random() * 100 : s.x }));

      // --- POWER-UP & SHIELD EXPIRATION ---
      if (nextState.powerUpActive && nextState.powerUpEndTime && Date.now() > nextState.powerUpEndTime) {
        nextState.powerUpActive = false;
        nextState.powerUpEndTime = null;
      }
      if (nextState.shieldActive && nextState.shieldEndTime && Date.now() > nextState.shieldEndTime) {
        nextState.shieldActive = false;
        nextState.shieldEndTime = null;
        nextState.message = { id: Date.now(), text: "Shield Deactivated!" };
      }

      // --- SPAWNING ---
      const bulletCooldown = nextState.powerUpActive ? 150 : 300;
      if (nextState.keys.shoot && (Date.now() - (nextState.player.id || 0) > bulletCooldown)) {
        nextState.player.id = Date.now();
        const newShots = nextState.powerUpActive
          ? [
              { id: Date.now(), x: nextState.player.x + nextState.player.width / 2 - 0.5, y: nextState.player.y - 3, width: 1, height: 3, type: 'bullet' as const, color: '#FFFFFF' },
              { id: Date.now() + 1, x: nextState.player.x + nextState.player.width / 2 - 2.5, y: nextState.player.y - 2, width: 1, height: 3, type: 'bullet' as const, color: '#ef4444' },
              { id: Date.now() + 2, x: nextState.player.x + nextState.player.width / 2 + 1.5, y: nextState.player.y - 2, width: 1, height: 3, type: 'bullet' as const, color: '#ef4444' },
            ]
          : [{ id: Date.now(), x: nextState.player.x + nextState.player.width / 2 - 0.5, y: nextState.player.y - 3, width: 1, height: 3, type: 'bullet' as const, color: '#FFFFFF' }];
        nextState.bullets.push(...newShots);
      }
      if (nextState.enemies.length < (nextState.level * 2) && Math.random() < 0.02) {
        nextState.enemies.push({ id: Date.now(), x: Math.random() * 90, y: -5, width: 5, height: 5, type: 'enemy', direction: Math.random() > 0.5 ? 1 : -1, speed: Math.random() * 0.05 + ENEMY_BASE_SPEED + (nextState.level * 0.01) });
      }
      if (!nextState.powerUpActive && Math.random() < 0.001) {
        nextState.powerUps.push({ id: Date.now(), x: Math.random() * 90, y: -5, width: 4, height: 4, type: 'powerUp', speed: POWERUP_SPEED, color: '#61FF8D' });
      }
      if (Math.random() < 0.002 && !nextState.shieldActive) {
        nextState.powerUps.push({ id: Date.now() + 1, x: Math.random() * 90, y: -5, width: 4, height: 4, type: 'shieldPowerUp', speed: POWERUP_SPEED, color: '#FFFFFF' });
      }

      // --- COLLISIONS ---
      for (let i = nextState.bullets.length - 1; i >= 0; i--) {
        for (let j = nextState.enemies.length - 1; j >= 0; j--) {
          const b = nextState.bullets[i];
          const e = nextState.enemies[j];
          if (b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
            nextState.bullets.splice(i, 1);
            nextState.enemies.splice(j, 1);
            nextState.score += 10;
            break;
          }
        }
      }
      for (let i = nextState.enemies.length - 1; i >= 0; i--) {
        const e = nextState.enemies[i];
        if (nextState.player.x < e.x + e.width && nextState.player.x + nextState.player.width > e.x && nextState.player.y < e.y + e.height && nextState.player.y + nextState.player.height > e.y) {
          if (nextState.shieldActive) {
            nextState.enemies.splice(i, 1);
            nextState.shieldActive = false;
            nextState.shieldEndTime = null;
            nextState.message = { id: Date.now(), text: "Shield Blocked Hit!" };
          } else {
            nextState.enemies.splice(i, 1);
            nextState.lives -= 1;
            nextState.message = { id: Date.now(), text: `Hit! Lives: ${nextState.lives}`};
            if (nextState.lives <= 0) return gameReducer(state, { type: 'GAME_OVER' });
          }
        }
      }
      for (let i = nextState.powerUps.length - 1; i >= 0; i--) {
        const p = nextState.powerUps[i];
        if (nextState.player.x < p.x + p.width && nextState.player.x + nextState.player.width > p.x && nextState.player.y < p.y + p.height && nextState.player.y + nextState.player.height > p.y) {
          nextState.powerUps.splice(i, 1);
          if (p.type === 'shieldPowerUp') {
            nextState.shieldActive = true;
            nextState.shieldEndTime = Date.now() + 10000; // 10 seconds
            nextState.message = { id: Date.now(), text: "Shield Activated!" };
          } else { // 'powerUp' type
            if (!state.powerUpActive) {
              nextState.message = { id: Date.now(), text: "Power-Up! Triple shot!"};
            }
            nextState.powerUpActive = true;
            nextState.powerUpEndTime = Date.now() + 10000;
          }
        }
      }
      if (nextState.score >= state.level * 100 && nextState.level < 10) {
        nextState.level = state.level + 1;
        nextState.message = { id: Date.now(), text: `Level Up: ${nextState.level}!`};
      }

      return nextState;
    }
    default:
      return state;
  }
}


// --- THE GAME COMPONENT ---
const App = () => {
  const [highScore, setHighScore] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('pixel-game-highscore') : '0';
    return saved ? parseInt(saved, 10) : 0;
  });

  const [state, dispatch] = useReducer(gameReducer, getInitialState(highScore));
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const touchStartScreenXRef = useRef<number>(0);
  const touchStartTimeRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const { toast } = useToast();

  const gameLoop = useCallback((time: number) => {
    if (lastTimeRef.current === 0) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    dispatch({ type: 'TICK', payload: { delta } });
    requestRef.current = requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    if (state.gameStarted && !state.gameOver && !state.isPaused) {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.gameStarted, state.gameOver, state.isPaused, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'ArrowRight', ' ', 'p', 'P'].includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'KEY_DOWN', payload: { key: e.key } });
        }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'KEY_UP', payload: { key: e.key } });
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const container = gameContainerRef.current;
    if (!container || !state.gameStarted || state.gameOver || state.isPaused) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartScreenXRef.current = touch.clientX;
      touchStartTimeRef.current = Date.now();
      isDraggingRef.current = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const diffX = Math.abs(touch.clientX - touchStartScreenXRef.current);
      if (diffX > 10) isDraggingRef.current = true;
      if (isDraggingRef.current) {
        const rect = container.getBoundingClientRect();
        const touchXPercent = ((touch.clientX - rect.left) / rect.width) * 100;
        const playerX = touchXPercent - (PLAYER_WIDTH / 2);
        dispatch({ type: 'SET_PLAYER_POSITION', payload: { x: playerX } });
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const touchDuration = Date.now() - touchStartTimeRef.current;
      if (!isDraggingRef.current && touchDuration < 250) {
        dispatch({ type: 'TAP_SHOOT' });
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gameContainerRef, state.gameStarted, state.gameOver, state.isPaused]);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.message]);

  const renderGameObject = (obj: GameObject) => (
    <motion.div
      key={`${obj.type}-${obj.id}`}
      className="absolute"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        width: `${obj.width}${obj.type === 'star' ? 'px' : '%'}`,
        height: `${obj.height}${obj.type === 'star' ? 'px' : '%'}`,
        backgroundColor: obj.color || 'white',
        boxShadow: (obj.type === 'powerUp' || obj.type === 'shieldPowerUp') ? `0 0 8px ${obj.color}` : 'none',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );

  const handleButtonTap = (e: React.TouchEvent, action: GameAction) => {
    e.stopPropagation();
    dispatch(action);
  };
  
  const handleExitGame = () => {
    toast({
      title: "Game Stopped",
      description: `Final score: ${state.score}`,
      duration: 2000,
    });
    dispatch({ type: 'STOP_GAME' });
  };

  const playerVariants = {
    default: {
      backgroundColor: '#61DCFF',
      borderRadius: '0%',
      boxShadow: 'none',
    },
    poweredUp: {
      backgroundColor: '#ef4444',
      borderRadius: '50%',
      boxShadow: '0 0 12px #ef4444',
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white font-mono p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .pixel-btn { background-color: #433A59; border: 2px solid #ffff; color: #fff; padding: 10px 20px; text-transform: uppercase; font-family: 'Press Start 2P', monospace; cursor: pointer; box-shadow: 4px 4px 0px #946EB7; transition: all 0.1s ease-in-out; }
        .pixel-btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px #946EB7; }
        .pixel-btn:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0px #946EB7; }
        .pixel-btn-exit { background-color: #b91c1c; box-shadow: 4px 4px 0px #7f1d1d; }
        .pixel-btn-exit:hover { box-shadow: 2px 2px 0px #7f1d1d; }
        .pixel-btn-exit:active { box-shadow: 0px 0px 0px #7f1d1d; }
        .font-pixel { font-family: 'Press Start 2P', monospace; }
      `}</style>
      <div 
        ref={gameContainerRef} 
        className="w-full max-w-lg aspect-square border-2 border-[#7b61ff] relative bg-black overflow-hidden touch-none"
        style={{ boxShadow: '0 0 13px #946EB7, inset 0 0 10px #7b61ff'}}
      >
        {state.stars.map(renderGameObject)}
        {state.gameStarted && !state.gameOver && (
          <>
            {/* Shield Renderer */}
            {state.shieldActive && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: `${state.player.x - 2}%`,
                  top: `${state.player.y - 2}%`,
                  width: `${PLAYER_WIDTH + 4}%`,
                  height: `${PLAYER_HEIGHT + 4}%`,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid white',
                  borderRadius: state.powerUpActive ? '50%' : '4px',
                  boxShadow: '0 0 12px white',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <motion.div
              className={`absolute ${state.powerUpActive ? 'animate-pulse' : ''}`}
              style={{
                left: `${state.player.x}%`,
                top: `${state.player.y}%`,
                width: `${state.player.width}%`,
                height: `${state.player.height}%`,
              }}
              variants={playerVariants}
              animate={state.powerUpActive ? 'poweredUp' : 'default'}
              transition={{ duration: 0.3 }}
            />
            {state.bullets.map(renderGameObject)}
            {state.enemies.map(b => renderGameObject({ ...b, color: '#FF61DC' }))}
            {state.powerUps.map(renderGameObject)}
          </>
        )}
        <div className="absolute top-2 left-2 font-pixel text-xs text-white">Score: {state.score}</div>
        <div className="absolute top-2 right-2 font-pixel text-xs text-[#61DCFF]">High: {state.highScore}</div>
        <div className="absolute bottom-2 left-2 font-pixel text-xs text-[#FF61DC]">Lvl: {state.level}</div>
        <div className="absolute bottom-2 right-2 font-pixel text-xs text-[#61DCFF]">Lives: {Array(state.lives).fill('♥').join('')}</div>
        <AnimatePresence>
          {state.message && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div
                className="font-pixel text-sm text-white bg-black/50 px-3 py-1 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {state.message.text}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* -- Pause Button -- */}
        {state.gameStarted && !state.gameOver && !state.isPaused && (
          <button
            className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#433A59]/70 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-[#433A59] hover:border-white z-10"
            onClick={() => dispatch({ type: 'PAUSE_GAME' })}
            onTouchStart={(e) => handleButtonTap(e, { type: 'PAUSE_GAME' })}
            aria-label="Pause Game"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="2" width="3" height="10" rx="1"/>
                <rect x="8" y="2" width="3" height="10" rx="1"/>
            </svg>
          </button>
        )}
        {/* -- Pause Menu Overlay -- */}
        <AnimatePresence>
          {state.isPaused && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="font-pixel text-2xl text-center text-[#61DCFF] mb-8" style={{ textShadow: '2px 2px #FF61DC' }}>
                PAUSED
              </h2>
              <button
                className="pixel-btn mb-4"
                onClick={() => dispatch({ type: 'RESUME_GAME' })}
                onTouchStart={(e) => handleButtonTap(e, { type: 'RESUME_GAME' })}
              >
                Resume
              </button>
              <button
                className="pixel-btn pixel-btn-exit"
                onClick={handleExitGame}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  handleExitGame();
                }}
              >
                Exit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {(!state.gameStarted || state.gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <h2 className="font-pixel text-2xl text-center text-[#61DCFF] mb-4" style={{ textShadow: '2px 2px #FF61DC' }}>
              {state.gameOver ? 'GAME OVER' : 'PIXEL INVADERS'}
            </h2>
            {state.gameOver && <p className="font-pixel text-sm text-white text-center mb-4">Final Score: {state.score}</p>}
            <button
              className="pixel-btn"
              onClick={() => dispatch({ type: 'START_GAME' })}
              onTouchStart={(e) => handleButtonTap(e, { type: 'START_GAME' })}
            >
              {state.gameOver ? 'RETRY' : 'START GAME'}
            </button>
            <p className="mt-6 font-mono text-xs text-white/70 text-center">Keyboard: ← → & SPACE</p>
            <p className="mt-2 font-mono text-xs text-white/70 text-center">Mobile: Drag to Move, Tap to Shoot</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
