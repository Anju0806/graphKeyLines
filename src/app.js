const session = require('./neo4jConfig');

// Function to run a Neo4j query
async function runNeo4jQuery(query, parameters) {
  try {
    const result = await session.run(query, parameters);
    return result.records;
  } catch (error) {
    console.error('Error running Neo4j query:', error);
    throw error;
  }
}

// Example: Run a query with parameters
const query = 'MATCH (p:Person) RETURN p';
const parameters = {};

// Call the function and log the result
runNeo4jQuery(query, parameters)
  .then((records) => {
    console.log(records);
  })
  .finally(() => {
    // Close the Neo4j session when done
    session.close();
  });
