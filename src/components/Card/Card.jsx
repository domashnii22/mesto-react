export default function Card({ card, onCardClick }) {
  return (
    <article className="place">
      <button
        aria-label="Кнопка удаления карточки"
        type="button"
        className="place__trash-button"
      />
      <img
        className="place__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="place__caption-block">
        <h2 className="place__caption">{card.name}</h2>
        <div className="place__heart-block">
          <button
            aria-label="Кнопка для лайка"
            type="button"
            className="place__heart"
          />
          <span className="place__heart-counter" />
        </div>
      </div>
    </article>
  );
}
