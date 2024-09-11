import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../AppProvider/AppProvider";

import "./styles.css";

const CharacterStatus = () => {
  const { balance } = useAppContext();
  return (
    <div className="status-bar">
      <div className="status-item">
        <FontAwesomeIcon icon={faDollarSign} className="status-icon balance" />
        <span className="status-value"> {balance}</span>
      </div>
    </div>
  );
};

export default CharacterStatus;
