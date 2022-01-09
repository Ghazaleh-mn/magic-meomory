import { useCallback } from "react";
import "./SingleCard.css";
import { cardType } from "../types";

interface props {
	card: cardType;
	handleChoice: (data: cardType) => void;
	flipped: boolean;
	disabled: boolean;
}
export function Singlecard({ card, handleChoice, flipped, disabled }: props) {
	const handleOnClick = useCallback(() => {
		if (!disabled) {
			handleChoice(card);
		}
	}, [card, handleChoice, disabled]);
	console.log(disabled);
	return (
		<div className="card" key={card.id}>
			<div className={flipped ? "flipped" : ""}>
				<img className="front" src={card.src} alt="card front" />
				<img
					className="back"
					src="/img/cover.png"
					alt="card back"
					onClick={handleOnClick}
				/>
			</div>
		</div>
	);
}
