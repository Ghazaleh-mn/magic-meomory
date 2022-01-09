import { useEffect } from "react";
import { useCallback, useState } from "react";
import "./App.css";
import { Singlecard } from "./components/SingleCard";
import { cardType } from "./types";

const cardImages: { src: string; matched: boolean }[] = [
	{ src: "/img/helmet-1.png", matched: false },
	{ src: "/img/potion-1.png", matched: false },
	{ src: "/img/ring-1.png", matched: false },
	{ src: "/img/scroll-1.png", matched: false },
	{ src: "/img/shield-1.png", matched: false },
	{ src: "/img/sword-1.png", matched: false },
];

function App() {
	const [cards, setCards] = useState<cardType[]>([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState<cardType | null>(null);
	const [choiceTwo, setChoiceTwo] = useState<cardType | null>(null);
	const [disabled, setDisabled] = useState(false);

	const shuffleCards = useCallback(() => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	}, []);

	const handleChoice = useCallback(
		(card: cardType) => {
			if (choiceOne === null) {
				setChoiceOne(card);
			} else if (choiceTwo === null) {
				setChoiceTwo(card);
			}
		},
		[choiceOne, choiceTwo]
	);

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards: cardType[]) => {
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
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	const resetTurn = useCallback(() => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
		//function bashe dependemcy nemikhad
	}, []);

	console.log(choiceOne, choiceTwo);
	console.log(disabled);

	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => (
					<Singlecard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns:{turns}</p>
		</div>
	);
}

export default App;
