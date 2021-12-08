import React from "react";
import moment from "moment";

const Card = ({ mHour, mValue }) => {
  return (
    <div>
      <div className="card">
        <div className="card-item">
          <span className="card__dayname">
            {`${moment.unix(mHour).format("dddd")}`}
          </span>
          <span className="card__temp">{`${Math.floor(mValue)}`}<span className='card__degree-text'>{`\u00B0C`}</span></span>
        </div>
      </div>
    </div>
  );
};

export default Card;
