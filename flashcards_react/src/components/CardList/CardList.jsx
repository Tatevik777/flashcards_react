import React from 'react';
import Card from '../Card/Card'; // Импортируем компонент карточки
import './CardList.css'; // Импорт стилей

const CardList = ({ words, currentCardIndex, onPrev, onNext }) => {
  // Получаем текущее слово по индексу
  const currentWord = words[currentCardIndex];

  // Проверяем, если текущее слово существует
  if (!currentWord) {
    return (
      <div className="no-words-message">
        Слова для изучения не найдены.
      </div>
    );
  }

  // Определяем, является ли текущая карточка первой или последней
  const isFirstCard = currentCardIndex === 0;
  const isLastCard = currentCardIndex === words.length - 1;

  return (
    <div className="card-list-container">
      {/* Счетчик текущее/максимальное количество карточек */}
      <div className="card-counter">
        Карточка {currentCardIndex + 1} из {words.length}
      </div>

      {/* Отображаем текущую карточку */}
      <Card word={currentWord} /> 

      {/* Кнопки навигации */}
      <div className="card-navigation">
        <button 
          onClick={onPrev} 
          disabled={isFirstCard} // Отключаем кнопку "Назад" на первой карточке
          className="btn btn-primary"
          aria-label="Предыдущее слово"
        >
          Назад
        </button>
        <button 
          onClick={onNext} 
          disabled={isLastCard} // Отключаем кнопку "Вперед" на последней карточке
          className="btn btn-primary"
          aria-label="Следующее слово"
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default CardList;