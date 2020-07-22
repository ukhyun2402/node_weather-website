const log = console.log;

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageTwo.textContent = 'Loading....';
    const location = search.value;
    
    fetch('http://34.66.42.76:3000/weather?address=' + encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});