import { gameData } from './questions.js';
import { changeMap } from './map.js';
const countries = gameData.countries;
//datos chart
var numberMatches = 0;
var dataPie;
var chartPie;
var optionsPie;
var dataLine, chartLine, optionsLine;
// eslint-disable-next-line no-undef
google.charts.load('current', { 'packages': ['corechart'] });
// eslint-disable-next-line no-undef
google.charts.setOnLoadCallback(function () {
   //PieChart
   // Create the data table.
   // eslint-disable-next-line no-undef
   dataPie = new google.visualization.DataTable();
   dataPie.addColumn('string', 'Country');
   dataPie.addColumn('number', 'Ocurrences');


   // Set chart options
   optionsPie = {
      'title': 'Ocurrencias de Países',
      'width': 400,
      'height': 300
   };

   // Instantiate and draw our chart, passing in some options.
   // eslint-disable-next-line no-undef
   chartPie = new google.visualization.PieChart(document.getElementById('chart_div'));

   chartPie.draw(dataPie, optionsPie);
   //LineChart
   // eslint-disable-next-line no-undef
   dataLine = new google.visualization.DataTable();
   dataLine.addColumn('number', 'X');
   dataLine.addColumn('number', 'Tiempo');
   optionsLine = {
      title: 'Tiempo por Partida',
      curveType: 'function',
      legend: { position: 'bottom' }
   };

   // eslint-disable-next-line no-undef
   chartLine = new google.visualization.LineChart(document.getElementById('curve_chart'));

   chartLine.draw(dataLine, optionsLine);
});

/**
 * Edits the Pie chart
 * @param {Data} results 
 */
function drawPieChart(results) {
   /*for(let i=0;i<dataPie.getNumberOfRows();i++){
      if(results == ){

      }
   }*/
   dataPie.addRows([
      [results, 1]
   ]);
   chartPie.draw(dataPie, optionsPie);
}
/**
 * Edits the Line chart
 * @param {Time} seconds 
 */
function drawLineChart(seconds){
   dataLine.addRows([
      [numberMatches,seconds]
   ]);
   chartLine.draw(dataLine, optionsLine);
}


//datos de partida
var countriesInGame = 5;
var maxCountries = 7;
var citiesPerCountry = 3;
var randomCountries = new Set();
var randomCities = [];
/**
 * Generates a random number between the specified range
 * @param {Minimumnumber } min 
 * @param {Maximumnumber} max 
 */
function random(min, max) {
   var number = Math.floor(Math.random() * max) + min;
   return number;
}

/**
 * Deletes all child nodes from a specified node
 * @param {Nodetodelete} parentNode 
 */
function deleteNodes(parentNode) {
   while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.lastChild);
   }
}
/**
 * * Randomizes the countries, and then the cities
 * @param {minoftherandomnumber} min 
 * @param {maxoftherandomnumber} max 
 * @param {numberofcountriesinamatch} numberCountries 
 */
function randomizePlaces(numberCountries) {
   while (randomCountries.size < numberCountries) {
      var number = random(0, maxCountries);
      randomCountries.add(countries[number]);
   }
   randomCountries.forEach(country => {
      var number = random(0, citiesPerCountry);
      let objectCity = {
         city: country.cities[number],
         countrycode: country.code
      };
      randomCities.push(objectCity);
   });
   //shuffle cities
   randomCities = randomCities.sort(() => Math.random() - 0.5);//If the result of this operation is < 0, the element a is put to an index lower than b, and the opposite if the result is > 0
}
/**
 * Generates the cards for the game
 */
