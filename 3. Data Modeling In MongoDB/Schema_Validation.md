# Two types of Data Models
1. Embedded data
userDoc: {
    username : "anshul",
    contact: {
        email : "anshul@gmail.com",
        phone: 9999955555
    }
    accessStatus: {
        level : 5,
        type : "dev"
    }
}
2. Reference data
Following document will be in user collection.
userDoc : {
    username: "anshul",
    userId : 23
} 
Contact collection.
contactDoc: {
    userId : 23,
    email : "anshul@gmail.com",
    phone: 9999955555
}
Access collection.
accesDoc: {
    userId : 23,
    level : 5,
    type : "dev"
}

- Reference will take longer time to get all the details for a particular user.
- Embedded will take longer time if you want to do analytics on contacts or access patterns.

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