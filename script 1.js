document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your own API key from OpenWeatherMap

    const submitBtn = document.getElementById('submitBtn');
    const locationInput = document.getElementById('location');
    const weatherInfo = document.getElementById('weatherInfo');

    submitBtn.addEventListener('click', function() {
        const locationValue = locationInput.value.trim();
        if (locationValue === '') {
            alert('Please enter a location');
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { name, main, weather } = data;
                const { temp, humidity } = main;
                const { description, icon } = weather[0];

                const weatherData = `
                    <h2>${name}</h2>
                    <div>
                        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                    </div>
                    <p><strong>Temperature:</strong> ${temp} °C</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                `;

                weatherInfo.innerHTML = weatherData;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please try again.');
            });
    });
});
