window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    const main1 = document.getElementById('main');
    let curDate = document.getElementById('date');
    const getCurrentDay = () => {
        var weekDay = new Array(7);
        weekDay[0] = "Sunday";
        weekDay[1] = "Monday";
        weekDay[2] = "Tuesday";
        weekDay[3] = "Wednesday";
        weekDay[4] = "Thursday";
        weekDay[5] = "Friday";
        weekDay[6] = "Saturday";
       
        let currentTime = new Date();
        let day = weekDay[currentTime.getDay()];
        return day;
    };
    const getCurrentTime = () => {
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];
        var now = new Date();
        var month = months[now.getMonth()];// because the value of getMonth starts from 0
        var date = now.getDate();

        let hours = now.getHours();
        let mins = now.getMinutes();
        let period = "AM";

        if(hours > 11){
            period = "PM";
            if(hours > 12){
                hours -=12;
            }
        }
        if(mins < 10){
            mins = "0" + mins;
        }
        
        return `${month} ${date} | ${hours}:${mins} ${period}`;
    };
    curDate.textContent = getCurrentDay() + " | " + getCurrentTime();
   

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d4ccaf0be76dae346604802a9ce3105c`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const {description,main} = data.weather[0];
                var iconcode = data.weather[0].icon;
                var skycons = new Skycons({"color": "white"});
                     skycons.set("icon-image",Skycons.CLEAR_DAY);
                     skycons.set("icon-image", Skycons.CLEAR_NIGHT);
                     skycons.set("icon-image", Skycons.PARTLY_CLOUDY_DAY);
                     skycons.set("icon-image", Skycons.PARTLY_CLOUDY_NIGHT);
                     skycons.set("icon-image", Skycons.CLOUDY);
                     skycons.set("icon-image", Skycons.RAIN);
                     skycons.set("icon-image", Skycons.SLEET);
                     skycons.set("icon-image", Skycons.SNOW);
                     skycons.set("icon-image", Skycons.WIND);
                     skycons.set("icon-image", Skycons.FOG);

                switch (iconcode) {
                     case "01d":
                     skycons.add(document.getElementById("icon-image"), Skycons.CLEAR_DAY);
                     break;
                     case "01n":
                     skycons.add(document.getElementById("icon-image"), Skycons.CLEAR_NIGHT);
                     break;
                     case "02d":
                     skycons.add(document.getElementById("icon-image"), Skycons.PARTLY_CLOUDY_DAY);
                     break;
                     case "02n":
                     skycons.add(document.getElementById("icon-image"), Skycons.PARTLY_CLOUDY_NIGHT);
                     break;
                     case "03d":
                     skycons.add(document.getElementById("icon-image"), Skycons.CLOUDY);
                     break;
                     case "09d":
                     skycons.add(document.getElementById("icon-image"), Skycons.RAIN);
                     break;
                     case "13d":
                     skycons.add(document.getElementById("icon-image"), Skycons.SNOW);
                     break;
                     case "50d":
                     skycons.add(document.getElementById("icon-image"), Skycons.FOG);
                     break;

                     default:

                 }


             skycons.play();

                //var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
               
                //const {name} = data.name;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name;

                //formula for celsius
                let celsius = temp-273.15;
                let farenheit = ((celsius)*9/5) + 32;

                //document.getElementById("icon-image").src = iconurl;

                //change temp to celsius/farenheit/kelvin
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "K"){
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else if(temperatureSpan.textContent === "°C"){
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(farenheit);
                    }
                    else {
                        temperatureSpan.textContent = "K";
                        temperatureDegree.textContent = temp;
                    }
                });

                switch(main) {
                    case "Clear" :
                        main1.style.backgroundImage = 'url("../images/clear.jpg")'
                        break
                    case "Thunderstorm":
                            main1.style.backgroundImage = 'url("../images/mostly-cloudy.jpg")'
                            break
                    case "Rain":
                            main1.style.backgroundImage = 'url("../images/rain.jpg")'
                            break
                    case "Sunny":
                            main1.style.backgroundImage = 'url("../images/sunny.jpg")'
                            break
                    case "Drizzle":
                            main1.style.backgroundImage = 'url("../images/cloudy.jpg")'
                            break
                    case "Clouds":
                            main1.style.backgroundImage = 'url("../images/partly-cloudy.jpg")'
                            break
                }

            });
            
        });

    }else{
        h1.textContent = "hey this is not working because you did not allow us to access your location"
    }

    

});