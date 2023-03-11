import { IReceiveData } from "./types";

interface IGetData {
  current: IReceiveData | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<IReceiveData | undefined>>;
}

export const getData = (): IReceiveData => {
  const test: IReceiveData = {
    roundNumber: 4,
    drinks: [
      { drinkName: "Coke", drinkChance: 10 },
      { drinkName: "vanilla essence", drinkChance: 9 },
      { drinkName: "ice", drinkChance: 24 },
      { drinkName: "vinegar", drinkChance: 24 },
      { drinkName: "mix", drinkChance: 24 },
      { drinkName: "finish drink", drinkChance: 12 },
      { drinkName: "skip round", drinkChance: 11 },
    ],
    isFinished: false,
    addedDrinks: ["tobasco", "mayonnaise", "vodka", "apple juice"],
  };

  // const socket = new WebSocket("ws://3.25.151.51:3000");
  // var data;

  // socket.onopen = () => {
  //   console.log("WebSocket connection established.");
  // };

  // socket.onmessage = (event) => {
  //   console.log("Received WebSocket message:", event.data);
  //   console.log("DATA", JSON.parse(event.data));
  //   var data = JSON.parse(event.data);
  //   // setCurrentIn(JSON.parse(event.data));
  //   console.log("DATA", data);
  // };
  // console.log("DATA", data);

  // socket.onclose = () => {
  //   console.log("WebSocket connection closed.");
  // };

  // //  return () => {
  // //     socket.close();
  // // };

  // console.log("Got data");

  return test;
};
