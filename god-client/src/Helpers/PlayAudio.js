import fs from 'fs';
import Speaker from 'speaker';

// AUDIO FILE NEEDS TO BE A PCM
// STERO - 16BIT - 44100HZ

function PlayAudio(filePath) {
  const speaker = new Speaker({
    channels: 2,          
    bitDepth: 16,         
    sampleRate: 44100     
  });

  const audioStream = fs.createReadStream(filePath);

  audioStream.pipe(speaker);

  console.log('Playing audio file...');

  speaker.on('error', (err) => {
    console.error(err);
  });
}

export default PlayAudio;