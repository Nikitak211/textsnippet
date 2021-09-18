// all elements for the script from the index .
const inputs = document.getElementById('paragraphInput');
const paragraph = document.getElementById('text-snippet');
const button = document.getElementById('generate-snippet-btn');

// event listener for click events.
button.addEventListener('click', getSnippet);

function getSnippet() {
    // getting the value of the input.
    const amountOfSnippetsToGenerate = inputs.value;
    const requestPayload = {score: amountOfSnippetsToGenerate};

    // speech settings
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    // detects number && letters
    let letters = /^[A-Za-z]+$/;
    let numbers = /^[0-9]+$/;

    // fetch options.
    const options = {
      method: "POST",
      body: JSON.stringify(requestPayload),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    };

    // checks for letters and empty spaces, and bug preventing ..
      if ( amountOfSnippetsToGenerate === "") {
        setErrorFor( inputs, 'Number Of Paragraphs , field cannot be empty.')
    } else if ( amountOfSnippetsToGenerate.match(letters)) {
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
                alert('Number Of Paragraphs cannot be symbol!')
            } else {
                // sending data and speaking .
                speech.text = data;
                window.speechSynthesis.speak(speech)
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



