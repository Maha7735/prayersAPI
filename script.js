//ARRAY FOR CITY NAMES
let cities = [
  {
    arabicName: "مكة المكرمة",
    name: "Makkah al Mukarramah",
  },
  {
    arabicName: "المدينة المنورة",
    name: "Al Madīnah al Munawwarah",
  },
  {
    arabicName: "الرياض",
    name: "Ar Riyāḑ",
  },
  {
    arabicName: "حائل",
    name: "Ḩā'il",
  },
  {
    arabicName: "القصيم",
    name: "Al Qaşīm",
  },
  {
    arabicName: "تبوك",
    name: "Tabūk",
  },
  {
    arabicName: "الشرقية",
    name: "Ash Sharqīyah",
  },
];
document.getElementById("cities-select").innerHTML = "";
for (let city of cities) {
  const content = `<option>${city.arabicName}</option>`;
  document.getElementById("cities-select").innerHTML += content;
}
//== ARRAY FOR CITY NAMES ==//
//ADD EVENT TO CHANE THE TIME WITH THE CITIES
document
  .getElementById("cities-select")
  .addEventListener("change", function () {
    let cityNam = "";
    for (let city of cities) {
      if (city.arabicName == this.value) {
        cityNam = city.name;
      }
    }
    getPrayersTimingsOfCity(cityNam);
  });
//== ADD EVENT TO CHANE THE TIME WITH THE CITIES==
function getPrayersTimingsOfCity(cityName) {
  let params = {
    country: "SA",
    city: cityName,
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      console.log(response);
      const timings = response.data.data.timings;
      document.getElementById("fajrTime").innerHTML = timings.Fajr;

      document.getElementById("shrowgTime").innerHTML = timings.Sunrise;

      document.getElementById("daharTime").innerHTML = timings.Dhuhr;

      document.getElementById("aserTime").innerHTML = timings.Asr;

      document.getElementById("magrabTime").innerHTML = timings.Maghrib;

      document.getElementById("aishaTime").innerHTML = timings.Isha;
      //to show the date and day

      const readableDate = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;
      document.getElementById("date").innerHTML = readableDate;
      document.getElementById("day").innerHTML = weekDay;

      //== to show the date and day ==
    })
    .catch(function (error) {
      console.log(error);
    });
}
getPrayersTimingsOfCity("Makkah al Mukarramah");
