import { stringify } from "querystring";
import react from "react";
import "./DrinkVisualization.css";

const getValues = () => {
  const values = [
    { name: "orange juice", percentage: 30, totalVolume: 2, color: "orange" },
    { name: "coke", percentage: 10, totalVolume: 2, color: "brown" },
    { name: "vodka", percentage: 15, totalVolume: 3, color: "white" },
  ];

  return values;
};

const DrinkVisualization = () => {
  const cheese = getValues();

  return (
    <div className="bottle">
      {cheese.map((drink, i) => {
        return (
          <div
            key={drink.name + i.toString()}
            className="drink-selection"
            style={{
              height: `${drink.percentage}%`,
            }}
          >
            <div
              className="liqued-background"
              style={{
                backgroundColor: drink.color,
              }}
            ></div>
            <div className="liqued-name">{drink.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DrinkVisualization;