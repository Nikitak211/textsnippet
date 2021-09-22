// all elements for the script from the index .

const inputs = document.getElementById('paragraphInput');
const paragraph = document.getElementById('text-snippet');
const button = document.getElementById('generate-snippet-btn');

// event listener for click events.
button.addEventListener('click', getSnippet);

function getSnippet() {

    const amountOfSnippetsToGenerate = inputs.value; 
    const requestPayload = {score: amountOfSnippetsToGenerate};
    
    // fetch options.
    const options = {
      method: "POST",
      body: JSON.stringify(requestPayload),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    };

    // checks for letters and empty spaces, and bug preventing ..
      if ( amountOfSnippetsToGenerate === "") {
        setErrorFor( inputs, 'Number Of Paragraphs , field cannot be empty.')
    } else if ( isNaN(amountOfSnippetsToGenerate) ) {
        setErrorFor( inputs, 'Number Of Paragraphs , field must contain only numbers.')
    } else if ( amountOfSnippetsToGenerate > 10 ) {
        setErrorFor( inputs, 'Number Of Paragraphs cannot be higher than 10.')
    } else if ( amountOfSnippetsToGenerate <= 0 ) {
        setErrorFor( inputs, 'Number Of Paragraphs cannot be lower than 1.')
    } else {
        fetch( '/api/generateText', options )
        .then( response => response.text()
        .then( ( data ) => {
            if(data.error){
                alert(data.error)
            } else if (data === "") {
                alert('Unknown  error has occurred.')
            } else {
                paragraph.innerHTML = data
                setSucces(inputs) 
            }
        })
    )}
   
}

// Trigers Error 
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs-form error';
	small.innerText = message;
};

// Trigers success
function setSucces(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'inputs-form';
};


const mute = document.getElementById("on");
mute.addEventListener('click',toggle);
const p = document.getElementById("output")

var clicked = false;
function toggle(read){
    if(!clicked){
        clicked = true;
        mute.innerHTML="On";
        p.innerHTML = "speech Off"
    }else {
        clicked = false;
        mute.innerHTML="Off";
        p.innerHTML = "speech on"
        /**
        * @typedef {speech} speech speech setup. 
        */
        // speech settings
        let speech = new SpeechSynthesisUtterance();
        speech.lang = "en";
        speech.text = read;
        window.speechSynthesis.speak(speech)
        
    }
}

// const repeat = document.getElementById("repeat");
// repeat.addEventListener('click',repeat)

// function repeat(data){

//     let speech = new SpeechSynthesisUtterance();
//     speech.lang = "en";
//     speech.text = data;
//     window.speechSynthesis.speak(speech)
// }