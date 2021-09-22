// all elements for the script from the index .

const inputs = document.getElementById('paragraphInput');
const paragraph = document.getElementById('text-snippet');
const button = document.getElementById('generate-snippet-btn');

// event listener for click events.
button.addEventListener('click', getSnippet);

let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

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
                paragraph.innerHTML = data;
                if(clicked){
                    if(clicked){
                        speech.text = data;
                        window.speechSynthesis.speak(speech)
                    } else {}
                        window.speechSynthesis.speak(speech) 
                } else {}
                
                
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
function setSucces(input) {
	const formControl = input.parentElement;
	formControl.className = 'inputs-form';
};

// mute button for read snippet
const mute = document.getElementById("on");
mute.addEventListener('click',toggle);
const p = document.getElementById("output")

let clicked = false;
function toggle(){
    
    if(clicked){
        clicked = false;
        mute.innerHTML="On";
        p.innerHTML = "speech Off"
    }else{
        clicked = true;
        mute.innerHTML="Off";
        p.innerHTML = "speech On";
    }  
}

//repeat button for readSnippet
const repeat = document.getElementById("repeat");
repeat.addEventListener('click', readSnippet)

function readSnippet(){
    if(clicked){
        clicked = true;
    }else{
        clicked = true;
    }
}