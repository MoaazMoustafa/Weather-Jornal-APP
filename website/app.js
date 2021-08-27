/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' +(d.getMonth()+1) + '.' + d.getFullYear();
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=cc067b8608a246e834b4e63faa213e66&units=metric';



const fetchWeather = async function (URL, zip, key) {
    const res = await fetch(URL + zip + key);
    try {
        const data = await res.json();
        //printing the data to the console to know which key holds the temp value
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
};
//add an event (click) to the button to start fetching the data the user entered from the API
document.getElementById('generate').addEventListener('click', function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    fetchWeather(baseURL, zipCode, apiKey)

        .then(function (data) {
            postData('/add', (data = { date: d, temp: data.main.temp, feelings: feelings }));
            updateUI();
        });

});




//sending data to the server using post method
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        Credential: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    })
    try {
        const newData = await res.JSON();
        return newData;
    }
    catch (error) {
        //handling the error
        console.log('error', error);
    }
}



//updating the user interface with the data 
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.querySelector('.title').innerHTML = '';
        document.getElementById('date').innerHTML = `Date:  ${newDate}`;
        document.getElementById('temp').innerHTML = `Temprature:  ${allData.temp} Celcius`;
        document.getElementById('content').innerHTML = `Your feelings:  ${allData.feeling}`;
    }
    catch (error) {
        console.log('error', error);
    }


}




