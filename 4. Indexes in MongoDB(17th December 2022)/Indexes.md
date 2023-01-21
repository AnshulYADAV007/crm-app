# Create a collection
Let's create a collection with 1 million documents.

for(let i = 0; i < 1000000; ++i) {
    var user = {
        userId : i,
        username : "user" + "_" + i,
        age : Math.floor(Math.random() * 100),
        createdAt: new Date(),
        modifiedAt: new Date(),
        countOfFriends: Math.floor(Math.random() * 500),
        numberOfPosts: Math.floor(Math.random() * 2000) 
    };
    db.users.insertOne(user);
}

# Create an Index

db.users.createIndex({userId: 1})
This will create an index for userId.

# Explain function
When you append .explain("executionStats") at the end of a query, I can get the runtime details of the query.

# Query Patterns
- Equality Query
    - db.users.find({userId: 250})
    - Here we search for exact values.
- Range Query
    - db.users.find({age : {"$gt": 18, "$lt": 23}})
    - Here we search for values in a range.
- Multi-value query with sorted results.
    - db.users.find({age : {"$gt": 18, "$lt": 23}}).sort({age : 1})
    - Here we sort the result in ascending order of age.

# Compound Index
- To create a compound index run the following command:
    - db.users.createIndex({age : 1, numberOfPosts : 1})
    - 1 = ascending, -1 = descending
- db.users.find({age : {"$gt" : 19}, numberOfPosts: {"$gt": 100}}).sort({age : 1})

# Multi-key Indexes
- Arrays or strings
- user : {
    userId : 1,
    username : "Anshul",
    tweet: "I like coding in js",
    hashtags : ["coding", "js", "web-dev"]    
}
- db.users.createIndex({hashtags: 1})
    - This will create an index for hashtags.
- db.users.find({hashtags : "js"})

# Text Index
- db.users.createIndex({tweet: "text"})
- This will create a text index and you can do text search in these indexes.
- db.users.find({tweet : {$text : {$search : "js"}}})

