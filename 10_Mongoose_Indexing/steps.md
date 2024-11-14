Step 1: Open mongodb and write these queries to insert 3000 records in movies collection
>> use enterpriseLogin
_______________________________________________________

Step 2: Replace the data with the samplesData.json contents and paste it as it is. (samplesData.json is located in the beginning of the repo)
>> db.movies.insertMany(data)
_______________________________________________________

Step 3: Now try running the API and note down the response time which is printed in console.

My response: 
>> default: 21.92ms
_______________________________________________________

Step 4: Now add index in mongodb by running this query.
>> db.movies.createIndex({"Title":-1})

Note: You can view if the index was created successfully by running this query
>> db.movies.getIndexes()
_______________________________________________________

Step 5: Now try hitting the API. You will the significant decrease in API response time.

My response:
>> default: 5.263ms

Note: You can also delete the index to recheck if it's true by running this query.
>> db.movies.dropIndex('Title_-1')


>> ![Performance-Indexing](https://github.com/user-attachments/assets/e2b9cc4a-d5c6-4051-af38-84fb19375247)
