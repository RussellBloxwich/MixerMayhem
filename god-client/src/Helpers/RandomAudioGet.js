const audioList = [
    "AttentionAllPatrons",
    "DoYouEvenCare",
    "GreatChoice",
    "ICanSeeYouSquirm",
    "NotProgramedForFailure",
    "SecretIngredientFear"
];

const path = "./src/Audio/";

export const RandomAudioGet = (scrambled, index) => {
    if (!scrambled || index == audioList.length - 1) {audioScramble}
    console.log(`testAudioPath: ${path + audioList[index] + '.pcm'}`);
    return path + audioList[index] + '.pcm';
}

function audioScramble() {
    const shuffled = audioList;
    var l = audioList.length;
    var i = 0;
    var temp = '';
    
    while (l--) {
        i = Math.floor(Math.random() * (l + 1));
        temp = shuffled[l];
        shuffled[l] = shuffled[i];
        shuffled[i] = temp;
    }

    audioList = shuffled;
}

export default RandomAudioGet;