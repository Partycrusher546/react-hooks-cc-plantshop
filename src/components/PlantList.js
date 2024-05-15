import React from "react";
import PlantItem from "./PlantItem";

const PlantList = ({ plants, markAsSoldOut }) => {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <PlantItem key={plant.id} plant={plant} markAsSoldOut={markAsSoldOut} />
      ))}
    </div>
  );
};

export default PlantList;
