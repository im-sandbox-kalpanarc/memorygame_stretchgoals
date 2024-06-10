// Card.tsx
import React from 'react';
import '../styles/Card.css';

interface CardProps {
  cardNumber: number;
  onClick: () => void;
  isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ cardNumber, onClick, isFlipped }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="card" onClick={handleClick}>
      {isFlipped
        ? <> {`${cardNumber}`}
          <img style={{ width: '70px', height: '70px' }} src={`${process.env.PUBLIC_URL}/images/${cardNumber}.png`} alt={`Card ${cardNumber}`} /></>
        : <> {`${cardNumber}`} <img style={{ width: '85px', height: '85px' }} src={`${process.env.PUBLIC_URL}/images/clickme.jpeg`} /></>
      }
    </div>
  );
};

export default Card;
