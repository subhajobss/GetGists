'use strict';

/**
 * @ngdoc function
 * @name gistAppApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller having business logic of GIST APP
 */
angular.module('gistAppApp')
  .controller('SearchCtrl', function ($scope,githubService, $mdDialog) {
    $scope.userData = [];
    $scope.gistDetails = {};
    $scope.loadingProfile = true;


    init();
    /**
     * @ngdoc method
     * @name init
     * @methodOf SearchCtrl
     * @description  to load user details on page load
     */
    function init () {
       // to list all public gist user details
      githubService.getAllUsers().then(function(response){
        debugger;
        var users  = response.data;
        angular.forEach(users, function (user) {
          if(user.owner){
            $scope.userData.push(user.owner);
            console.log('users'+JSON.stringify($scope.userData));
          }
        });
      });
    }

    /**
     * @ngdoc method
     * @name getUserGist
     * @methodOf SearchCtrl
     * @description  to fetch selected gist details
     * Once the detail is fetched forks of the selected user is also retrieved
     */
    $scope.getUserGist = function(user){
      $scope.loadingProfile = false;
      $scope.isContentDisplayed = false;
      $scope.filetype = {};
      if(user && user.login){
        githubService.getGistUser(user.login).then(function (response) {
          if(response.data){
            $scope.gistDetails = response.data;
            githubService.getPublicGists(user.login).then(function(response){
              if(response.data){
                $scope.publicGists = response.data;
                getForksList();
                getFileTypes();
                $scope.isContentDisplayed = true;
                $scope.loadingProfile = true;
              }

            });
          }
        });
      }else{
        $scope.isContentDisplayed = false;
        $scope.loadingProfile = true;
        displayErrorModal();
      }

    };

    /**
     * @ngdoc method
     * @name getFileTypes
     * @methodOf SearchCtrl
     * @description  to get all filetypes of public gists.
     */
   function getFileTypes(){
     angular.forEach($scope.publicGists,function(gist){
       var files = gist.files;
       Object.keys(files).forEach(function(k) {
         $scope.filetype = (files[k].type);
       });
     });
   }


    /**
     * @ngdoc method
     * @name displayErrorModal
     * @methodOf SearchCtrl
     * @description  to display error when profile not found
     */
    function displayErrorModal(){
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('ERROR')
          .textContent('GIST User Not Found! Please try Again!!!')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
      );
    }



  });
