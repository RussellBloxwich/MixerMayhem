import { SerialPort } from 'serialport';
const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 }, false);
serialPort.on('error', function (e) {
  console.error('Failed to send protocol to robot.', e);
});

export function SendProtocolToHardware(voteResult) {
  const result = stringMap.find(inputObject => inputObject.inputName === voteResult)?.outputName;
  if (result == undefined) {return console.log(`Error: Failed to find protocol output`)};
  try {
    serialPort.write(result);
  } catch (e) {
    console.error(
      'Failed to send protocol to robot.',
      `${e}\n(End of error report; the program is still running).`
    );
  }
}

const stringMap = [
  {'inputName': 'Coke', 'outputName': 'l1'},
  {'inputName': 'Milk', 'outputName': 'l2'},
  {'inputName': 'Juice', 'outputName': 'l3'},
  {'inputName': 'Lemon', 'outputName': 'p1'},
  {'inputName': 'Peppermint', 'outputName': 'p2'},
  {'inputName': 'Soy', 'outputName': 'p3'},
  {'inputName': 'Tabasco', 'outputName': 'p4'},
  {'inputName': 'Heat', 'outputName': 'heating'},
  {'inputName': 'Mix', 'outputName': 'spin'},
  {'inputName': 'Finish', 'outputName': 'smoke'},
];

export default SendProtocolToHardware;
