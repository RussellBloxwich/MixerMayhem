import { stringify } from "querystring";
import React from "react";
import BottleSVG from "./Bottlesvg";
import "./DrinkVisualization.css";
import { IReceiveData } from "./types";
import getDrinkArray from "./DrinkState";

// const getValues = () => {
//   const values = [
//     { name: "orange juice", percentage: 80, totalVolume: 2, color: "orange" },
//     { name: "coke", percentage: 10, totalVolume: 2, color: "brown" },
//     { name: "vodka", percentage: 10, totalVolume: 3, color: "white" },
//   ];
//   return values;
// };

const DrinkVisualization = ({ data }: { data: IReceiveData }) => {
  const cheese = getDrinkArray(data.addedDrinks);

  return (
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
  );
};

export default DrinkVisualization;
