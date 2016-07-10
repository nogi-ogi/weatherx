import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import uiBootstrap from 'angular-ui-bootstrap';

import routing from './weather.routes';
import WeatherCtrl from './weather.controller';
import apiService from './weather.service';

export default angular.module('appNomin.weather', [uirouter, angularAnimate, uiBootstrap])
.config(routing)
.controller('WeatherCtrl', WeatherCtrl)
.service('apiservice', apiService)
.name;