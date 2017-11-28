angular.module('NavBar', ['ngMaterial']) // creates NavBar with ngMaterial Dependecy
.controller('NavCtrl', function ($location) {
            // console.log('navbar controller loaded');
            var vm = this;
            vm.currentNavItem = $location.path();
});