export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          aria-label="Кнопка закрытия попапа"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          noValidate=""
          name="popupForm"
          className={`popup__form popup__form_type_${name}`}
        >
          {children}
          <button
            type="submit"
            className={`popup__save-button popup__save-button_type_${name}`}
          >
            {titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
