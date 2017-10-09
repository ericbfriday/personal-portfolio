angular.module('NavBar', ['ngMaterial']) // creates NavBar with ngMaterial Dependecy
    .controller('NavCtrl', navCtrl);

function navCtrl($scope) {
    $scope.currentNavItem = 'home';
} // end navCtrl()