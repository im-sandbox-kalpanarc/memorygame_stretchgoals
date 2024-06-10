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
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
};

export default GameScreen;
