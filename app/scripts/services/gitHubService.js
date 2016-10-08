(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name ssui.gitHubService
   * @description services for fetching git api details
   * @requires $http
   */

  angular.module('gistAppApp').factory('githubService',githubService);

  githubService.$inject = ['$http'];

  function githubService($http) {
    var GITHUB_API_ENDPOINT = 'https://api.github.com';

    return {
        getAllUsers :function(){
          return $http.get(GITHUB_API_ENDPOINT+'/gists');
        },
      //Optional service call to fetch user details like email, location, name and other details
        getGistUser : function (userName) {
          return $http.get(GITHUB_API_ENDPOINT+'/users/'+userName);
        },
        getPublicGists : function(userName){
          return $http.get(GITHUB_API_ENDPOINT+'/users/'+userName+'/gists');
        },
        getGistForks : function(id){
          return $http.get(GITHUB_API_ENDPOINT+'/gists/'+id+'/forks');
        }
    };
  }
})();
