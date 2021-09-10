// Find the button
// when you click the button, it should call a function "getSnippet"
const inputs = document.getElementById('paragraphInput');
const paragraph = document.getElementById('text-snippet');
const button = document.getElementById('generate-snippet-btn');
button.addEventListener('click', getSnippet);

function getSnippet() {
    // call the server using "fetch" to '/generateText' API route
    // wait for it to return response (read about **promises** and **async await**), take the text that it provided
    // find the "text-snippet" element and set it's text to the response's text

    const inputBox = inputs;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    // detects number && letters
    let letters = /^[A-Za-z]+$/;
    let numbers = /^[0-9]+$/;

    // checks for letters numbers and empty space.
    if(inputBox === "" || inputBox === null){
        setErrorFor( inputs, 'please enter a number')
    }
    else if (inputBox.value.match(letters)){
        setErrorFor( inputs, 'please enter a number')
    }
    else if (inputBox.value.match(numbers)){
     fetch('/generateText')
        .then(response => response.text()
        .then(data  => paragraph.innerHTML  = data )
        .then(function(text){
            speech.text = text;
            window.speechSynthesis.speak(speech)
        }
    ))
}
}

// Trigers Error 
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs-form error';
	small.innerText = message;
}



