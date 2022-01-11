import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front-card" src={card.src} alt="front card"></img>
        <img
          className="back-card"
          src="/images/cover.jpeg"
          onClick={handleClick}
          alt="back card"
        ></img>
      </div>
    </div>
  );
}
