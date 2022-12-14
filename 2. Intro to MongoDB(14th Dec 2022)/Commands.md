# Commands and Operations on MongoDB

## Outline

    - Database Operations
    - Collections Operations
    - CRUD Operations on Documents
    - _id/Objectid
    - Query and Projection Operations
    - GeoJSON

## Database Operations

> show dbs
> The above operation will show all the DB on our MongoDB server.

> use <db-name>
> This will switch to the db whose name you have used. If the db is not present,
> this operation will create a new db with the given name.

> db.dropDatabase()
> This operation is going to drop the current db.

## Collection Operations

> db.createCollection("<collection-name>")
> This operation will create a collection with the given name.

> db.myCollection.insertOne({"name" : "Aradhya"})
> This operation will insert a new document in the collection "myCollection".
> If this collection is not present in the db, mongodb will create a fresh collection with this name.

> show collections
> This will list all collections in the db.

> db.myCollection.drop()

## CRUD Document Operations

> db.myCollection.insertMany([<document-1>, <document-2>, ...])
> This inserts many documents in myCollection collection.

> db.myCollection.insertOne(<document>)
> This inserts a single document in the collection.

> db.myCollection.find(<filter>, <options>)
> This can read a bunch of documents from the collection.

> db.myCollection.deleteMany(<filter>, <options>)
> This will delete all the documents that match the filter.

> db.myCollection.updateMany(<filter>, <update>, <options>)
> This will perform the update on all the documents that match the filter.

There are also deleteOne and updateOne

Here are some operators you can use in filters and update:
$set : set a value for a field
$in : search for a value in a list of values
$lt : less than
and so on.

## GeoJSON

A typical GeoJSON field looks like:
<field> : {<type> : <GeoJSON type>, coordinates : <coordinates>}

{
"\_id": {
"$oid": "639a04633c1f9b7df56d8d86"
},
"name": "Likhith",
"address": {
"type": "Point",
"coordinates": [
17.708018,
83.302324
]
}
}

Before searching for nearby location you need to create an index using the GeoJSON field. Later you can do find using $near operator.
