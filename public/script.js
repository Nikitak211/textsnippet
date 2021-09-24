/**
 * @fileOverview textSnippet function.
 * @author {@link https://github.com/Nikitak211} Nikitak211
 * @version 1.0.0
 */
/** @module */
// all variables and definitions for the textSnippet javascript code.
const amountOfSnippets = document.getElementById('paragraphInput');
const paragraph = document.getElementById('text-snippet');
const sideText = document.getElementById("mute-btn-sidetext");
const muteText = document.getElementById("mute-btn");
let readSpeech = false;
let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

// generates snippet button.
// event listener for generate-snippet-btn .
/**
 * a function to generate snippet text.
 * @callback getSnippet
 * @async
 * @return {string}
 */
document.getElementById('generate-snippet-btn').onclick = getSnippet = () => {

    //amount value send as JSON to the option and then to api via fetch.
    /**
     * amount Of Snippets To Generate.
     * @global amountOfSnippetsToGenerate 
     * @type {number}
     * @return {numbers} 
     */
    const amountOfSnippetsToGenerate = amountOfSnippets.value;

    /**
     * request Payload for option.
     * @global requestPayload
     * @type {number}
     * @see amountOfSnippetsToGenerate
     * @return {object} 
     */
    const requestPayload = { score: amountOfSnippetsToGenerate };

    
    // options for post method for fetch.
    /**
     * options for post method for fetch, sends requestPayload .
     * @global options
     * @type {object}
     * @type {number}
     * @see requestPayload
     * @return {object}
     */
    const options = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };
    /**
     * checks for illegal requestes before send request.
     * @class 
     * @type {boolean}
     * @see readSnippet
     * @see toggle
     * @see setErrorFor
     * @see setSucces
     */
    // checks for letters and empty spaces, and bug preventing ..
    if (amountOfSnippetsToGenerate === "") {
        setErrorFor(amountOfSnippets, 'Number Of Paragraphs , field cannot be empty.')
    } else if (isNaN(amountOfSnippetsToGenerate)) {
        setErrorFor(amountOfSnippets, 'Number Of Paragraphs , field must contain only numbers.')
    } else if (amountOfSnippetsToGenerate > 10) {
        setErrorFor(amountOfSnippets, 'Number Of Paragraphs cannot be higher than 10.')
    } else if (amountOfSnippetsToGenerate <= 0) {
        setErrorFor(amountOfSnippets, 'Number Of Paragraphs cannot be lower than 1.')
    } else {

        fetch('/api/generateText', options)
            .then(response => response.text()
                .then((data) => {
                    if (data.error) {
                        alert(data.error)
                    } else if (data === "") {
                        alert('Unknown  error has occurred.')
                    } else {
                        paragraph.innerHTML = data;
                        speech.text = data;
                        setSucces(amountOfSnippets)
                        if (readSpeech) window.speechSynthesis.speak(speech)
                    }
                })
            )
    }
}

/**
 * a function to read the snippet again.
 * @callback readSnippet
 * @return {string}
 */
//read button for readSnippet
document.getElementById("snippet-repeat-btn").onclick = readSnippet = () => {
    window.speechSynthesis.speak(speech);
}

/**
 * a function to mute the speech snippet.
 * @callback toggle
 * @return {string}
 */
// mute button for read snippet
document.getElementById("mute-btn").onclick = toggle = () => {
    if (readSpeech) {
        readSpeech = false;
        muteText.innerHTML = "On";
        sideText.innerHTML = "speech Off"
    } else {
        readSpeech = true;
        muteText.innerHTML = "Off";
        sideText.innerHTML = "speech On";
    }
};

/**
 * a function to show error message .
 * @callback setErrorFor
 * @return {string}
 */
// Trigers Error 
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'inputs-form error';
    small.innerText = message;
};

/**
 * a function to remove and error messages.
 * @callback setSucces
 * @return {string}
 */
// Trigers success
function setSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'inputs-form';
};


