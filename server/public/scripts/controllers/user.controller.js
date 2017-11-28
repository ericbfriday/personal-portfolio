myApp.controller('UserController', function (GithubService) {
  // console.log('UserController loaded.');
  const vm = this;

  vm.user = GithubService.user;
  vm.repos = GithubService.repos;

  // get profile and repo info on load
  GithubService.githubProfile();
  GithubService.githubRepos();

  vm.openurl = function(url){
    window.open(url, '_blank','heigth=600,width=600');   // may alse try $window
};
});