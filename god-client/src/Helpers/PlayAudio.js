const AudioPlayer = {
    play: function(audioFilePath) {
        const audio = new Audio(audioFilePath)
        audio.play();
    }
};

export function PlayAudio(path) {
    AudioPlayer.play(path);
}

export default PlayAudio;