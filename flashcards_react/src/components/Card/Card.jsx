import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ word }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  // Сбрасываем состояние показа перевода при смене слова
  useEffect(() => {
    setShowTranslation(false);
  }, [word]);

  if (!word) {
    return (
      <div className="card-container">
        <div className="card no-word">
          <div className="card-content">
             <p>Слово не выбрано или список пуст.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          {/* Категория */}
          <div className="card-category">{word.category}</div>

          {/* Само слово (английское) */}
          <div className="card-text">{word.english}</div>

          {/* Условный рендеринг перевода */}
          {showTranslation && (
            <div className="card-translation">
              {word.russian}
            </div>
          )}

          {/* Кнопка "Показать перевод", отображается только если перевод скрыт */}
          {!showTranslation && (
            <button
              onClick={() => setShowTranslation(true)}
              className="btn btn-secondary card-button-toggle"
              aria-label="Показать перевод"
            >
              Показать перевод
            </button>
          )}

           {/* Кнопка "Скрыть перевод", отображается только если перевод показан */}
          {showTranslation && (
            <button
              onClick={() => setShowTranslation(false)}
              className="btn btn-secondary card-button-toggle"
              aria-label="Скрыть перевод"
            >
              Скрыть перевод
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;