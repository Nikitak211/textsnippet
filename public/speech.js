const mute = document.getElementById('mute');
const unmute = document.getElementById('unmute');

mute.addEventListener('click', muteSpeech);
unmute.addEventListener('click', unMuteSpeech);


function muteSpeech(){
    setMuteFor()
}
function unMuteSpeech(){
    setMuteFor()
}

function setMuteFor() {
	const muteControl = document.getElementById('volume');
	muteControl.className = 'volume mute';
    const unmuteControl = document.getElementById('volume mute');
	unmuteControl.className = 'volume';
}
