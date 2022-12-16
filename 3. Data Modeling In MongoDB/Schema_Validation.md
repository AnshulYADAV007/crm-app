# Schema for MongoDB

Here is the schema for our `users` collection.
{
    $jsonSchema: {
        bsonType : "object",
        required: ["name"],
        properties: {
            name : {
                bsonType: "string",
                minLength: 2,
                maxLength: 50
            }
        }
    }
}

To create the users collection write the following command:
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType : "object",
            required: ["name"],
            properties: {
                name : {
                    bsonType: "string",
                    minLength: 2,
                    maxLength: 50
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                }
            }
        }      
    }
})


This schema means that the user must have a name which is string and of the length between 2 and 50. Also, there can be an email address in the json, which should agree with the regex.

# To Create a Validator of Existing Documents
There is a command called "collMod" which can be used to update the validator for an existing collection.