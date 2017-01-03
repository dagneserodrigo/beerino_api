
var mysql  = require('mysql');
  
function createDatabaseConnection() {
  	return mysql.createConnection({
  		host: '10.0.75.1',
  		user: 'root',
 		password: 'admin',
 		database: 'beerino'
 	});
 }
 
 module.exports = function() {
 	return createDatabaseConnection;
 }