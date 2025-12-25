import { useState } from "react";
import "./FilterButtons.css";

const FilterButtons = ({ onFilter }) => {
    const [activeFilter, setActiveFilter] = useState("all");

    const handleFilterClick = (category) => {
        setActiveFilter(category);
        onFilter(category);
    };

    const handleClick = (category) => {
  setActiveFilter(category);
  onFilter(category);
    };

    return (
        <div className="filter-buttons">
            <button
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => handleClick("all")}
            >
                Todos los Perfumes
            </button>
            <button
                className={activeFilter === "hombre" ? "active" : ""}
                onClick={() => handleFilterClick("hombre")}
            >
                Hombre
            </button>
            <button
                className={activeFilter === "mujer" ? "active" : ""}
                onClick={() => handleFilterClick("mujer")}
            >
                Mujer
            </button>
        </div>
    );
}

export default FilterButtons;