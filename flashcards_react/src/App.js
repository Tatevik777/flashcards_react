import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WordList from './components/WordList/WordList';
import CardList from './components/CardList/CardList'; 
import { initialWords } from './data/initialWords';
import './App.css';

function App() {
  const [editingWordId, setEditingWordId] = useState(null);
  const [words, setWords] = useState(initialWords);

    const handleSaveWord = (wordId, updatedWord) => {
    setWords((prevWords) =>
      prevWords.map((word) => (word.id === wordId ? updatedWord : word))
    );
    setEditingWordId(null);
  };

  const handleDeleteWord = (wordId) => {
    if (window.confirm("Вы уверены, что хотите удалить это слово?")) {
      setWords((prevWords) => prevWords.filter((word) => word.id !== wordId));

      // Если удаляется редактируемое слово, сбрасываем editingWordId
      if (editingWordId === wordId) {
        setEditingWordId(null);
      }
    }
  };

  const handleEditWord = (wordId) => {
    setEditingWordId(wordId);
  };
  const handleCancelEdit = () => {
    setEditingWordId(null);
  };

  // Состояние для отслеживания индекса текущей карточки
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Обработчик перехода к следующей карточке
  const handleNextCard = () => {
    // Проверяем, не последняя ли карточка
    if (currentCardIndex < words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1); // Увеличиваем индекс
    }
  };

  // Обработчик перехода к предыдущей карточке
  const handlePrevCard = () => {
    // Проверяем, не первая ли карточка
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1); // Уменьшаем индекс
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="app-main-content">
    <WordList
          words={words}
          editingWordId={editingWordId}
          onEditWord={handleEditWord}
          onDeleteWord={handleDeleteWord}
          onSaveWord={handleSaveWord}
          onCancelEdit={handleCancelEdit}
        />
        {/* Передаем в CardList список слов, текущий индекс и обработчики навигации */}
        {words.length > 0 ? (
             <CardList
                words={words}
                currentCardIndex={currentCardIndex}
                onPrev={handlePrevCard}
                onNext={handleNextCard}
             />
        ) : (
            <p className="no-words-message">Слова для изучения не найдены.</p>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;