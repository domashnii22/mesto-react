export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose}) {
    return (
      <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button
            aria-label="Кнопка закрытия попапа"
            type="button"
            className="popup__close-button"
            onClick={onClose}
          />
          <h2 className="popup__title">{title}</h2>
          <form noValidate="" name="popupForm" className="popup__form">
            {children}
            <button
              type="submit"
              className="popup__save-button popup__save-button_type_edit popup__save-button_valid"
            >
              {titleButton || 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    )
}