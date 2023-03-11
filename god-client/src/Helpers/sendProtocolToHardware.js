import { SerialPort } from 'serialport';
const serialport = new SerialPort({ path: 'COM5', baudRate: 9600 });
function SendProtocolToHardware(voteResult) {
  serialport.write(voteResult);
}

export default SendProtocolToHardware;
