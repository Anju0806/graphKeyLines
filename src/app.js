
const express = require('express');
const app = express();
const port = 3000;
const session = require('./neo4jConfig');
const ejs = require('ejs');

app.use(express.static('public'));
app.set('view engine', 'ejs'); // Set EJS as the view engine

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

// Set up a route to serve your HTML file with data
app.get('/', async (req, res) => {
  try {
    // Run the Neo4j query to get data
    //const records = await runNeo4jQuery('MATCH (p:Person) RETURN p', {});
    const records = await runNeo4jQuery('MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 25', {});


    // Extract the relevant data from the result
    //const neo4jData = records.map(record => record.get('p').properties);
    const neo4jData = records.map(record => {
      return {
        node1: record.get('n1').properties,
        relationship: record.get('r').type,
        node2: record.get('n2').properties,
        
      };
    });
    

    // Render your HTML file with the retrieved data
    res.render('index', { neo4jData });
  } catch (error) {
    // Handle errors appropriately
    console.error('Error processing request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});