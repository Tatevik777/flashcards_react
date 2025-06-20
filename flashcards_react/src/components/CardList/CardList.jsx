import React, { useState } from 'react';
import Card from '../Card/Card';
import './CardList.css';

const CardList = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studiedCount, setStudiedCount] = useState(0);

  const currentWord = words[currentIndex];

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(index => index + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(index => index - 1);
    }
  };

  // 🔥 Увеличиваем счетчик при первом показе перевода
  const handleShowTranslation = () => {
    setStudiedCount(count => count + 1);
  };

  if (!words || words.length === 0) {
    return <p>Нет слов для изучения</p>;
  }

  return (
    <div className="card-list-container">
      <h2>Изучено слов: {studiedCount}</h2>

      <Card
        word={currentWord}
        onShowTranslation={handleShowTranslation}
      />

      <div className="card-navigation">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Назад</button>
        <button onClick={handleNext} disabled={currentIndex === words.length - 1}>Вперед</button>
      </div>
    </div>
  );
};

export default CardList;
