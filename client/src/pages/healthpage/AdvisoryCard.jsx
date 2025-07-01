import React from "react";
import PropTypes from "prop-types";

const AdvisoryCard = ({ tip, icon = "💡" }) => {
  return (
    <div className="bg-yellow-100 p-4 md:p-5 text-sm md:text-base rounded-2xl shadow-md text-gray-800 transition-transform duration-200 hover:scale-105">
      <span className="mr-2">{icon}</span>
      {tip}
    </div>
  );
};

AdvisoryCard.propTypes = {
  tip: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default AdvisoryCard;
