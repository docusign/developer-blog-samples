/* Type definitions for the data IO extension are based on the Concerto data modeling language. 
Given a list of types, the third-party system must return a list of Concerto declarations representing the properties of each type. 
Your app proxy should initially fetch the schemas associated with these types and then convert them into Concerto’s metamodel JSON format. 
This enables Docusign to interpret your chosen system’s types consistently. */

const { app } = require('@azure/functions');

app.http('GetTypeDefinitions', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log('JavaScript HTTP trigger function processed a request.');
        const body = await req.json();

        const typeNames = body && body.typeNames;
        const declarations = [];
        const errors = [];


        const errorCodes = {
            SCHEMA_RETRIEVAL_FAILED: 1
        };


        if (typeNames && Array.isArray(typeNames)) {
            //loop through all the tables
            typeNames.forEach(typeName => {
                //construct the response schema for your table
                //each field is configured as C R U or a combination of these
                if (typeName === "Accounts") {
                    declarations.push({
                        "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
                        "name": "Accounts",
                        "isAbstract": false,
                        "decorators": [
                            {
                                "$class": "concerto.metamodel@1.0.0.Decorator",
                                "name": "Term",
                                "arguments": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                        "value": "Account details"
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.Decorator",
                                "name": "Crud",
                                "arguments": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                        "value": "Createable,Readable,Updateable" // CRU for the table
                                    }
                                ]
                            }
                        ],
                        "identified": {
                            "$class": "concerto.metamodel@1.0.0.IdentifiedBy",
                            "name": "id"
                        },
                        "properties": [
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "id",
                                "isOptional": false,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "ID"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.IntegerProperty",
                                "name": "account_id",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Account ID"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Readable" //CRU config for each field to be defined like this, marked only as readble for this field
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "account_type",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Account Type"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable,Updateable"
                                            }
                                        ]
                                    }
                                ],
                                "lengthValidator": {
                                    "$class": "concerto.metamodel@1.0.0.StringLengthValidator",
                                    "maxLength": 50
                                }
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "account_holder_name",
                                "isOptional": false,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Account Holder Name"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable,Updateable"
                                            }
                                        ]
                                    }
                                ],
                                "lengthValidator": {
                                    "$class": "concerto.metamodel@1.0.0.StringLengthValidator",
                                    "maxLength": 50
                                }
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "account_holder_email",
                                "isOptional": false,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Account Holder Email"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable"
                                            }
                                        ]
                                    }
                                ],
                                "lengthValidator": {
                                    "$class": "concerto.metamodel@1.0.0.StringLengthValidator",
                                    "maxLength": 250
                                }
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "phone",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Phone Number"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable,Updateable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "date_of_birth",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Date of Birth"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "secondary_card_holder_name",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Secondary Card Holder Name"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable,Updateable"
                                            }
                                        ]
                                    }
                                ],
                                "lengthValidator": {
                                    "$class": "concerto.metamodel@1.0.0.StringLengthValidator",
                                    "maxLength": 250
                                }
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.StringProperty",
                                "name": "secondary_card_holder_email",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Secondary Card Holder Email"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable,Readable,Updateable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.DoubleProperty",
                                "name": "secondary_card_holder_date_of_birth",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Secondary Card Holder Date of Birth"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.DoubleProperty",
                                "name": "employement_status",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Employment Status"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.DoubleProperty",
                                "name": "employer",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Employer"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.DoubleProperty",
                                "name": "occupation",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Occupation"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "$class": "concerto.metamodel@1.0.0.DoubleProperty",
                                "name": "annual_income",
                                "isOptional": true,
                                "isArray": false,
                                "decorators": [
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Term",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Annual Income"
                                            }
                                        ]
                                    },
                                    {
                                        "$class": "concerto.metamodel@1.0.0.Decorator",
                                        "name": "Crud",
                                        "arguments": [
                                            {
                                                "$class": "concerto.metamodel@1.0.0.DecoratorString",
                                                "value": "Createable"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    });
                } else {
                    errors.push({
                        code: errorCodes.SCHEMA_RETRIEVAL_FAILED,
                        message: `Schema for type name ${typeName} not found`
                    });
                }
            });


            return {
                jsonBody: {
                    declarations,
                    errors
                }
            };
        } else {
            return {
                status: 400,
                jsonBody: {
                    error: "Invalid request. 'typeNames' must be an array."
                }
            };
        }
    }
});


