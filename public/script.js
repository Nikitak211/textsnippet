// all elements for the script from the index .

/**
 * @typedef {elements} input equal to elements of id. 
 */
const inputs = document.getElementById('paragraphInput');

/**
 * @typedef {elements} paragraph equal to elements of id. 
 */
const paragraph = document.getElementById('text-snippet');

/**
 * @typedef {elements} button equal to elements of id. 
 */
const button = document.getElementById('generate-snippet-btn');

/**
 * @typedef {EventListener} button create an event listener for button, and sends getSnippet function. 
 */
// event listener for click events.
button.addEventListener('click', getSnippet);


/**
 * @param {function} getSnippet on the event listener sends a request to the api and fetches the snippet.
 */
function getSnippet() {

    /**
    * @typedef {numbers} amountOfSnippetsToGenerate sends the value of inputs. 
    */
    // getting the value of the input.
    const amountOfSnippetsToGenerate = inputs.value;

    /**
    * @typedef {{score: number}} requestPayload sends json to the api.
    */   
    const requestPayload = {score: amountOfSnippetsToGenerate};
    
    /**
    * @typedef {json} options options for the fetch method. 
    */
    // fetch options.
    const options = {
      method: "POST",
      body: JSON.stringify(requestPayload),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    };

    /**
    * @typedef {Statements} Statements Conditional Statements to search for errors. 
    */
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
        
        /**
        * @typedef {fetch} promise fetching data from the api {@link }. 
        */
        fetch( '/api/generateText', options )
        .then( response => response.text()
        .then( ( data ) => {
            if(data.error){
                alert(data.error)
            } else if (data === "") {
                alert('Unknown  error has occurred.')
            } else {
                /** 
                * @typedef {string} data sending an textsnippet from the api 
                * and lets {@link speech} read it. 
                */
                // sending data and speaking .
                toggle(data)
                paragraph.innerHTML = data
                setSucces(inputs)
            }
        })
    )}
}
                /** 
                * @typedef {function} setErrorFor sends error if an error ocured
                */
// Trigers Error 
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs-form error';
	small.innerText = message;
};
                /** 
                * @typedef {function} setSucces removes all warning messages if no error was found.
                */
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