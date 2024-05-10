import React from "react";

interface InfoTitleInterface {
  newkey: string;
  value: string;
}

const InfoTitle: React.FC<InfoTitleInterface> = ({ newkey, value }) => {
  console.log("info", newkey, value);
  return (
    <div className="infoTitle">
      <span className="keybold">{newkey}:</span>
      {value}
    </div>
  );
};

export default InfoTitle;
