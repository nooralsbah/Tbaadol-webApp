/**
 * Created by nooralsbah on 6/16/15.
 */
"use strict";

app.controller('NavController', function($scope, $location, Auth, toaster) {
    $scope.currentUser= Auth.user;
    $scope.signedIn= Auth.signedIn;

    $scope.logout = function() {
        Ayth.logout();
        toaster.pop('success', 'Logged out successfully');
       // console.log("Logged out");
        $location.path('/');
    };

});