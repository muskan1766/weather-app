const apiKey = "450c4890e0ce9c4deaa97ded6bf092c0";
let unit = "metric"; // default Celsius

function setUnit(selectedUnit) {
    unit = selectedUnit;
    getWeather();
}

function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    document.getElementById("loader").style.display = "block";
    document.getElementById("result").innerHTML = "";


    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("result").innerHTML = "City not found ❌";
                document.getElementById("loader").style.display = "none";
                return;
            }

            const tempUnit = unit === "metric" ? "°C" : "°F";

            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById("result").innerHTML = `
                <h3>${data.name}</h3>
                <img src="${iconUrl}" alt="weather icon">
                <p>🌡 Temperature: ${data.main.temp} ${tempUnit}</p>
                <p>☁ Condition: ${data.weather[0].description}</p>
                <p>🌍 Longitude: ${data.coord.lon}</p>
            `;
            changeBackground(data.weather[0].main);
            document.getElementById("loader").style.display = "none";

        })
        .catch(() => {
            document.getElementById("loader").style.display = "none";
            alert("Error fetching weather data");
        });
}

function changeBackground(weather) {
    const body = document.body;

    if (weather.includes("Cloud")) {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')";
    } 
    else if (weather.includes("Rain")) {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29')";
    } 
    else if (weather.includes("Clear")) {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";
    } 
    else if (weather.includes("Snow")) {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5')";
    } 
    else {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413')";
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}
