/* eslint-disable react/prop-types */ // Необходимо для отключения проверки prop-types в этом файле

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList/CardList';
import WordList from './components/WordList/WordList';
import './App.css';
import './styles/global.css';
import { initialWords as defaultInitialWords } from './data/initialWords';

function App() {
  // Состояние для списка слов
  const [words, setWords] = useState(defaultInitialWords);
  // Индекс текущей карточки
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // ID слова, которое редактируется (null, если ничего не редактируется)
  const [editingWordId, setEditingWordId] = useState(null);

  // Функция для сохранения изменений в слове
  const handleSaveWord = (wordId, updatedWord) => {
    setWords((prevWords) =>
      prevWords.map((word) => (word.id === wordId ? updatedWord : word))
    );
    setEditingWordId(null);
  };

  // Функция для удаления слова
  const handleDeleteWord = (wordId) => {
    if (window.confirm("Вы уверены, что хотите удалить это слово?")) {
      setWords((prevWords) => prevWords.filter((word) => word.id !== wordId));
      setEditingWordId(null);
      setCurrentCardIndex((prevIndex) => {
        const newWords = words.filter((word) => word.id !== wordId);
        const newLength = newWords.length;
        return newLength === 0 ? 0 : Math.min(prevIndex, newLength - 1);
      });
    }
  };

  // Функция для начала редактирования слова
  const handleEditWord = (wordId) => {
    setEditingWordId(wordId);
  };

  // Функция для отмены редактирования
  const handleCancelEdit = () => {
    setEditingWordId(null);
  };

  // Функция для перехода к предыдущей карточке
  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  // Функция для перехода к следующей карточке
  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => Math.min(words.length - 1, prevIndex + 1));
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
            <Route exact path="/" element={<WordList
                words={words}
                editingWordId={editingWordId}
                onEditWord={handleEditWord}
                onDeleteWord={handleDeleteWord}
                onSaveWord={handleSaveWord}
                onCancelEdit={handleCancelEdit}
              />} />
            <Route path="/game" element={<CardList
                words={words}
                currentCardIndex={currentCardIndex}
                onPrev={handlePrevCard}
                onNext={handleNextCard}
              />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;