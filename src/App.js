import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  {
    src: "/images/01EE6DC2-C67F-4476-AFA3-545B4300C557_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/1B0A52C3-AD45-4EC2-92CC-7195E50E01C7_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/4FAAC188-C30F-4C01-AA98-733E0138351C_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/8B1AB455-4996-4446-8ACF-2245FFAADA10_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/967A003D-040A-406E-98EB-FCEC72CB9EBC_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/A649EC2B-6800-4D56-8ECA-E6369C43B4DC_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/AA63C5FE-6EE2-469B-A9FA-EF088AE6306D_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/C19F3D58-F4F2-4DC8-A6D7-839AF41104F2_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/F24610A1-CC26-48C6-8E02-BE4833BF8026_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/FB4D1953-68BA-40BE-AEC7-9BE46A31008F_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/42786B91-FC90-4101-B83C-60C4B6A4030A_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/753CED40-778B-404D-B629-593C58583348_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/7B85A4B9-A9AD-4475-ABAA-B1104A9C9297_1_105_c.jpeg",
    matched: false,
  },
  {
    src: "/images/WhatsApp Image 2021-12-13 at 11.04.20 (1).jpeg",
    matched: false,
  },
  {
    src: "/images/A8E6C81B-C52A-423C-9E59-A8FB25BEE18D_1_105_c.jpeg",
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisable] = useState(false);
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice

  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  // compare 2 selected cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("those cards match");
        resetTurn();
      } else {
        console.log("those cards do not match");
        setTimeout(() => resetTurn(), 1500);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices & increase turn

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisable(false);
  };

  //start a new game automagically

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>Start</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
