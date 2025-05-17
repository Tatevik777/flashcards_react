import React from 'react';
import WordRow from '../WordRow/WordRow';
import './WordList.css';

const WordList = ({ words, editingWordId, onEditWord, onDeleteWord, onSaveWord, onCancelEdit }) => {
  if (!words.length) {
    return <p className="word-list-empty">Список слов пуст. Добавьте новые слова!</p>;
  }

  return (
    <div className="word-list-container">
      <table className="word-list-table">
        <thead>
          <tr>
            <th>Слово</th>
            <th>Перевод</th>
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