var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function(){
    //what to do when it receives back data
	    $http.get('/contactlist').success(function(response) {
	    	console.log("I got the data I requested");
	    	$scope.contactlist = response;
	    	$scope.contact = "";
		  });
	}

	refresh();

    $scope.addContact = function(){
    	//goal is to send info from data boxes to server to add to mongodb database
    	console.log($scope.contact);
    	//sends to console information in input boxes.
    	//routes??
    	$http.post('/contactlist', $scope.contact).success(function(response){
    		console.log(response);
    		refresh();
    	});
    	//server file must now listen for post request in server.js
    	//2. server sends back data to controller, so once server is done 
    	//listening, we have to create a success function after post request is
    	//complete and response is received.
    };

    $scope.remove = function(id){
    	//send http delete request with id to server 
    	console.log(id);
    	$http.delete('/contactlist/' + id).success(function(response){
    		refresh();
    	});
    };

    $scope.edit = function(id){
    	console.log(id);
    	$http.get('/contactlist/' + id).success(function(response){
    		$scope.contact = response;
    	});
    };

    $scope.update = function(){
    	console.log($scope.contact._id);
    	//we want to send url with id of contact to server
    	//we also want to send the updated data fields of contact to server
    	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
    		refresh();
    	});

    };

    $scope.deselect = function(){
    	$scope.contact = "";
    }



    //make new function called refresh, that makes fresh request for all data
    //in mongodb database.

    
   // $scope.contactlist = contactlist;
    // scope is the glue between application controller and view
   
    // http get from controller side sends request to server and the app
    //app.get from server side responds with data we want


}]);
