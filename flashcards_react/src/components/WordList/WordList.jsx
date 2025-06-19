import React from 'react';
import WordRow from '../WordRow/WordRow';
import './WordList.css';

const WordList = ({
  words,
  editingWordId,
  onEditWord,
  onDeleteWord,
  onSaveWord,
  onCancelEdit,
}) => {
  if (!words || words.length === 0) {
    return (
      <div className="word-list-container">
        <p className="word-list-empty">Список слов пуст. Добавьте новые слова!</p>
      </div>
    );
  }

  return (
    <div className="word-list-container">
      <h2>Ваши слова</h2>
      <table className="word-list-table">
        <thead>
          <tr>
            <th>Английский</th>
            <th>Русский</th>
            <th>Категория</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <WordRow
              key={word.id}
              word={word}
              isEditing={editingWordId === word.id}
              onEdit={onEditWord}
              onDelete={onDeleteWord}
              onSave={onSaveWord}
              onCancel={onCancelEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordList;
