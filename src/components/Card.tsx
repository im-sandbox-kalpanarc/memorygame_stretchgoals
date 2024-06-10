import React, { useState } from 'react';
import '../styles/Card.css';

interface CardProps {
  cardNumber: number;
  onClick: () => void;
  isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ cardNumber, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
  };

  return (
    <div className="card" onClick={handleClick}>
      {isClicked
        ? <> {`${cardNumber}`}
          <img style={{ width: '70px', height: '70px' }} src={`${process.env.PUBLIC_URL}/images/${cardNumber}.png`} alt={`Card ${cardNumber}`} /></>
        : <> {`${cardNumber}`} <img style={{ width: '90px', height: '90px' }} src={`${process.env.PUBLIC_URL}/images/clickme.jpeg`} /></>
      }
    </div>
  );
};

export default Card;
