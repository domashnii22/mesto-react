import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import Footer from '../components/Footer/Footer'
import PopupWithForm from '../components/PopupWithForm/PopupWithForm'
import ImagePopup from '../components/ImagePopup/ImagePopup'
import { useState } from 'react'

function App() {

const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
const [ selectedCard, setSelectedCard] = useState({});
const [ isImagePopup, setIsImagePopup] = useState(false);

console.log(selectedCard)

function closeAllPopups() {
  setIsEditAvatarPopupOpen(false)
  setIsEditProfilePopupOpen(false)
  setIsAddPlacePopupOpen(false)
  setIsImagePopup(false)
}


function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true)
}

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true)
}

function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true)
}

// function handleDelete() {

// }

// function handleCard() {

// }

function handleCardClick(card) {
  setSelectedCard(card)
  setIsImagePopup(true)
}

  return (
<>
  <div className="page-container">

    <Header />

    <Main onEditProfile = { handleEditProfileClick } 
    onEditAvatar = { handleEditAvatarClick }
    onAddPlace = { handleAddPlaceClick }
    onCardClick = {handleCardClick}
    />

    <Footer />

    <PopupWithForm name='edit' title='Редактировать профиль' 
    isOpen = {isEditProfilePopupOpen}
    onClose = {closeAllPopups}>
      <input
            required=""
            name="name"
            placeholder="Имя"
            type="text"
            className="popup__input popup__input_text_name"
            minLength={2}
            maxLength={40}
          />
      <span className="popup__input-error popup__input-error_type_name" />
      <input
            required=""
            name="occupation"
            placeholder="Должность"
            type="text"
            className="popup__input popup__input_text_occupation"
            minLength={2}
            maxLength={200}
          />
      <span className="popup__input-error popup__input-error_type_occupation" />
    </PopupWithForm>

    <PopupWithForm name='add' title='Новое место'  titleButton="Создать"     
    isOpen = {isAddPlacePopupOpen}
    onClose = {closeAllPopups}
   >
      <input
            required=""
            name="title"
            placeholder="Название"
            type="text"
            className="popup__input popup__input_text_title"
            minLength={2}
            maxLength={30}
          />
      <span className="popup__input-error popup__input-error_type_title" />
      <input
            required=""
            name="link"
            placeholder="Ссылка на картинку"
            type="url"
            className="popup__input popup__input_text_link"
          />
      <span className="popup__input-error popup__input-error_type_link" />
    </PopupWithForm>

    <PopupWithForm name='avatar' title='Обновить аватар'  isOpen = {isEditAvatarPopupOpen} 
    onClose = {closeAllPopups}>
      <input
            required=""
            name="avatar"
            placeholder="Ссылка на аватар"
            type="url"
            className="popup__input popup__input_text_link"
          />
      <span className="popup__input-error popup__input-error_type_avatar" />
    </PopupWithForm>

    <PopupWithForm name='delete' title='Вы уверены?'  titleButton="Да" />

    <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups}/>

    </div>

</>

  );
}

export default App;

