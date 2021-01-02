const api = {
    key: "5d9e156fb8a5307802470209fa882947",
    base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchbox.value);

    }
}

function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    function status() {
        let status = ["Güneşli", "Bulutlu", "Karlı", "Açık", "Yağmurlu", "Sisli"]
        if (weather.weather[0].main == "Clouds") {
            return status[1];
        } else if (weather.weather[0].main == "Clear") {
            return status[3];
        } else if (weather.weather[0].main == "Mist") {
            return status[5];
        } else if (weather.weather[0].main == "Snow") {
            return status[2];
        } else if (weather.weather[0].main == "Rain") {
            return status[4];
        }
    }

    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = status();

    let hilow = document.querySelector(".current .hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c/ ${Math.round(
    weather.main.temp_max
  )}°c`;

}




function dateBuilder(d) {
    let months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "haziran",
        "temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
    ];
    let days = [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}