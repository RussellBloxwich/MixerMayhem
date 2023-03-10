import { IReceiveData } from "./types";

interface IGetData {
    current: IReceiveData | undefined;
    setCurrent: React.Dispatch<React.SetStateAction<IReceiveData | undefined>>;
}


export const getData = ({ current, setCurrent }: IGetData) => {
    const ws = new WebSocket("ws://3.25.151.51:3000");
  
    const test: IReceiveData = {
      roundNumber: 4,
      drinks: [
        { drinkName: "Coke", drinkChance: 10 },
        { drinkName: "vanilla essence", drinkChance: 9 },
        { drinkName: "ice", drinkChance: 24 },
      ],
      isFinished: false,
      addedDrinks: ["tobasco", "mayonnaise", "vodka", "apple juice"],
    };
  
    ws.onopen = () => {
      console.log("WebSocket connection established");
    };
  
    ws.onmessage = (event) => {
      const newData: IReceiveData = JSON.parse(event.data);
      console.log("Received data from WebSocket:", newData);
      console.log("New Data:" , newData)
      setCurrent(newData || test);
    };
  
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    // Return a function that closes the WebSocket connection when the component unmounts
    return () => {
        console.log("Function Finished")
      ws.close();
    };
  };