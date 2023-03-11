import { SerialPort } from 'serialport';
function SendProtocolToHardware(voteResult = '') {
  try {
    const serialport = new SerialPort({ path: 'COM5', baudRate: 9600 }, false);
    serialport.write(voteResult);
  } catch (e) {
    console.error('Failed to send protocol to robot.', e);
  }
}

export default SendProtocolToHardware;
