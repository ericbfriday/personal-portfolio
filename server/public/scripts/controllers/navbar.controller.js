angular.module('NavBar', ['ngMaterial']) // creates NavBar with ngMaterial Dependecy
    .controller('NavCtrl', navCtrl);

var vm = this;

// provies basic functionality for nav bar
function navCtrl($scope) {
    vm.currentNavItem = 'home';
} // end navCtrl()
