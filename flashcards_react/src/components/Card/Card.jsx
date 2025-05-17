import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false); // Сброс состояния при смене слова
  }, [word]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Переключаем состояние
  };

  if (!word) { // Проверка слова
    return (
      <div className="card-container">
        <div className="card no-word">Слово не выбрано</div>
      </div>
    );
  }

  return (
    <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card">
        <div className="card-face card-face-front">
          <div className="card-content">
            <div className="card-category">{word.category}</div>
            <div className="card-text">{word.english}</div>
          </div>
        </div>

        <div className="card-face card-face-back">
          <div className="card-content">
            <div className="card-category">{word.category}</div>
            <div className="card-text">{word.russian}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;