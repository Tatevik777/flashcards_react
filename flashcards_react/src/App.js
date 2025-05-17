import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardList from './components/CardList/CardList';
import WordList from './components/WordList/WordList';
import './App.css';
import './styles/global.css'; // Импорт глобальных стилей
import { initialWords as defaultInitialWords } from './data/initialWords'; // Переименовали для ясности

// Получаем начальный индекс карточки из пропсов, если передан, иначе 0
// (Хотя в данном простом приложении App не принимает пропсы, эта логика полезна для переиспользуемости)
// const initialCardIndex = props.initialCardIndex !== undefined ? props.initialCardIndex : 0; // Пример с пропсами

function App() {
  const [words, setWords] = useState(defaultInitialWords);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Состояние для текущего индекса карточки
  const [editingWordId, setEditingWordId] = useState(null); // Состояние для ID редактируемого слова

  // --- Обработчики для WordList (таблицы) ---

  const handleSaveWord = (wordId, updatedWord) => {
    setWords((prevWords) =>
      prevWords.map((word) => (word.id === wordId ? updatedWord : word))
    );
    setEditingWordId(null); // Выход из режима редактирования
  };

  const handleDeleteWord = (wordId) => {
    // Простая проверка перед удалением
    if (window.confirm("Вы уверены, что хотите удалить это слово?")) {
      setWords((prevWords) => prevWords.filter((word) => word.id !== wordId));

      // Если удалили текущую карточку в CardList, нужно скорректировать индекс
      // И если удалили редактируемое слово, сбросить editingWordId
      setEditingWordId(null); // Сбрасываем редактирование

      // Корректируем индекс карточки после удаления
      setCurrentCardIndex((prevIndex) => {
          const newWords = words.filter((word) => word.id !== wordId);
          const newLength = newWords.length;

          if (newLength === 0) {
              return 0; // Если список пуст после удаления
          }
          // Если текущий индекс был больше или равен новому количеству слов,
          // переходим на последний элемент (или 0, если был 0-й удален)
          if (prevIndex >= newLength) {
              return newLength - 1;
          }
          // Если удалили слово до текущего индекса, индекс остается верным
          // Если удалили само текущее слово, индекс остается верным для следующего (если есть)
          // Если удалили слово после текущего, индекс остается верным
           return prevIndex;
      });
    }
  };

  const handleEditWord = (wordId) => {
    // При попытке редактировать другое слово, если уже редактируется, отменяем предыдущее
    if (editingWordId !== null && editingWordId !== wordId) {
        alert("Завершите редактирование текущего слова!"); // Или более мягкий UX
        return;
    }
    setEditingWordId(wordId); // Устанавливаем ID слова для редактирования
  };

  const handleCancelEdit = () => {
    setEditingWordId(null); // Сброс режима редактирования
  };

   // --- Обработчики для CardList (карточек) ---

   const handlePrevCard = () => {
     setCurrentCardIndex((prevIndex) => {
       // Переходим на предыдущую карточку, но не ниже 0
       return Math.max(0, prevIndex - 1);
     });
   };

   const handleNextCard = () => {
     setCurrentCardIndex((prevIndex) => {
       // Переходим на следующую карточку, но не выше words.length - 1
       // Если список пуст, words.length будет 0, words.length - 1 будет -1. Math.min(prevIndex + 1, -1) вернет -1.
       // В CardList есть проверка на currentWord, которая обработает -1.
       // Но лучше предотвратить выход за границы здесь.
       const maxIndex = words.length > 0 ? words.length - 1 : 0;
       return Math.min(maxIndex, prevIndex + 1);
     });
   };

  // Проверка и корректировка currentCardIndex, если words изменились (например, после удаления)
  useEffect(() => {
      if (currentCardIndex >= words.length && words.length > 0) {
          setCurrentCardIndex(words.length - 1); // Переходим на последний элемент, если текущий индекс стал невалидным
      } else if (words.length === 0) {
          setCurrentCardIndex(0); // Сброс индекса, если список пуст
      }
  }, [words, currentCardIndex]); // Зависимости: список слов и текущий индекс


  return (
    <div className="App">
      <Header />
      <main className="app-main-content">
        {/* Секция с карточками */}
        <section className="card-section">
            <h2>Учите слова</h2>
            <CardList
                words={words}
                currentCardIndex={currentCardIndex}
                onPrev={handlePrevCard}
                onNext={handleNextCard}
                // defaultCardIndex={0} // Могли бы передать дефолт, но App управляет индексом явно
            />
        </section>

        <hr className="divider" /> {/* Разделитель секций */}

        {/* Секция с таблицей слов */}
        <section className="wordlist-section">
             <h2>Редактируйте и удаляйте слова</h2>
            <WordList
                words={words}
                editingWordId={editingWordId}
                onEditWord={handleEditWord}
                onDeleteWord={handleDeleteWord}
                onSaveWord={handleSaveWord}
                onCancelEdit={handleCancelEdit}
            />
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default App;