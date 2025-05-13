import React, { useState, useEffect } from 'react';
import './WordRow.css';

const WordRow = ({ word, isEditing, onEdit, onDelete, onSave, onCancel }) => {
  const [editedOriginal, setEditedOriginal] = useState(word.original);
  const [editedTranslation, setEditedTranslation] = useState(word.translation);

  // Обновляем внутреннее состояние, если слово изменилось извне (например, отменили редактирование другого слова)
  useEffect(() => {
    setEditedOriginal(word.original);
    setEditedTranslation(word.translation);
  }, [word, isEditing]); // Перезапускаем, если isEditing тоже меняется

  const handleSave = () => {
    onSave(word.id, { ...word, original: editedOriginal, translation: editedTranslation });
  };

  if (isEditing) {
    return (
      <tr className="word-row editing">
        <td>
          <input
            type="text"
            className="form-control"
            value={editedOriginal}
            onChange={(e) => setEditedOriginal(e.target.value)}
            aria-label="Редактировать слово"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={editedTranslation}
            onChange={(e) => setEditedTranslation(e.target.value)}
            aria-label="Редактировать перевод"
          />
        </td>
        <td>{word.lang}</td>
        <td className="word-row-actions">
          <button onClick={handleSave} className="btn btn-success">Сохранить</button>
          <button onClick={onCancel} className="btn btn-secondary">Отмена</button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="word-row">
      <td>{word.original}</td>
      <td>{word.translation}</td>
      <td>{word.lang}</td>
      <td className="word-row-actions">
        <button onClick={() => onEdit(word.id)} className="btn btn-primary">Редактировать</button>
        <button onClick={() => onDelete(word.id)} className="btn btn-danger">Удалить</button>
      </td>
    </tr>
  );
};

export default WordRow;