// seedData.js
console.log("Script is running...1111");

const session = require('../src/neo4jConfig');

async function seedData() {
  console.log("Script is running...222");
  console.log("hi");
  // Define Cypher query to clear existing data
  const clearQuery = `
    MATCH (p:Person)
    DETACH DELETE p;
  `;
  
  // Define Cypher query to seed data
  const seedQuery = `
    CREATE (ceo:Person {name: 'John Doe', role: 'CEO'}),
           (cto:Person {name: 'Alice Smith', role: 'CTO'}),
           (cfo:Person {name: 'Bob Johnson', role: 'CFO'}),
           (manager1:Person {name: 'Charlie Brown', role: 'Manager'}),
           (manager2:Person {name: 'David Miller', role: 'Manager'}),
           (employee1:Person {name: 'Eva Davis', role: 'Employee'}),
           (employee2:Person {name: 'Frank Wilson', role: 'Employee'}),
           (employee3:Person {name: 'Grace Moore', role: 'Employee'}),
           (employee4:Person {name: 'Henry Turner', role: 'Employee'}),
           (employee5:Person {name: 'Ivy Carter', role: 'Employee'}),
           (employee6:Person {name: 'Jack Evans', role: 'Employee'}),
           (employee7:Person {name: 'Kelly Harris', role: 'Employee'}),
           (employee8:Person {name: 'Liam Robinson', role: 'Employee'}),
           (employee9:Person {name: 'Mia Martinez', role: 'Employee'}),
           (employee10:Person {name: 'Nathan Hall', role: 'Employee'}),
           
           // Define reporting lines
           (cto)-[:REPORTS_TO]->(ceo),
           (cfo)-[:REPORTS_TO]->(ceo),
           (manager1)-[:REPORTS_TO]->(cto),
           (manager2)-[:REPORTS_TO]->(cfo),
           (employee1)-[:REPORTS_TO]->(manager1),
           (employee2)-[:REPORTS_TO]->(manager1),
           (employee3)-[:REPORTS_TO]->(manager1),
           (employee4)-[:REPORTS_TO]->(manager2),
           (employee5)-[:REPORTS_TO]->(manager2),
           (employee6)-[:REPORTS_TO]->(manager2),
           (employee7)-[:REPORTS_TO]->(manager2),
           (employee8)-[:REPORTS_TO]->(manager2),
           (employee9)-[:REPORTS_TO]->(manager2),
           (employee10)-[:REPORTS_TO]->(manager2)
    RETURN ceo, cto, cfo, manager1, manager2, employee1, employee2, employee3, employee4, employee5, employee6, employee7, employee8, employee9, employee10;
  `;

  try {
    // Run the Cypher query to clear existing data
    await session.run(clearQuery);

    // Run the Cypher query to seed data
    const result = await session.run(seedQuery);

    // Log the result to the console for inspection
    console.log(result);
    console.log("Seeding complete");
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}
// Check if the script is the main module
if (require.main === module) {
  // If it is, execute the seeding logic
  seedData();
}

module.exports = seedData;
