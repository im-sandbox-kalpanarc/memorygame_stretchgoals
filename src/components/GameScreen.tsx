import React, { useState, useEffect } from 'react';
import '../styles/GameScreen.css';
import Card from './Card'; // import the Card component

/*
    This is the GameScreen component that will be displayed when the game is in progress.
    It will display the grid of cards and a button to end the game.
    Optionally, we can add a timer, a score, and other game-related information here.
    We need to keep track of the state of each card, the number of cards, and the type of cards
    and implement the logic to check if two cards are a match. If they are a match, we can
    update the state of the cards to indicate that they are matched. If they are not a match,
    we can flip the cards back over.
*/

interface Props {
  // keep track of the number of cards in the x and y grid
  x: number;
  y: number;
  onEndGame: () => void; // Prop function to end the game
}

const GameScreen: React.FC<Props> = ({ x, y, onEndGame }) => {
  const totalCards = x * y;
  const [cards, setCards] = useState<number[]>([]);

  // Function to generate a shuffled array of card numbers
  const generateCards = () => {
    let arr = Array.from({ length: totalCards }, (_, i) => i + 1);
    arr = [...arr, ...arr]; // duplicate the array to create pairs
    arr.sort(() => Math.random() - 0.5); // shuffle the array
    setCards(arr);
  };

  // Run generateCards once when the component mounts
  useEffect(() => {
    generateCards();
  }, []);

  return (
    <div className="gamescreen" style={{ gridTemplateColumns: `repeat(${x}, 1fr)` }}>
      {cards.map((cardNumber, index) => (
        <Card key={index} cardNumber={cardNumber} />
      ))}
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
};

export default GameScreen;
