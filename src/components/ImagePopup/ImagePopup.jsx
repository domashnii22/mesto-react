export default function ImagePopup({card, isOpen, onClose}) {
    return (
      <div className={`popup popup_type_image ${isOpen && 'popup_opened'}`}>
        <div className="popup__block">
          <button
            aria-label="Кнопка закрытия попапа"
            type="button"
            className="popup__close-button"
            onClick={onClose}
          />
          <img src={card.link} alt={`Изображение ${card.name}`} className="popup__image" />
          <h2 className="popup__caption">{card.name}</h2>
        </div>
      </div>
    )
}