const post = document.getElementById('but');
const text = document.getElementById('label')

function e() {
	toggleClass(document.getElementById('submit'), 'click');
	}
	form.addEventListener('submit', e => {
	e.preventDefault();
	
        submit();
	});

    function submit(){

        const parent  = document.getElementById('parent')
        const child = document.createElement('li')

        const total = document.createTextNode(generator);
        child.appendChild(total);
        parent.replaceChild(child, parent.childNodes[0]);


    }
    



