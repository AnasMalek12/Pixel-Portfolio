import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";

interface GameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'enemy' | 'bullet' | 'star' | 'powerUp';
  direction?: number;
  speed?: number;
  color?: string;
}

const PixelMiniGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [powerUpActive, setPowerUpActive] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('pixel-game-highscore');
    return saved ? parseInt(saved) : 0;
  });
  const [player, setPlayer] = useState<GameObject>({
    id: 0,
    x: 47,
    y: 85,
    width: 6,
    height: 6,
    type: 'player'
  });
  const [bullets, setBullets] = useState<GameObject[]>([]);
  const [enemies, setEnemies] = useState<GameObject[]>([]);
  const [stars, setStars] = useState<GameObject[]>([]);
  const [powerUps, setPowerUps] = useState<GameObject[]>([]);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const enemySpawnTimeRef = useRef<number>(0);
  const powerUpSpawnTimeRef = useRef<number>(0);
  const bulletTimeRef = useRef<number>(0);
  const moveLeftRef = useRef<boolean>(false);
  const moveRightRef = useRef<boolean>(false);
  const shootingRef = useRef<boolean>(false);
  const { toast } = useToast();

  // Add a new function to stop the game
  const stopGame = () => {
    if (gameStarted && !gameOver) {
      // Save high score if current score is higher
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('pixel-game-highscore', score.toString());
      }
      
      setGameStarted(false);
      setGameOver(false);
      setBullets([]);
      setEnemies([]);
      setPowerUps([]);
      toast({
        title: "Game Stopped",
        description: `Final score: ${score}`,
        duration: 2000,
      });
    }
  };

  // Initialize stars
  useEffect(() => {
    const newStars: GameObject[] = [];
    for (let i = 0; i < 30; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 1 + 0.5,
        height: Math.random() * 1 + 0.5,
        type: 'star',
        speed: Math.random() * 0.05 + 0.01,
        color: Math.random() > 0.7 ? '#61DCFF' : (Math.random() > 0.5 ? '#FF61DC' : '#FFFFFF')
      });
    }
    setStars(newStars);
  }, []);

  // Initialize game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLives(3);
    setPowerUpActive(false);
    setPlayer({
      id: 0,
      x: 47,
      y: 85,
      width: 6,
      height: 6,
      type: 'player'
    });
    setBullets([]);
    setEnemies([]);
    setPowerUps([]);
    
    // Force initial enemy spawn
    spawnEnemy();
  };
  
  // New helper function to spawn enemies
  const spawnEnemy = () => {
    const newEnemy = {
      id: Date.now(),
      x: Math.random() * 90,
      y: 0,
      width: 5,
      height: 5,
      type: 'enemy' as const,
      direction: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * 0.1 + 0.05 + (level * 0.01)
    };
    setEnemies(prev => [...prev, newEnemy]);
  };

  // Game loop
  const gameLoop = (time: number) => {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
      enemySpawnTimeRef.current = time;
      powerUpSpawnTimeRef.current = time;
      requestRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (gameStarted && !gameOver) {
      // Move player
      if (moveLeftRef.current && player.x > 0) {
        setPlayer(prev => ({ ...prev, x: Math.max(0, prev.x - 0.5) }));
      }
      if (moveRightRef.current && player.x < 94) {
        setPlayer(prev => ({ ...prev, x: Math.min(94, prev.x + 0.5) }));
      }

      // Shoot bullets
      if (shootingRef.current && time - bulletTimeRef.current > (powerUpActive ? 150 : 300)) {
        bulletTimeRef.current = time;
        if (powerUpActive) {
          // Triple shot with power-up
          const newBullets = [
            {
              id: Date.now(),
              x: player.x + player.width / 2 - 0.5,
              y: player.y - 3,
              width: 1,
              height: 3,
              type: 'bullet' as const,
              color: '#61DCFF'
            },
            {
              id: Date.now() + 1,
              x: player.x + player.width / 2 - 2.5,
              y: player.y - 2,
              width: 1,
              height: 3,
              type: 'bullet' as const,
              color: '#FF61DC'
            },
            {
              id: Date.now() + 2,
              x: player.x + player.width / 2 + 1.5,
              y: player.y - 2,
              width: 1,
              height: 3,
              type: 'bullet' as const,
              color: '#FF61DC'
            }
          ];
          setBullets(prev => [...prev, ...newBullets]);
        } else {
          // Regular shot
          const newBullet = {
            id: Date.now(),
            x: player.x + player.width / 2 - 0.5,
            y: player.y - 3,
            width: 1,
            height: 3,
            type: 'bullet' as const,
            color: '#FFFFFF'
          };
          setBullets(prev => [...prev, newBullet]);
        }
      }

      // Spawn enemies - Fixed to ensure enemies are generated
      const spawnRate = Math.max(1000 - level * 50, 400); // Spawn faster as level increases
      if (time - enemySpawnTimeRef.current > spawnRate) {
        enemySpawnTimeRef.current = time;
        spawnEnemy(); // Always spawn an enemy when the timer is up
      }

      // Spawn power-ups
      if (time - powerUpSpawnTimeRef.current > 10000) { // Every 10 seconds
        powerUpSpawnTimeRef.current = time;
        if (Math.random() > 0.5 && !powerUpActive) {
          const newPowerUp = {
            id: Date.now(),
            x: Math.random() * 90,
            y: 0,
            width: 4,
            height: 4,
            type: 'powerUp' as const,
            speed: 0.1,
            color: '#61FF8D'
          };
          setPowerUps(prev => [...prev, newPowerUp]);
        }
      }

      // Move bullets
      setBullets(prev => 
        prev
          .map(bullet => ({
            ...bullet,
            y: bullet.y - 0.8
          }))
          .filter(bullet => bullet.y > -5)
      );

      // Move enemies
      setEnemies(prev => 
        prev
          .map(enemy => {
            let newX = enemy.x + (enemy.direction || 1) * (enemy.speed || 0.1);
            let newDirection = enemy.direction;
            
            if (newX <= 0 || newX >= 95) {
              newDirection = -newDirection;
              newX = Math.max(0, Math.min(95, newX));
            }
            
            return {
              ...enemy,
              x: newX,
              y: enemy.y + 0.1,
              direction: newDirection
            };
          })
          .filter(enemy => enemy.y < 100)
      );

      // Move power-ups
      setPowerUps(prev => 
        prev
          .map(powerUp => ({
            ...powerUp,
            y: powerUp.y + (powerUp.speed || 0.1)
          }))
          .filter(powerUp => powerUp.y < 100)
      );

      // Move stars (background effect)
      setStars(prev => 
        prev.map(star => ({
          ...star,
          y: star.y < 100 ? star.y + (star.speed || 0.05) : 0
        }))
      );

      // Check collisions
      checkCollisions();
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // Power-up timer
  useEffect(() => {
    let powerupTimer: NodeJS.Timeout;
    if (powerUpActive) {
      powerupTimer = setTimeout(() => {
        setPowerUpActive(false);
      }, 10000); // Power-up lasts 10 seconds
    }
    return () => {
      if (powerupTimer) clearTimeout(powerupTimer);
    };
  }, [powerUpActive]);

  // Level up when score reaches threshold
  useEffect(() => {
    const nextLevelScore = level * 100;
    if (score >= nextLevelScore && level < 10) {
      setLevel(prevLevel => prevLevel + 1);
      toast({
        title: `Level Up: ${level + 1}!`,
        description: "Enemies are getting faster!",
        duration: 2000,
      });
    }
  }, [score, level, toast]);

  // Collision detection
  const checkCollisions = () => {
    const updatedEnemies = [...enemies];
    const updatedBullets = [...bullets];
    const updatedPowerUps = [...powerUps];
    let updatedScore = score;
    let updatedLives = lives;
    let playerPoweredUp = powerUpActive;

    // Check bullet-enemy collisions
    for (let i = updatedBullets.length - 1; i >= 0; i--) {
      const bullet = updatedBullets[i];
      for (let j = updatedEnemies.length - 1; j >= 0; j--) {
        const enemy = updatedEnemies[j];
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          updatedBullets.splice(i, 1);
          updatedEnemies.splice(j, 1);
          updatedScore += 10;
          break;
        }
      }
    }

    // Check player-powerUp collisions
    for (let i = updatedPowerUps.length - 1; i >= 0; i--) {
      const powerUp = updatedPowerUps[i];
      if (
        player.x < powerUp.x + powerUp.width &&
        player.x + player.width > powerUp.x &&
        player.y < powerUp.y + powerUp.height &&
        player.y + player.height > powerUp.y
      ) {
        updatedPowerUps.splice(i, 1);
        playerPoweredUp = true;
        toast({
          title: "Power-Up!",
          description: "Triple shot activated!",
          duration: 2000,
        });
      }
    }

    // Check player-enemy collisions
    for (let i = updatedEnemies.length - 1; i >= 0; i--) {
      const enemy = updatedEnemies[i];
      if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
      ) {
        updatedEnemies.splice(i, 1);
        updatedLives -= 1;
        if (updatedLives <= 0) {
          gameEnd(updatedScore);
          return;
        } else {
          toast({
            title: `Hit! Lives: ${updatedLives}`,
            description: "Be careful!",
            duration: 1500,
          });
        }
      }
    }

    // Update game state
    setBullets(updatedBullets);
    setEnemies(updatedEnemies);
    setPowerUps(updatedPowerUps);
    setScore(updatedScore);
    setLives(updatedLives);
    setPowerUpActive(playerPoweredUp);
  };

  // End game
  const gameEnd = (finalScore: number) => {
    setGameOver(true);
    const newHighScore = Math.max(highScore, finalScore);
    
    if (newHighScore > highScore) {
      setHighScore(newHighScore);
      localStorage.setItem('pixel-game-highscore', newHighScore.toString());
      toast({
        title: "New High Score!",
        description: `Congratulations! Your new high score is ${newHighScore}!`,
        duration: 3000,
      });
    }
  };

  // Keyboard controls - Modified to prevent default behavior of space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') moveLeftRef.current = true;
      if (e.code === 'ArrowRight') moveRightRef.current = true;
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent space from scrolling the page
        shootingRef.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') moveLeftRef.current = false;
      if (e.code === 'ArrowRight') moveRightRef.current = false;
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent space from scrolling the page
        shootingRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Touch controls
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (!gameContainerRef.current) return;
      
      const rect = gameContainerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      
      if (x < 33) {
        moveLeftRef.current = true;
        moveRightRef.current = false;
      } else if (x > 66) {
        moveLeftRef.current = false;
        moveRightRef.current = true;
      } else {
        shootingRef.current = true;
      }
    };

    const handleTouchEnd = () => {
      moveLeftRef.current = false;
      moveRightRef.current = false;
      shootingRef.current = false;
    };

    const container = gameContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  // Start and stop game loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameStarted, gameOver]);

  return (
    <motion.div 
      ref={gameContainerRef}
      className="w-full aspect-square border-2 border-pixel-purple relative bg-pixel-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stars background */}
      {stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.width}px`,
            height: `${star.height}px`,
            backgroundColor: star.color || 'white'
          }}
        />
      ))}

      {/* Player */}
      {gameStarted && !gameOver && (
        <motion.div
          className={`absolute ${powerUpActive ? 'bg-pixel-cyan animate-pulse' : 'bg-pixel-cyan'}`}
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
            width: `${player.width}%`,
            height: `${player.height}%`,
          }}
        />
      )}

      {/* Bullets */}
      {bullets.map(bullet => (
        <motion.div
          key={`bullet-${bullet.id}`}
          className="absolute"
          style={{
            left: `${bullet.x}%`,
            top: `${bullet.y}%`,
            width: `${bullet.width}%`,
            height: `${bullet.height}%`,
            backgroundColor: bullet.color || 'white'
          }}
        />
      ))}

      {/* Enemies */}
      {enemies.map(enemy => (
        <motion.div
          key={`enemy-${enemy.id}`}
          className="absolute bg-pixel-pink"
          style={{
            left: `${enemy.x}%`,
            top: `${enemy.y}%`,
            width: `${enemy.width}%`,
            height: `${enemy.height}%`,
          }}
        />
      ))}

      {/* Power-ups */}
      {powerUps.map(powerUp => (
        <motion.div
          key={`powerUp-${powerUp.id}`}
          className="absolute animate-pulse"
          style={{
            left: `${powerUp.x}%`,
            top: `${powerUp.y}%`,
            width: `${powerUp.width}%`,
            height: `${powerUp.height}%`,
            backgroundColor: powerUp.color || '#61FF8D'
          }}
        />
      ))}

      {/* Game UI */}
      <div className="absolute top-2 left-2 font-pixel text-xs text-white">
        Score: {score}
      </div>
      <div className="absolute top-2 right-2 font-pixel text-xs text-pixel-cyan">
        High: {highScore}
      </div>
      <div className="absolute bottom-2 left-2 font-pixel text-xs">
        <span className="text-pixel-pink">Lvl: {level}</span>
      </div>
      <div className="absolute bottom-2 right-2 font-pixel text-xs">
        <span className={`${lives > 1 ? 'text-pixel-cyan' : 'text-pixel-pink'}`}>
          Lives: {Array(lives).fill('♥').join('')}
        </span>
      </div>

      {/* Stop Button - Added to top-center of the game */}
      {gameStarted && !gameOver && (
        <Button 
          variant="destructive" 
          size="sm"
          className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1 py-1 px-2 h-6"
          onClick={stopGame}
        >
          <Square size={12} />
          <span className="text-xs">Stop</span>
        </Button>
      )}

      {/* Game start/over screen */}
      {(!gameStarted || gameOver) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
          <h2 className="font-pixel text-sm text-pixel-cyan mb-2">
            {gameOver ? 'GAME OVER' : 'PIXEL INVADERS'}
          </h2>
          {gameOver && (
            <p className="font-pixel text-xs text-white mb-4">
              Score: {score} | Level: {level}
            </p>
          )}
          <motion.button
            className="pixel-btn font-pixel text-xs"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gameOver ? 'RETRY' : 'START'}
          </motion.button>
          <p className="mt-4 font-mono text-xs text-white opacity-70">
            Controls: ← → and SPACE
          </p>
          <p className="mt-2 font-mono text-xs text-pixel-pink opacity-70">
            Mobile: Tap left/right/center
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PixelMiniGame;
