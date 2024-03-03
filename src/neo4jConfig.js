 // neo4jConfig.js
 require('dotenv').config(); // Load environment variables from .env file
 const neo4j = require('neo4j-driver');
 
 const driver = neo4j.driver('bolt://127.0.0.1:7690', neo4j.auth.basic('neo4j','1234anjushaji'));
 const session = driver.session();
 
 module.exports = session;
  
 