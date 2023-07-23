import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        required=""
        name="title"
        placeholder="Название"
        type="text"
        className={`popup__input popup__input_text_title ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_error"
        }`}
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={values.title ? values.title : ""}
      />
      <span className="popup__input-error popup__input-error_type_title">
        {errors.title}
      </span>
      <input
        required=""
        name="link"
        placeholder="Ссылка на картинку"
        type="url"
        className={`popup__input popup__input_text_link ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_error"
        }`}
        onChange={handleChange}
        value={values.link ? values.link : ""}
      />
      <span className="popup__input-error popup__input-error_type_link">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
