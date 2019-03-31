# Mongoose

## Why Do We Need This Tool?
Mongoose acts as the interface between our express app and the database; uour **Database Access Layer (DAL)**. Out of the box, MongoDB doesn't enforce any structure on your documents and it doesn't give us tools to relate documents to each other.

## What Is A Model?
Simply a model is an **Entity**. A model is the interface we use to interact with each collection. You can think of it as the _class definition_ in object oriented programming, or a _recipe_ in terms of baking. It doubles as the destription of the **entity** as well as the access point for the collection.

```javascript
const Model = require('./ModelFile');

// Create a new instance (document/row)
const instance = new Model();

// Read instances (documents/rows)
Model.findById()

// Use an instance to interact with a "document/row" level
intance.update();

// Use `Model` too interact with the "collection/table" level
Model.find();
// SELECT * FROM Model;

Model.count();
// SELECT count(*) FROM Model;

Model.remove();
// DELETE FROM Model;
```

## Connecting To A Database
```javascript
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/hogwarts';

mongoose
  .connect(uri)
  .then(() => {
    console.log(`Successfully connected to: ${uri}`);
  })
  .catch(err => console.log(err.message));
```

## Schema
- [docs](https://mongoosejs.com/docs/guide.html)

```javascript
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  author: String,
  body:   String,
  comments: [
    {
      body: String,
      date: Date,
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

```

#### Connecting Schema To Collection
```javascript
// ...
const Blog = mongoose.model('Blog', blogSchema);
```

#### Model Instances
```javascript
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema
const animalSchema = new Schema({ name: String, kind: String });

// Connect schema to collection
const Animal = mongoose.model('Animal', animalSchema);

// Create an instance of animalSchema
const dogRex = new Animal({ name: 'rex', kind: 'dog' });
```

## Task 1
Use mongoose to create a new schema and add some documents.
> Leverage the database design class exercise

#### Instance Level Helper Methods
```javascript
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  genre: String,
  // ...
})

// No arrow functions allowed because we want access to `this`
movieSchema.method('findMatchingGenre', function () {
  return this.model('Movies').find({ genre: { $regex: this.genre } });
});
```

#### Nested Schemas
```javascript
// user.js
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = exports.schema = new Schema({
  firstName: String,
  lastName: String,
});

exports.model = mongoose.model('Users', userSchema);
```

```javascript
// post.js
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: commentSchema } = require('./comments');

const postSchema = exports.schema = new Schema({
  title: String,
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [commentSchema],
});

exports.model = mongoose.model('Posts', postSchema);
```

```javascript
// comment.js
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = exports.schema = new Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

exports.model = mongoose.model('Comments', commentSchema);
```
