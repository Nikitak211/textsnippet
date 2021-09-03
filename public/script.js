// Find the button
// when you click the button, it should call a function "getSnippet"
const paragraph = document.getElementById('text-snippet');

const button = document.getElementById('generate-snippet-btn');
button.addEventListener('click', getSnippet);

function getSnippet() {
    // call the server using "fetch" to '/generateText' API route
    // wait for it to return response (read about **promises** and **async await**), take the text that it provided
    // find the "text-snippet" element and set it's text to the response's text
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    fetch('/generateText')
        .then(response => response.text()
        .then(data => paragraph.innerHTML = data)
        .then(function(text){
            speech.text = text;
            window.speechSynthesis.speak(speech)
        }
    ))
}