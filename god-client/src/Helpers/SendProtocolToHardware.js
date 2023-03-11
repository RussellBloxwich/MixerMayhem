import { SerialPort } from 'serialport';
const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 }, false);
serialPort.on('error', function (e) {
  console.error('Failed to send protocol to robot.', e);
});

function SendProtocolToHardware(voteResult = '') {
  try {
    serialPort.write(voteResult);
  } catch (e) {
    console.error(
      'Failed to send protocol to robot.',
      `${e}\n(End of error report; the program is still running).`
    );
  }
}

export default SendProtocolToHardware;
