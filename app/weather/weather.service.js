export default class apiService {
	constructor($http){
		this.$http = $http;
		//http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where location="woeid"&format=json
		//select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="nome, ak")
		//http://where.yahooapis.com/v1/places.q('northfield%20mn%20usa')?appid=[yourappidhere]
		//http://where.yahooapis.com/v1/places.q('seattle')?format=json&appid=dj0yJmk9MGlvcmhEaXl2RHN6JmQ9WVdrOWNtNDRTMEprTnpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hZg--
		this.WOEID_ENDPOINT = "http://where.yahooapis.com/v1/places.q('";
		this.WOEID_CLOSE = "')?format=json&appid=";
		this.YAHOO_ID = "dj0yJmk9MGlvcmhEaXl2RHN6JmQ9WVdrOWNtNDRTMEprTnpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hZg--";


		this.FORECAST_ENDPOINT = "http://query.yahooapis.com/v1/public/yql?q=";
		this.FORECAST_YQL_OPEN_WOIED = "select * from weather.forecast where woeid='";
		this.FORECAST_YQL_CLOSE = "'&format=json";
	}

	getWoied(city){
		this.newcity = city;
		this.url = this.WOEID_ENDPOINT + this.newcity + this.WOEID_CLOSE + this.YAHOO_ID;
		return this.$http.get(this.url);
	}

	getWeather(woeid) {
		this.woeid = woeid;
		this.url = this.FORECAST_ENDPOINT + this.FORECAST_YQL_OPEN_WOIED + this.woeid + this.FORECAST_YQL_CLOSE;
		return this.$http.get(this.url);
	}
}

apiService.$inject = ['$http'];