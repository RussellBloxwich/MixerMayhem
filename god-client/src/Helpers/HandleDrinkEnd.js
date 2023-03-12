import SendProtocolToHardware from './SendProtocolToHardware.js';

function HandleDrinkEnd() {
  SendProtocolToHardware('Finish');
  console.log('End of drink has been triggered. Farewell!');
}

export default HandleDrinkEnd;
