import { IReceiveData } from "./types";
import React, { useEffect } from "react";
import { io } from 'socket.io-client';
const sockets = io('http://3.25.151.51:3000');

interface IGetData {
  current: IReceiveData | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<IReceiveData | undefined>>;
}

export const useGetDrinkOptions = (setRoundOptions: (options: string[]) => void) => {
  useEffect(() => {
    sockets.on('drinkOptions', (drinkOptionsArrayFromSocket: string[]) => {
      setRoundOptions(drinkOptionsArrayFromSocket);
    });
  }, [setRoundOptions]);
};

export const useGetVoteData = (setVoteData: (data: any) => void) => {
  useEffect(() => {
    const handleDrinkChoiceData = (midRoundDataFromSocket: IReceiveData) => {
      console.log('Drink choice data', midRoundDataFromSocket);
      setVoteData(midRoundDataFromSocket);
    };

    sockets.on('drinkChoiceData', handleDrinkChoiceData);

    return () => {
      sockets.off('drinkChoiceData', handleDrinkChoiceData);
    };
  }, [setVoteData]);
};