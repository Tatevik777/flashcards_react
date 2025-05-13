import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WordList from './components/WordList/WordList';
import { initialWords } from './data/initialWords';
import './App.css';

function App() {
  const [words, setWords] = useState(initialWords);
  const [editingWordId, setEditingWordId] = useState(null); // ID слова, которое редактируется

  // Можно добавить форму для добавления новых слов здесь или в отдельном компоненте

  const handleEditWord = (wordId) => {
    setEditingWordId(wordId);
  };

  const handleCancelEdit = () => {
    setEditingWordId(null);
  };

  const handleSaveWord = (wordId, updatedWord) => {
    setWords(words.map(w => (w.id === wordId ? updatedWord : w)));
    setEditingWordId(null); // Завершаем редактирование
  };

  const handleDeleteWord = (wordId) => {
    // Добавим подтверждение перед удалением для лучшего UX
    if (window.confirm('Вы уверены, что хотите удалить это слово?')) {
      setWords(words.filter(w => w.id !== wordId));
      if (editingWordId === wordId) { // Если удаляли редактируемое слово
        setEditingWordId(null);
      }
    }
  };

  // TODO: Функция для добавления нового слова
  // const handleAddWord = (newWordData) => {
  //   const newWord = {
  //     id: Date.now(), // Простой способ генерации ID, лучше использовать uuid
  //     ...newWordData
  //   };
  //   setWords([...words, newWord]);
  // };

  return (
    <div className="app">
      <Header />
      <main className="app-main-content">
        {/* Здесь можно разместить форму добавления слов */}
        <h2>Список ваших слов</h2>
        <WordList
          words={words}
          editingWordId={editingWordId}
          onEditWord={handleEditWord}
          onDeleteWord={handleDeleteWord}
          onSaveWord={handleSaveWord}
          onCancelEdit={handleCancelEdit}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;