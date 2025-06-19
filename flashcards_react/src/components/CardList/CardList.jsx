import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

const CardList = ({ words, currentCardIndex, onPrev, onNext, defaultCardIndex = 0 }) => {
  // Используем индекс из пропсов, если он передан и валиден, иначе используем defaultCardIndex
  const index = currentCardIndex !== undefined && currentCardIndex >= 0 && currentCardIndex < words.length
                ? currentCardIndex
                : defaultCardIndex;

  const currentWord = words[index];

  // Проверяем, есть ли слова для отображения
  if (!words || words.length === 0) {
    return (
      <div className="card-list-container">
        <p className="no-words-message">Список слов пуст. Добавьте слова для изучения!</p>
      </div>
    );
  }

  // Проверяем, если по какой-то причине текущее слово не найдено (хотя App.js должен это предотвращать)
   if (!currentWord) {
       return (
           <div className="card-list-container">
               <p className="no-words-message">Ошибка загрузки карточки. Пожалуйста, перезагрузите.</p>
           </div>
       );
   }


  // Определяем, является ли текущая карточка первой или последней
  const isFirstCard = index === 0;
  const isLastCard = index === words.length - 1;

  return (
    <div className="card-list-container">
      {/* Счетчик текущее/максимальное количество карточек */}
      <div className="card-counter">
        Карточка {index + 1} из {words.length}
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

// Определение defaultProps для initialCardIndex (если App не передает его)
// Хотя в моей реализации App всегда будет передавать currentCardIndex
CardList.defaultProps = {
  defaultCardIndex: 0
};

export default CardList;