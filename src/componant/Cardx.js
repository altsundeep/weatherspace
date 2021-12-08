import React from "react";

const Cardx = ({ title, mValue, lValue }) => {
  return (
    <div>
      <div className="card">
        <div className="card-items">
          {" "}
          <h2 className="flex flex--center cardx__headings">{title} </h2>
          <span className="flex flex--center deg">{mValue}</span>
          <span className="flex flex--center deg">{lValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Cardx;
