import React, { useEffect, useRef, useState } from 'react';
import './Card.css';

const Card = ({ word, onShowTranslation }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const hasShownRef = useRef(false); 
  const showButtonRef = useRef(null);

  
  useEffect(() => {
    setShowTranslation(false);
    hasShownRef.current = false;
  }, [word]);

 
  useEffect(() => {
    if (showButtonRef.current && !showTranslation) {
      showButtonRef.current.focus();
    }
  }, [word, showTranslation]);

  const handleShow = () => {
    setShowTranslation(true);
    if (!hasShownRef.current) {
      onShowTranslation?.(); 
      hasShownRef.current = true;
    }
  };

  if (!word) return null;

  return (
    <div className="card">
      <div className="card-category">{word.category}</div>
      <div className="card-text">{word.english}</div>

      {showTranslation && (
        <div className="card-translation">{word.russian}</div>
      )}

      {!showTranslation && (
        <button
          ref={showButtonRef}
          onClick={handleShow}
          className="btn"
        >
          Показать перевод
        </button>
      )}

      {showTranslation && (
        <button
          onClick={() => setShowTranslation(false)}
          className="btn"
        >
          Скрыть перевод
        </button>
      )}
    </div>
  );
};

export default Card;