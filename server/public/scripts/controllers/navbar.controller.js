angular.module('NavBar', ['ngMaterial']) // creates NavBar with ngMaterial Dependecy
    .controller('NavCtrl', navCtrl);

    var vm = this;

    // provies basic functionality for nav bar
function navCtrl($scope) {
    vm.currentNavItem = 'home';

    vm.goto = function (page) {
        console.log("Goto " + page);
    };

    // console.log('inside navCtrl()!');
    
} // end navCtrl()