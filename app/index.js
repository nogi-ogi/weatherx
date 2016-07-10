import angular from 'angular';
import uirouter from 'angular-ui-router';

import weather from './weather';
import routing from './index.config';

angular.module('appNomin', [uirouter,weather])
	.config(routing);