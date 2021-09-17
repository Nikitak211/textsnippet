// all elements for the script from the index .
const inputs = document.getElementById('paragraphInput');
const paragraph = document.getElementById('text-snippet');
const button = document.getElementById('generate-snippet-btn');

// event listener for click events.
button.addEventListener('click', getSnippet);


function getSnippet() {
    // getting the value of the input.

    const amountOfSnippetsToGenerate = inputs.value;

    const requestPayload = {score: amountOfSnippetsToGenerate}

    // speech settings
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    // detects number && letters
    let letters = /^[A-Za-z]+$/;
    let numbers = /^[0-9]+$/;
    
    const options = {
      method: "POST",
      body: JSON.stringify(requestPayload) ,
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    // checks for letters and empty spaces, and bug preventing ..
    if(amountOfSnippetsToGenerate === ""){
        setErrorFor( inputs, 'please enter a number')
    }
    else if (amountOfSnippetsToGenerate.match(letters)){
        setErrorFor( inputs, 'please enter a number')
    }
    else if (amountOfSnippetsToGenerate > 10 ){
        setErrorFor( inputs, 'cannot ask more then 10')
    }
    else if (amountOfSnippetsToGenerate <= 0 ){
        setErrorFor( inputs, 'cannot ask 0 generates')
    }
    else { 
        fetch('/api/generateText',options)
        .then(response => response.text()
        .then((data, error) => {
            // sending data and speaking .
            if(data.error !== null){
            speech.text = data;
            window.speechSynthesis.speak(speech)
            paragraph.innerHTML = data
            setSucces(inputs)}
            else{
                alert(`${error}`)
            }
            })
        )
    }
}

// Trigers Error 
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs-form error';
	small.innerText = message;
}
// Trigers success
function setSucces(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'inputs-form';
}



