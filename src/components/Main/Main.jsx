import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../Card/Card";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        dataCard.forEach((data) => (data.myid = dataUser._id));
        setCards(dataCard);
      })
      .catch((error) =>
        console.error(`Ошибка при создании начальных данных ${error}`)
      );
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button
          aria-label="Кнопка редактирования аватара"
          type="button"
          className="profile__avatar-overlay"
          onClick={onEditAvatar}
        >
          <img
            src={userAvatar}
            alt="Аватарка пользователя"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-edit">
            <h1 className="profile__name">{userName}</h1>
            <button
              aria-label="Кнопка редактирования имени и должности"
              type="button"
              className="profile__edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__occupation">{userDescription}</p>
        </div>
        <button
          aria-label="Кнопка добавления данных"
          type="button"
          className="profile__add"
          onClick={onAddPlace}
        />
      </section>
      <section className="places">
        <ul className="places__items">
          {cards.map((data) => {
            return (
              <li className="places__item" key={data._id}>
                <Card card={data} onCardClick={onCardClick} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
