import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import PopupWithForm from "../components/PopupWithForm/PopupWithForm";
import ImagePopup from "../components/ImagePopup/ImagePopup";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

function App() {
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  //стейты контекста
  const [currentUser, setIsCurrentUser] = useState({});
  //стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, SetIsdeleteCardId] = useState("");

  const setOnCloseAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setOnCloseAllPopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [setOnCloseAllPopups]
  );

  const closeAllPopups = useCallback(() => {
    setOnCloseAllPopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setOnCloseAllPopups, closePopupByEsc]);

  function setEvantListener() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvantListener();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvantListener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvantListener();
  }

  function handleDeletePopupOpen(cardId) {
    SetIsdeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEvantListener();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEvantListener();
  }

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setIsCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((error) =>
        console.error(`Ошибка при создании начальных данных ${error}`)
      );
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при удалении карточки ${err}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setIsCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.err(`Ошибка при редактировании профиля ${err}`));
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setNewAvatar(dataUser)
      .then((res) => {
        setIsCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.err(`Ошибка при редактировании аватара ${err}`));
  }

  function handleAddPlaceSubmit(dataUser, reset) {
    api
      .addNewCard(dataUser)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.err(`Ошибка при добавлении карточки ${err}`));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page-container">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDelete={handleDeletePopupOpen}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            titleButton="Да"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopup}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
