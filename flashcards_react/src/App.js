/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import WordList from './components/WordList/WordList';
import CardList from './components/CardList/CardList';
import AddWordForm from './components/AddWordForm/AddWordForm';

import { initialWords as defaultInitialWords } from './data/initialWords';
import './App.css';
import './styles/global.css';

function App() {
  const [words, setWords] = useState(defaultInitialWords);

  const [editingWordId, setEditingWordId] = useState(null);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleAddWord = (newWord) => {
    const id = Date.now(); 
    setWords(prev => [...prev, { id, ...newWord }]);
  };

  const handleEditWord = (id) => setEditingWordId(id);

  const handleCancelEdit = () => setEditingWordId(null);

  const handleSaveWord = (id, updatedWord) => {
    const hasEmptyFields = !updatedWord.english || !updatedWord.russian || !updatedWord.category;
    if (hasEmptyFields) {
      alert("Ошибка: все поля должны быть заполнены");
      return;
    }

    setWords(prev =>
      prev.map(word => (word.id === id ? updatedWord : word))
    );
    setEditingWordId(null);
    console.log("Слово сохранено:", updatedWord);
  };

  const handleDeleteWord = (id) => {
    if (window.confirm("Удалить это слово?")) {
      const newWords = words.filter(word => word.id !== id);
      setWords(newWords);
      setEditingWordId(null);

      setCurrentCardIndex((prevIndex) =>
        newWords.length === 0 ? 0 : Math.min(prevIndex, newWords.length - 1)
      );
    }
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(index => Math.max(0, index - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex(index => Math.min(words.length - 1, index + 1));
  };

  useEffect(() => {
    if (currentCardIndex >= words.length && words.length > 0) {
      setCurrentCardIndex(words.length - 1);
    } else if (words.length === 0) {
      setCurrentCardIndex(0);
    }
  }, [words, currentCardIndex]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />

        <main className="app-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                 <div className="form-wrapper">
        <AddWordForm onAdd={handleAddWord} />
      </div>
                  <WordList
                    words={words}
                    editingWordId={editingWordId}
                    onEditWord={handleEditWord}
                    onDeleteWord={handleDeleteWord}
                    onSaveWord={handleSaveWord}
                    onCancelEdit={handleCancelEdit}
                  />
                </>
              }
            />

            <Route
              path="/game"
              element={
                <CardList
                  words={words}
                  currentCardIndex={currentCardIndex}
                  onPrev={handlePrevCard}
                  onNext={handleNextCard}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;