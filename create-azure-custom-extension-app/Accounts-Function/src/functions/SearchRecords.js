/* This action searches for one or more records in the external system of record. 
Note: Maestro workflows use the SearchRecords action to identify a record to update.  */

const { CosmosClient } = require("@azure/cosmos");
const { app } = require('@azure/functions');

app.http('SearchRecords', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log('JavaScript HTTP trigger function processed a request.');
        const body = await req.json();

        // Log the entire request body
        context.log('Request Body:', JSON.stringify(body, null, 2));


        const iql = body.query;


        // Function to handle the parsing with error logging
        function parse_iql_to_sql_try(context, iql) {
            try {
                return parse_iql_to_sql(context, iql);
            } catch (error) {
                context.log('Error in parse_iql_to_sql:', error);
                throw (error);
            }
        }


        // Recursive function to decompose the JSON and return SQL
        function parse_iql_to_sql(context, iql) {
            const iqlclass = iql['$class'];
            context.log("Processing class:", iqlclass);


            let retval;
            switch (iqlclass) {
                case "com.docusign.connected.data.queries@1.0.0.Query":
                    context.log("Found Query root");
                    const iql_attr = iql["attributesToSelect"].map((x) => "c." + x).join(", ");
                    retval = `SELECT ${iql_attr} FROM c WHERE ${parse_iql_to_sql_try(context, iql["queryFilter"])}`;
                    break;
                case "com.docusign.connected.data.queries@1.0.0.QueryFilter":
                    context.log("Found QueryFilter");
                    retval = `(${parse_iql_to_sql_try(context, iql["operation"])})`;
                    break;
                case "com.docusign.connected.data.queries@1.0.0.ComparisonOperation":
                    context.log("Found ComparisonOperation:", iql["operator"]);
                    switch (iql["operator"]) {
                        case "EQUALS":
                            retval = `${parse_iql_to_sql_try(context, iql["leftOperand"])} = ${parse_iql_to_sql_try(context, iql["rightOperand"])}`;
                            break;
                        case "NOT_EQUALS":
                            retval = `${parse_iql_to_sql_try(context, iql["leftOperand"])} != ${parse_iql_to_sql_try(context, iql["rightOperand"])}`;
                            break;
                        case "GREATER_THAN_OR_EQUALS_TO":
                            retval = `${parse_iql_to_sql_try(context, iql["leftOperand"])} >= ${parse_iql_to_sql_try(context, iql["rightOperand"])}`;
                            break;
                        case "STARTS_WITH":
                            retval = `STARTSWITH(${parse_iql_to_sql_try(context, iql["leftOperand"])}, ${parse_iql_to_sql_try(context, iql["rightOperand"])}, true)`;
                            break;
                        default:
                            context.log("Unknown operator:", iql["operator"]);
                            throw ("Unknown operator: " + iql["operator"]);
                    }
                    break;
                case "com.docusign.connected.data.queries@1.0.0.LogicalOperation":
                    context.log("Found LogicalOperation:", iql["operator"]);
                    retval = `${parse_iql_to_sql_try(context, iql["leftOperation"])} ${iql["operator"]} ${parse_iql_to_sql_try(context, iql["rightOperation"])}`;
                    break;
                case "com.docusign.connected.data.queries@1.0.0.Operand":
                    context.log("Found Operand:", iql["name"]);
                    if (iql["isLiteral"]) {
                        context.log("Operand is literal");
                        let wrapper_l = '';
                        let wrapper_r = '';


                        switch (iql["type"]) {
                            case "STRING":
                            case "DATETIME":
                            case "ENUM":
                            case "OTHER":
                                wrapper_l = '"';
                                wrapper_r = '"';
                                break;
                            case "INTEGER":
                            case "DOUBLE":
                            case "LONG":
                            case "BOOLEAN":
                                break;
                            default:
                                throw ("Unknown type: " + iql["type"]);
                        }
                        retval = ` ${wrapper_l}${iql["name"]}${wrapper_r}`;
                    } else {
                        context.log("Operand is nonliteral");
                        retval = `c.${iql["name"]}`;
                    }
                    break;
                default:
                    context.log("Unknown class:", iqlclass);
                    throw ("** Unknown iql $class **: " + iqlclass);
            }
            return retval;
        }


        let responseMessage;
        try {
            const sql_statement = parse_iql_to_sql_try(context, iql);
            context.log("Generated SQL statement:", sql_statement);


            //DB endpoint and key
            const endpoint = process.env["COSMOSDB_ENDPOINT"];
            const key = process.env["COSMOSDB_PRIMARY_KEY"];
            const client = new CosmosClient({ endpoint, key });

            //DB details
            const databaseId = "Accounts-DB";
            const containerId = "Accounts";

            //DB details
            const { database } = await client.databases.createIfNotExists({ id: databaseId });
            const { container } = await database.containers.createIfNotExists({ id: containerId });


            const { resources } = await container.items.query(sql_statement).fetchAll();

            responseMessage = { "records": resources };


        } catch (error) {
            context.log('Error in Cosmos DB query:', error);
            responseMessage = { error: error.message };
        }


        return {
            jsonBody: responseMessage
        };
    }
});
