
var mysql  = require('mysql');
  
function createDatabaseConnection() {
  	return mysql.createConnection({
  		host: '172.17.0.1',
  		user: 'root',
 		password: 'admin',
 		database: 'beerino'
 	});
 }
 
 module.exports = function() {
 	return createDatabaseConnection;
 }