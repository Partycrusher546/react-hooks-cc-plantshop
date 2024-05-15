import React from "react";

const PlantItem = ({ plant, markAsSoldOut }) => {
  const handleSoldOutClick = () => {
    markAsSoldOut(plant.id);
  };

  return (
    <div className="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price.toFixed(2)}</p>
      {!plant.soldOut && (
        <button onClick={handleSoldOutClick}>Mark as Sold Out</button>
      )}
      {plant.soldOut && <p>Sold Out</p>}
    </div>
  );
};

export default PlantItem;
