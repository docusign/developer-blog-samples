/*This function updates an existing record. */

const { CosmosClient } = require("@azure/cosmos");
const { app } = require('@azure/functions');


//DB endpoint and key
const endpoint = process.env["COSMOSDB_ENDPOINT"];
const key = process.env["COSMOSDB_PRIMARY_KEY"];


//DB details
const databaseId = "Accounts-DB";
const containerId = "Accounts";


app.http('PatchRecord', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log('JavaScript HTTP trigger function processed a request.');
        const body = await req.json();
        const client = new CosmosClient({ endpoint, key });
        context.log('Request Body:', JSON.stringify(body));


        if (body && body.typeName && body.recordId && body.data) {
            try {
                const database = client.database(databaseId);
                const container = database.container(containerId);

                const itemId = body.recordId;
                context.log(itemId);
                const newData = body.data; // Extract the actual data to be updated

                // Read the item to get its current state
                const { resource: existingItem, statusCode } = await container.item(itemId, newData.account_holder_email).read();


                //if the item is not found
                if (statusCode === 404) {
                    return {
                        status: 404,
                        jsonBody: {
                            code: "NOT_FOUND",
                            message: "No record was found for the given query"
                        }
                    };
                }


                // Update the existing item with new data
                const updatedItem = { ...existingItem, ...newData };
                context.log(updatedItem);


                // Replace the item in the container
                await container.item(itemId, newData.account_holder_email).replace(updatedItem);


                //await container.item(itemId).replace(updatedItem);
                context.log('Success: Item updated');
                context.log(updatedItem);


                // Prepare the response object
                return {
                    status: 200,
                    jsonBody: {
                        success: true // Required property for success
                    }
                };
            } catch (error) {
                // Log the error with stack trace
                context.log('Error:', error.message);
                context.log('Stack:', error.stack);


                // Handle errors
                return {
                    status: 500,
                    jsonBody: {
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message
                    }
                };
            }
        } else {
            // Handle missing body or data in the request
            return {
                status: 400,
                jsonBody: {
                    code: "BAD_REQUEST",
                    message: "The request body did not contain proper inputs."
                }
            };
        }
    }
});


