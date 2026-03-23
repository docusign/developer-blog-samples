/* This function creates a record in the external system of record. The type (model) is specified by typeName, and the properties are specified in the data object.*/

const { CosmosClient } = require("@azure/cosmos");
const { app } = require('@azure/functions');


//DB endpoint and key
const endpoint = process.env["COSMOSDB_ENDPOINT"];
const key = process.env["COSMOSDB_PRIMARY_KEY"];


//DB details
const databaseId = "Accounts-DB";
const containerId = "Accounts";

app.http('CreateRecord', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log('JavaScript HTTP trigger function processed a request.');
        const body = await req.json();
        const client = new CosmosClient({ endpoint, key });
        context.log('Request Body:', JSON.stringify(body));

        if (body && body.data) {
            try {
                const database = client.database(databaseId);
                const container = database.container(containerId);
                const newItem = body.data; // Extract the actual data


                // Create a new item in the container
                const { resource: createdItem } = await container.items.create(newItem);
                context.log('Success:', createdItem);


                // Prepare the response object with the required and additional properties
                const responseItem = {
                    recordId: createdItem.id, // Required property
                };


                // Set the response
                return {
                    status: 200,
                    jsonBody: responseItem
                };
            } catch (error) {
                // Log the error with stack trace
                context.log('Error:', error.message);
                context.log('Stack:', error.stack);


                // Handle errors
                return {
                    status: 500,
                    jsonBody: { error: error.message }
                };
            }
        } else {
            // Handle missing body or data in the request
            return {
                status: 400,
                jsonBody: { error: "Please pass a valid schema in the request body." }
            };
        }
    }
});