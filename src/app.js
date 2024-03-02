// app.js
const session = require('./neo4jConfig');

async function runNeo4jQuery() {
  const query = 'CREATE (user:Person {name: $name}) RETURN user';
  const result = await session.run(query, { name: 'John' });

  // Log the result to the console for inspection
  console.log(result);
}

// Call the asynchronous function
runNeo4jQuery();
