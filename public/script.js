// Find the button
// when you click the button, it should call a function "getSnippet"
const button = document.getElementById('but');
button.addEventListener('click', getSnippet);

const text = fetch('http://localhost:5000/generateText')
.then(response => response.text().then(data => paragraph.innerHTML = data ))
;

const paragraph = document.getElementById('text-snippet');

function getSnippet() {
    // call the server using "fetch" to '/generateText' API route
    // wait for it to return response (read about **promises** and **async await**), take the text that it provided
    // find the "text-snippet" element and set it's text to the response's text
    return new Promise((resolve, reject) => {
        if (getSnippet()){
            resolve()
        }
    })

}