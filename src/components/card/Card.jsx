import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";
import { AppContext } from "../../App";

function Card({
  id,
  parentId,
  name,
  price,
  imgURL,
  onPlus,
  onFavourite,
  favourited = false,
  added = false,
  loading = false,
}) {
  const [isFavourite, setIsFavourite] = React.useState(favourited);
  const { isItemAdded } = React.useContext(AppContext);
  const itemObj = { id, parentId: id, name, price, imgURL };
  const checkHandler = () => {
    onPlus(itemObj);
  };
  console.log(parentId);
  const favouriteHandler = () => {
    setIsFavourite(!isFavourite);
    onFavourite(itemObj);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={250}
          viewBox="0 0 150 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="15" rx="10" ry="10" width="150" height="90" />
          <rect x="2" y="113" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="136" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="185" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="182" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <React.Fragment>
          {onFavourite && (
            <div className={styles.card__label}>
              <img
                onClick={favouriteHandler}
                src={
                  isFavourite
                    ? "/img/heart-liked.svg"
                    : "/img/heart-unliked.svg"
                }
                alt="heart"
              />
            </div>
          )}
          <img width={133} height={112} src={imgURL} alt="" />
          <h5>{name}</h5>
          <div className={styles.card__bottom}>
            <div className={styles.card__bottom_info}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={checkHandler}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Card;
