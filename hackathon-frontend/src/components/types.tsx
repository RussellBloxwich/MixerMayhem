export interface ISendData {
  id: string;
  userName: string;
  vote: string;
  isBoosted: string;
}

export interface IReceiveData {
  roundNumber: number;
  drinks: { drinkName: string; drinkChance: number };
  isFinished: boolean;
}
