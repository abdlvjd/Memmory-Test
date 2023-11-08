// import './App.css';

// function App() {
//   return (
//     <div className="App">
//   hello
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  const cardContent = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  useEffect(() => {
    // Create a shuffled deck of cards
    const initialCards = shuffleArray(cardContent.concat(cardContent));
    setCards(initialCards.map((content, index) => ({ content, id: index, isFlipped: false })));
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2) {
      return;
    }

    setFlipped((prevFlipped) => [...prevFlipped, id]);

    if (flipped.length === 1) {
      if (cards[flipped[0]].content === cards[id].content) {
        // Match
        setSolved((prevSolved) => [...prevSolved, flipped[0], id]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="App">
      <h1>Memory Test Game</h1>
      <div className="board">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`card ${flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''}`}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? card.content : 'Click to reveal'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
