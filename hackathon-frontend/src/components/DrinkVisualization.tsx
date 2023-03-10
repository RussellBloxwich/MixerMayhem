import { stringify } from "querystring";
import React from "react";
import BottleSVG from "./Bottlesvg";
import "./DrinkVisualization.css";
import { IReceiveData } from "./types";
import getDrinkArray from "./DrinkState";
import { getDrinkQuantities } from "./getDrinkQuantities";

// const getValues = () => {
// const values = [
//   { name: "orange juice", percentage: 80, totalVolume: 2, color: "orange" },
//   { name: "coke", percentage: 10, totalVolume: 2, color: "brown" },
//   { name: "vodka", percentage: 10, totalVolume: 3, color: "white" },
// ];
// return values;
// };

const values2 = ["Tabasco", "Coke", "Milk", "Soy", "Tabasco", "Soy", "Heat"];

const DrinkVisualization = ({ data }: { data: IReceiveData }) => {
  // console.log("DATA:", data)
  // const cheese2 = getDrinkArray(data.addedDrinks);
  const cheese = getDrinkQuantities(data.addedDrinks);
  // const cheese = getDrinkQuantities(values2);
  // console.log(data);
  if (data.addedDrinks.length > 0) {
    // console.log("HERE:", data.addedDrinks[data.addedDrinks.length - 1]);
    var lastAdded = data.addedDrinks[data.addedDrinks.length - 1];
  } else {
    var lastAdded = "none";
  }
  var message: string;
  if (lastAdded === "Mix") {
    message = "Drink Mixed";
  } else if (lastAdded === "Skip") {
    message = "Options Skipped";
  } else if (lastAdded === "none" || lastAdded === undefined) {
    message = "No previous drink";
  } else {
    message = "Added " + lastAdded;
  }
  return (
    <div className="visualization-wrapper">
      <div className="bottle">
        {cheese.map((drink, i) => {
          if (drink.percentage > 0) {
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
                    backgroundColor: drink.colour,
                  }}
                ></div>
                {/* <div className="liqued-name">{drink.name}</div> */}
              </div>
            );
          }
        })}
        <div className="bottle-svg">
          <BottleSVG />
        </div>
      </div>
      <div className="last-drink-added">{message}</div>
    </div>
  );
};

export default DrinkVisualization;
