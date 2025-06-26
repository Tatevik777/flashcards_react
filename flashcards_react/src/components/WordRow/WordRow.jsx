import React, { useState, useEffect } from 'react';
import './WordRow.css';

const WordRow = ({
  word,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) => {
  const [editedWord, setEditedWord] = useState({ ...word }); 
 
  useEffect(() => {
    setEditedWord({ ...word });
  }, [word, isEditing]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
      onSave(word.id, editedWord); 
  };

  if (isEditing) {
    return (
      <tr className="word-row editing">
        <td>
          <input
            type="text"
            name="english"
            value={editedWord.english}
            onChange={handleChange}
            className="word-input"
          />
        </td>
        <td>
          <input
            type="text"
            name="russian"
            value={editedWord.russian}
            onChange={handleChange}
            className="word-input"
          />
        </td>
         <td>
          <select
              name="category" 
              value={editedWord.category}
              onChange={handleChange}
              className="word-input"
          >
              <option value="Фрукты">Фрукты</option>
              <option value="Транспорт">Транспорт</option>
              <option value="Здания">Здания</option>
              <option value="Предметы">Предметы</option>
              <option value="Другое">Другое</option>
          </select>
        </td>
        <td className="actions-cell">
          <button onClick={handleSave} className="btn btn-success">
            Сохранить
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            Отмена
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="word-row">
      <td>{word.english}</td>
      <td>{word.russian}</td>
      <td>{word.category}</td>
      <td className="actions-cell">
        <button onClick={() => onEdit(word.id)} className="btn btn-info">
          Редактировать
        </button>
        <button onClick={() => onDelete(word.id)} className="btn btn-danger">
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default WordRow;