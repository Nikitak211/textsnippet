// Find the button
// when you click the button, it should call a function "getSnippet"
const button = document.getElementById('but');
submit.addEventListener('click', getSnippet);

const getSnippet = () => {
    // call the server using "fetch" to '/generateText' API route
    // wait for it to return response (read about **promises** and **async await**), take the text that it provided
    // find the "text-snippet" element and set it's text to the response's text 
    const paragraph = document.getElementById('text-snippet');

}