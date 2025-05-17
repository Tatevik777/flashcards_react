import React from 'react';
import WordRow from '../WordRow/WordRow';
import './WordList.css';

const WordList = ({
  words,
  editingWordId,
  onEditWord,
  onDeleteWord,
  onSaveWord,
  onCancelEdit, // Функция отмены редактирования в родителе
}) => {

  // Проверка, если массив слов пуст
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
            <th>Категория</th> {/* Или "Язык", в зависимости от вашей структуры */}
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <WordRow
              key={word.id}
              word={word}
              isEditing={editingWordId === word.id} // Определяем, редактируется ли текущая строка
              onEdit={onEditWord} // Передаем обработчик для начала редактирования
              onDelete={onDeleteWord} // Передаем обработчик удаления
              onSave={onSaveWord} // Передаем обработчик сохранения
              onCancel={onCancelEdit} // Передаем обработчик отмены
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordList;