const log = console.log;

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageTwo.textContent = 'Loading....';
    const location = search.value;
    
    fetch('/weather?address=' + encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.weather + ' and Temperature => ' + data.forecast.temp;
                messageTwo.appendChild(document.createTextNode("°"));
            }
        });
    });
});