export default class WeatherCtrl {
	constructor(apiservice) {
		this.apiservice = apiservice;
		this.currentTime = new Date();
		this.cities = [
    		{ name:'Vancouver', woeid: '9807', singleModel: '5', isCollapsed: false, unit: true, content: {}},
    		{ name:'Victoria', woeid: '9848', singleModel: '5', isCollapsed: false, unit: true, content: {}},
    		{ name:'Kelowna', woeid: '9861', singleModel: '5', isCollapsed: false, unit: true, content: {}}
  			];

		for (var i=0; i<this.cities.length; i++){
			this.getWeather(i);
		}

	}

	getWeather(j) {
		this.apiservice.getWeather(this.cities[j].woeid)
			.then(result => {
				this.cities[j].content = result.data.query.results.channel;
				//create Celsius temps and append to data model
				//set icon class name based on code
				this.cities[j].content.item.condition.tempC = this.getCelsius(this.cities[j].content.item.condition.temp);
				this.cities[j].content.item.condition.icon = this.setWeatherIcon(this.cities[j].content.item.condition.code);
				for(var i=0; i<this.cities[j].content.item.forecast.length; i++) {
					this.cities[j].content.item.forecast[i].highC = this.getCelsius(this.cities[j].content.item.forecast[i].high);
					this.cities[j].content.item.forecast[i].lowC = this.getCelsius(this.cities[j].content.item.forecast[i].low);
				}
			})
			.catch(error => console.log('Weather information not available'));
	}

	addCity(city) {
		this.city = city;
		this.getWoeid(this.city)
			.then(result => {
				this.cities.push({name: this.city, woeid: '', singleModel: '5', isCollapsed: false, unit: true, content: {}});
				this.cities[this.cities.length-1].woeid = result;
				this.getWeather(this.cities.length-1);
			})
			.catch(error => console.log('could not find WOEID!!!'));
	}

	getCelsius(temp) {
		return Math.round((5.0/9.0)*(temp-32.0));
	}

	getWoeid(city) {
		this.city = city;
		return this.apiservice.getWoied(this.city)
			.then(result => {
				return result.data.places.place[0].woeid;
			});
	}

	setWeatherIcon(condid) {
	  var icon = '';
	      switch(condid) {
	        case '0': icon  = 'wi-tornado';
	          break;
	        case '1': icon = 'wi-storm-showers';
	          break;
	        case '2': icon = 'wi-tornado';
	          break;
	        case '3': icon = 'wi-thunderstorm';
	          break;
	        case '4': icon = 'wi-thunderstorm';
	          break;
	        case '5': icon = 'wi-snow';
	          break;
	        case '6': icon = 'wi-rain-mix';
	          break;
	        case '7': icon = 'wi-rain-mix';
	          break;
	        case '8': icon = 'wi-sprinkle';
	          break;
	        case '9': icon = 'wi-sprinkle';
	          break;
	        case '10': icon = 'wi-hail';
	          break;
	        case '11': icon = 'wi-showers';
	          break;
	        case '12': icon = 'wi-showers';
	          break;
	        case '13': icon = 'wi-snow';
	          break;
	        case '14': icon = 'wi-storm-showers';
	          break;
	        case '15': icon = 'wi-snow';
	          break;
	        case '16': icon = 'wi-snow';
	          break;
	        case '17': icon = 'wi-hail';
	          break;
	        case '18': icon = 'wi-hail';
	          break;
	        case '19': icon = 'wi-cloudy-gusts';
	          break;
	        case '20': icon = 'wi-fog';
	          break;
	        case '21': icon = 'wi-fog';
	          break;
	        case '22': icon = 'wi-fog';
	          break;
	        case '23': icon = 'wi-cloudy-gusts';
	          break;
	        case '24': icon = 'wi-cloudy-windy';
	          break;
	        case '25': icon = 'wi-thermometer';
	          break;
	        case '26': icon = 'wi-cloudy';
	          break;
	        case '27': icon = 'wi-night-cloudy';
	          break;
	        case '28': icon = 'wi-day-cloudy';
	          break;
	        case '29': icon = 'wi-night-cloudy';
	          break;
	        case '30': icon = 'wi-day-cloudy';
	          break;
	        case '31': icon = 'wi-night-clear';
	          break;
	        case '32': icon = 'wi-day-sunny';
	          break;
	        case '33': icon = 'wi-night-clear';
	          break;
	        case '34': icon = 'wi-day-sunny-overcast';
	          break;
	        case '35': icon = 'wi-hail';
	          break;
	        case '36': icon = 'wi-day-sunny';
	          break;
	        case '37': icon = 'wi-thunderstorm';
	          break;
	        case '38': icon = 'wi-thunderstorm';
	          break;
	        case '39': icon = 'wi-thunderstorm';
	          break;
	        case '40': icon = 'wi-storm-showers';
	          break;
	        case '41': icon = 'wi-snow';
	          break;
	        case '42': icon = 'wi-snow';
	          break;
	        case '43': icon = 'wi-snow';
	          break;
	        case '44': icon = 'wi-cloudy';
	          break;
	        case '45': icon = 'wi-lightning';
	          break;
	        case '46': icon = 'wi-snow';
	          break;
	        case '47': icon = 'wi-thunderstorm';
	          break;
	        case '3200': icon = 'wi-cloud';
	          break;
	        default: icon = 'wi-cloud';
	          break;
	      }
	  
	      return 'wi '+ icon;
	}
}

WeatherCtrl.$inject = ['apiservice'];