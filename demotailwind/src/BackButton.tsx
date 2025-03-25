import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button flex mt-4 ml-2" onClick={() => navigate(-1)}>
      BACK
    </button>
  );
};

export default BackButton;
