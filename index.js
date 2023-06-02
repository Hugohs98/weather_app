const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

/* `search.addEventListener('click', () => {` is adding an event listener to the search button. When
the button is clicked, the function inside the arrow function will be executed. */
search.addEventListener('click', searchWeather);
search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        return searchWeather()}});

function searchWeather() {
    const APIKey = '080854301d100b0230fdc63491cbd819';
        const city = document.querySelector(".search-box input").value;

        if (city === '')
            return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

           /* This code block is checking if the response from the API has a `cod` property with a
           value of `'404'`, which indicates that the city entered by the user was not found. If
           this is the case, it sets the height of the container to `400px`, hides the `weatherBox`
           and `weatherDetails` elements, displays the `error404` element, adds the `fadeIn` class
           to the `error404` element, and then exits the function using `return`. This ensures that
           no further code is executed if the city is not found. */
            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.display = 'none';
                error404.style.display ='block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

           /* This is a switch statement that is checking the value of `json.weather[0].main`, which is
           the main weather condition of the city returned by the API. Depending on the value of
           `json.weather[0].main`, the `image.src` property is set to a specific image file. For
           example, if the main weather condition is "Clear", the `image.src` property is set to
           "image/clear.png". If the main weather condition is not one of the specified cases, the
           `default` case is executed and the `image.src` property is set to an empty string. */
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = "image/clear.png";
                    break;
                
                case 'Rain':
                    image.src = "image/rain.png";
                    break;

                case 'Snow':
                    image.src = "image/snow.png";
                    break;   

                case 'Clouds':
                    image.src = "image/cloud.png";
                    break;  

                case 'Mist':
                    image.src = "image/mist.png";
                    break;  
                
                default:
                    image.src = '';

            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
};