function generateGame() {
   let countriesSection = document.getElementById("countries");
   let citiesSection = document.getElementById("cities");
   let templateCountry = document.getElementById("gameCountry");
   let templateCity = document.getElementById("gameCity");

   randomCities.forEach(place => {
      templateCity.content.firstElementChild.textContent = place.city.name;
      let clone = document.importNode(templateCity.content, true);
      citiesSection.appendChild(clone);

      let city = citiesSection.lastElementChild;
      city.dataset.country = place.countrycode;
      city.dataset.city = place.city.cityCode;

   });
   randomCountries.forEach(country => {
      templateCountry.content.firstElementChild.firstElementChild.textContent = country.name;
      let clone = document.importNode(templateCountry.content, true);
      countriesSection.appendChild(clone);
      countriesSection.lastElementChild.lastElementChild.dataset.country = country.code;
   });

}
/**
 * Checks if the game is finished
 * @param {Elementtocheck} droppables 
 */
function checkSuccess(droppables) {
   let count = 0;
   for (var i = 0; i < countriesInGame; i++) {
      if (droppables[i].classList.contains("success")) {
         count++;
      }
   }
   let check = false;
   if (count == countriesInGame) {
      check = true;
   }
   return check;
}
/**
 * Returns the name of the country
 * @param {Country} countryCode 
 */
function findCountryName(countryCode) {
   let findCountries = [...randomCountries];
   let country = findCountries.find(country => country.code == countryCode);
   return country.name;
}
/**
 * Returns the locations of a city
 * @param {Country} countryCode 
 * @param {city} cityCode 
 */
function findLocation(countryCode, cityCode) {
   let findCountries = [...randomCountries];
   let country = findCountries.find(country => country.code == countryCode);
   let city = country.cities.find(city => city.cityCode == cityCode);
   let locations = [city.location[0], city.location[1]];
   return locations;
}
// eslint-disable-next-line no-undef
$("#newgame").bind('click', function (event) {
   numberMatches++;
   randomCountries = new Set();
   randomCities = [];
   deleteNodes(document.getElementById("countries"));
   deleteNodes(document.getElementById("cities"));
   randomizePlaces(countriesInGame);
   event.target.disabled = true;
   generateGame();
   // eslint-disable-next-line no-undef
   $(function () {
      // eslint-disable-next-line no-undef
      $(".city").draggable({
         cursor: 'move',	  //cambiamos la punta de flecha del ratón por una cruz
         containment: '#questions', //limitamos el arrastre        
         revert: true
      });

      // eslint-disable-next-line no-undef
      $(".country").droppable({
         drop: function (event, ui) { //accept (draggable)
            // eslint-disable-next-line no-undef
            let dragItem = $(ui.draggable[0]);
            let countryCode = ui.draggable[0].dataset.country;
            let cityCode = ui.draggable[0].dataset.city;
            if (countryCode == event.target.dataset.country) {
               // eslint-disable-next-line no-undef
               $(this).addClass("success");
               dragItem.draggable("option", "revert", false);
               dragItem.draggable("disable");
               changeMap(findLocation(countryCode, cityCode));
               drawPieChart(findCountryName(countryCode));
               /*draggable.draggable("option", "revert", false);
               draggable.draggable("disable");
               $(this).addClass("success");
               console.log(draggable.attr("data-country"));
               console.log($(this).attr("data-country"));*/

            }
         },

      });

   })
   var droppables = document.getElementsByClassName("ui-droppable");

   var timerVar = setInterval(countTimer, 1000);
   var totalSeconds = 0;
   /**
    * Generates the timer
    */
   function countTimer() {
      ++totalSeconds;
      var hour = Math.floor(totalSeconds / 3600);
      var minute = Math.floor((totalSeconds - hour * 3600) / 60);
      var seconds = totalSeconds - (hour * 3600 + minute * 60);

      if (minute < 10)
         minute = "0" + minute;
      if (seconds < 10)
         seconds = "0" + seconds;
      document.getElementById("questions").firstElementChild.textContent = minute + ":" + seconds;
      var checkFinish = checkSuccess(droppables);
      if (checkFinish) {
         clearInterval(timerVar);
         event.target.disabled = false;
         drawLineChart(totalSeconds);
      }
   }

})


