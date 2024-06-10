import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import GameScreen from './components/GameScreen'; // import the GameScreen component
import EndScreen from './components/EndScreen'; // import the EndScreen component

function App() {
  const [gameState, setGameState] = useState('splash'); // state to manage the game state
  const [score, setScore] = useState(0); // state to manage the score
  const [timeTaken, setTimeTaken] = useState(0); // state to manage the time taken

  const startGame = () => {
    setGameState('play'); // set gameState to 'play' when game starts
  };

  const endGame = () => {
    console.log('Game Over! Score:', score, 'Time Taken:', timeTaken);
    setScore(score);
    setTimeTaken(timeTaken);
    setGameState('end'); // set gameState to 'end' when game ends
  };

  const restartGame = () => {
    setGameState('splash'); // set gameState to 'splash' when game restarts
    setScore(0); // reset the score
    setTimeTaken(0); // reset the time taken
  };

  return (
    <div className="App">
      {gameState === 'splash' && <SplashScreen onStartGame={startGame} />}
      {gameState === 'play' && <GameScreen x={4} y={4} onEndGame={endGame} />}
      {gameState === 'end' && <EndScreen onRestartGame={restartGame} score={score} timeTaken={timeTaken} />}
    </div>
  );
}

export default App;
