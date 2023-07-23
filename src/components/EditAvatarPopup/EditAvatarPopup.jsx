import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = useRef();
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        ref={input}
        required=""
        name="avatar"
        placeholder="Ссылка на аватар"
        type="url"
        className={`popup__input popup__input_text_link ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : "popup__input_error"
        }`}
        value={values.avatar ? values.avatar : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-error_type_avatar">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
