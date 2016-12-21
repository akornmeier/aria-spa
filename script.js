var dequeuApp = angular.module('dequeuApp', ['ngRoute']);

// configure routes
dequeuApp.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl : 'pages/home.html',
      controller  : 'mainCtrl',
      title: 'Home Page: Angular Routing Example'
    })
    .when('/about', {
      templateUrl : 'pages/about.html',
      controller  : 'aboutCtrl',
      title: 'About Us: Angular Routing Example'
    })
    .when('/login', {
      templateUrl : 'pages/login.html',
      controller  : 'loginCtrl',
      title: 'Sign in: Angular Routing Example'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

dequeuApp.run(['$location', '$rootScope', function($location, $rootScope) {
  var history;
  var currentURL;

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    if(current.$$route) {
      currentURL = current.$$route.originalPath;
      $rootScope.title = current.$$route.title;

      if (previous) {
        if (previous.$$route) {
          history = previous.$$route.originalPath;
        }
      }
    }
  });

  $rootScope.$on('$viewContentLoaded', function () {
    if(history) {
      document.querySelector('#liveregion').append("Loading Content");
      setTimeout(function() {
        document.querySelector('#liveregion').append($rootScope.title);
        document.querySelector('#main h1').focus();
      }, 850);
    }
  });
}]);

dequeuApp.controller('mainCtrl', function($scope) {
  $scope.message = 'Accessible Angular routing example. Shows proper focus management for SPA routing.';
});

dequeuApp.controller('aboutCtrl', function($scope) {
  $scope.message = 'About us page!';
});

dequeuApp.controller('loginCtrl', function($scope) {
  $scope.message = 'Please sign in (its just a demo)...';
});

// var header = document.getElementById('navbar-header');
// header