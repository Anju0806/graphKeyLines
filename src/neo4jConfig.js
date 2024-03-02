// neo4jConfig.js
require('dotenv').config(); // Load environment variables from .env file
const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://localhost:7690', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const session = driver.session();

module.exports = session;
