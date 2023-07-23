import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import ButtonLike from "../ButtonLike/ButtonLike";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <article className="place">
      {currentUser._id === card.owner._id && (
        <button
          aria-label="Кнопка удаления карточки"
          type="button"
          className="place__trash-button"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className="place__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="place__caption-block">
        <h2 className="place__caption">{card.name}</h2>
        <div className="place__heart-block">
          <ButtonLike
            likes={card.likes}
            myid={currentUser._id}
            cardid={card._id}
          />
        </div>
      </div>
    </article>
  );
}
