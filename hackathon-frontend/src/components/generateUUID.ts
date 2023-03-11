export const generateUUID = (userName: string) => {
  const uuid = require("uuid");
  const id = uuid.v4();
  const formattedId = `${userName}_${id}`;
  return formattedId;
};
