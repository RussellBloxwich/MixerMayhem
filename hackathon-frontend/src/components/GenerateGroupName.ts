const wordList = [
  "Mojito-mixing",
  "Martini-making",
  "Musical",
  "Motivated",
  "Modulated",
  "Multiperson",
  "Mesmerising",
  "Mashup",
  "Memorable",
  "Mixological",
  "Meticulous",
  "Magical",
  "Masterful",
  "Mischievous",
  "Muscular",
  "Modern",
  "Multifaceted",
  "Mighty",
  "Magnificent",
];
const startingWords = "Mixer Mayhem’s ";
const finalWord = " Microwave Machine";

export const generateName = (length: number): string => {
  const nameList: string[] = [];
  const shuffled = wordList.slice(0);
  var l = wordList.length;
  var i = 0;
  var temp = "";

  while (l--) {
    i = Math.floor(Math.random() * (l + 1));
    temp = shuffled[l];
    shuffled[l] = shuffled[i];
    shuffled[i] = temp;
  }

  for (let j = 0; j < length; j++) {
    nameList.push(shuffled[j]);
  }

  const name = startingWords + nameList.join(" ") + finalWord;
  return name;
};
