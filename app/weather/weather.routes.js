export default function routes($stateProvider) {
	$stateProvider
		.state('weather', {
			url: '/',
			template: require('./weather.html'),
			controller: 'WeatherCtrl',
			controllerAs: 'weather'
		});
}

routes.$inject = ['$stateProvider'];