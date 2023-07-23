import { useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("occupation", currentUser.about);
  }, [currentUser, setValue]);

  function resetForClose() {
    onClose();
    reset({ name: currentUser.name, occupation: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, occupation: values.occupation }, reset);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        required=""
        name="name"
        placeholder="Имя"
        type="text"
        className={`popup__input popup__input_text_name ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_error"
        }`}
        minLength={2}
        maxLength={40}
        value={values.name ? values.name : ""}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-error_type_name">
        {errors.name}
      </span>
      <input
        required=""
        name="occupation"
        placeholder="Должность"
        type="text"
        className={`popup__input popup__input_text_occupation ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_error"
        }`}
        minLength={2}
        maxLength={200}
        onChange={handleChange}
        value={values.occupation ? values.occupation : ""}
      />
      <span className="popup__input-error popup__input-error_type_occupation">
        {errors.occupation}
      </span>
    </PopupWithForm>
  );
}
