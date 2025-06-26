import React, { useState } from 'react';
import './AddWordForm.css';

const initial = { english: '', russian: '', category: '' };


const AddWordForm = ({ onAdd }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});




  const validate = () => {
    const errs = {};
    if (!form.english.trim()) errs.english = true;
    if (!form.russian.trim()) errs.russian = true;
    if (!form.category.trim()) errs.category = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: false }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onAdd(form);
    setForm(initial);
    setErrors({});
  };

  return (
    <form className="add-word-form" onSubmit={handleSubmit}>
      <input
        name="english"
        placeholder="Английское"
        value={form.english}
        onChange={handleChange}
        className={errors.english ? 'input-error' : ''}
      />
      <input
        name="russian"
        placeholder="Русское"
        value={form.russian}
        onChange={handleChange}
        className={errors.russian ? 'input-error' : ''}
      />
      <input
        name="category"
        placeholder="Категория"
        value={form.category}
        onChange={handleChange}
        className={errors.category ? 'input-error' : ''}
      />
      <button type="submit" className="btn btn-success">
        Добавить слово
      </button>
    </form>
  );
};

export default AddWordForm;