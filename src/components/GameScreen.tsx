import React, { useState, useEffect } from 'react';
import '../styles/GameScreen.css';
import Card from './Card';

interface Props {
  x: number;
  y: number;
  onEndGame: () => void;
}

const GameScreen: React.FC<Props> = ({ x, y, onEndGame }) => {
  const totalCards = x * y;
  const [cards, setCards] = useState<number[]>([]);
  const [clickedCards, setClickedCards] = useState<{ index: number, value: number }[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const maxScore = totalCards / 2;
  const timeTaken = startTime ? ((endTime || new Date()).getTime() - startTime.getTime()) / 1000 : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = Math.floor(timeTaken % 60);
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Start the timer when the game starts
  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // Stop the timer when the game ends
  useEffect(() => {
    if (score === maxScore) {
      setEndTime(new Date());
    }
  }, [score]);

  // Function to generate a shuffled array of card numbers
  const generateCards = () => {
    let arr = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    arr = [...arr, ...arr]; // duplicate the array to create pairs
    arr.sort(() => Math.random() - 0.5); // shuffle the array
    setCards(arr);
  };

  // Run generateCards once when the component mounts
  useEffect(() => { generateCards(); }, []);
  const [scoredCards, setScoredCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (clickedCards.length === 2) {
      return;
    }

    setClickedCards((prev) => {
      const newClickedCards = [...prev, { index, value: cards[index] }];

      if (newClickedCards.length === 2) {
        const firstCard = newClickedCards[0].value;
        const secondCard = newClickedCards[1].value;

        if (firstCard === secondCard) {
          setMatchedCards((prevMatched) => {
            const newMatchedCards = [...prevMatched, firstCard];

            // Only add the card to scoredCards if both it and its pair have been matched
            if (newMatchedCards.filter(card => card === firstCard).length === 2) {
              setScoredCards((prevScored) => [...prevScored, firstCard]);
            }
            return newMatchedCards;
          });
        }
        // If the cards don't match, flip them back after 1 second
        setTimeout(() => {
          setClickedCards([]);
        }, 1000);
      }
      return newClickedCards;
    });
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (scoredCards.length > score) {
      setScore(scoredCards.length);
    }
  }, [scoredCards]);

  useEffect(() => {
    generateCards();
  }, []);

  return (
    <div className="gamescreen" style={{ gridTemplateColumns: `repeat(${x}, 1fr)` }}>
      {cards.map((cardNumber, index) => (
        <Card key={index} cardNumber={cardNumber} onClick={() => handleCardClick(index)}
          isFlipped={!!(clickedCards.find(card => card.index === index) || matchedCards.includes(cardNumber))} />
      ))}
      <p>Score: {score}</p>
      <p>Moves: {moves}</p>
      <p>Time taken: {formattedTime}</p>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
};

export default GameScreen;
