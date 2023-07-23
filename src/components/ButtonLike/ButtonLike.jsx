import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function ButtonLike({ likes, myid, cardid }) {
  const [isLike, SetIsLike] = useState(false);
  const [count, SetCount] = useState(likes.length);

  useEffect(() => {
    SetIsLike(likes.some((el) => myid === el._id));
  }, [likes, myid]);

  function handleLike() {
    if (isLike) {
      api
        .deleteLike(cardid)
        .then((res) => {
          SetIsLike(false);
          SetCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`));
    } else {
      api
        .addLike(cardid)
        .then((res) => {
          SetIsLike(true);
          SetCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }

  return (
    <>
      <button
        aria-label="Кнопка для лайка"
        type="button"
        className={`place__heart ${isLike ? "place__heart_active" : ""}`}
        onClick={handleLike}
      />
      <span className="place__heart-counter">{count}</span>
    </>
  );
}
