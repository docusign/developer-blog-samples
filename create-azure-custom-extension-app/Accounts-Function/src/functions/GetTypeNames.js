/* This function calls the external system of record to retrieve the names of the supported types. 
These types represent the data models (or database table names) in your system of record.
Note: The names of the types returned by this action will be used as input for the GetTypeDefinitions function. */

const { app } = require('@azure/functions');

app.http('GetTypeNames', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (req, context) => {
    // Prepare the response message structure with type names
    const responseMessage = {

      //pass the DB names as typeNames array
      "typeNames": [{
        "typeName": "Accounts", // Type name representing 'Employees' DB
        "label": "Accounts", // Label for the type
        "description": "Details of Accounts" // Description of the type
      }]
    };

    // Set the response to be returned to the client
    return {
      status: 200, /* Defaults to 200 */
      jsonBody: responseMessage  // Send the constructed response message
    };
  }
});
