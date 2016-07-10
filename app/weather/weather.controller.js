export default class WeatherCtrl {
	constructor(apiservice) {
		this.apiservice = apiservice;
		this.newWord = {};
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
				this.cities[j].content.item.condition.tempC = this.getCelsius(this.cities[j].content.item.condition.temp);
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
}

WeatherCtrl.$inject = ['apiservice'];