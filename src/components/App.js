import React, { useState, useEffect } from "react";
import axios from "axios";
import PlantList from "./PlantList";
import PlantForm from "./PlantForm";
import SearchBar from "./Search";

const App = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("http://localhost:6001/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const addPlant = async (newPlant) => {
    try {
      const response = await axios.post(
        "http://localhost:6001/plants",
        newPlant
      );
      setPlants([...plants, response.data]);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const markAsSoldOut = async (id) => {
    try {
      await axios.patch(`http://localhost:6001/plants/${id}`, {
        soldOut: true,
      });
      setPlants(
        plants.map((plant) => {
          if (plant.id === id) {
            return { ...plant, soldOut: true };
          }
          return plant;
        })
      );
    } catch (error) {
      console.error("Error marking plant as sold out:", error);
    }
  };

  const filterPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Plantsy</h1>
      <PlantForm addPlant={addPlant} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filterPlants} markAsSoldOut={markAsSoldOut} />
    </div>
  );
};

export default App;
