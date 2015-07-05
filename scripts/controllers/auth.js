/**
 * Created by nooralsbah on 6/15/15.
 */
'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {

    if(Auth.signedIn()) {
        $location.path('/');
    }

    $scope.register = function(user) {
        Auth.register(user).then(function() {
            toaster.pop('success', 'Registered successfully');
           // console.log("Register successfully!");
            $location.path('/');
        }, function(err) {
            toaster.pop('error', 'Oops, something went wrong!');
           // console.log("Error...");
        });
    };

    $scope.login = function(user) {

        Auth.login(user)
         .then(function() {
            toaster.pop('success', 'Logged in successfully');
           // console.log("تم تسجيل الدخول بنجاح");
            $location.path('/');
        }, function(err) {
            toaster.pop('error', 'Oops, something went wrong!');
           // console.log("خطاأ...");
        });
    };

    $scope.changePassword = function(user) {

        Auth.changePassword(user)
            .then(function() {

                // Reset form
                $scope.user.email ='';
                $scope.user.oldPass ='';
                $scope.user.newPass ='';

             toaster.pop('success', 'Password changed successfully');
           // console.log("تم تغيير كلمة السر بنجاح");
        }, function(err) {
            console.log("خطاأ...");
        });
    };
});