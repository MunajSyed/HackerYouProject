# Password Hashing

## Example API - Password Hashing

### Standard (Create) Resource - User
```javascript
// api/routes/userModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = exports.schema = new Schema({
  email: {
    type: String,
    unique: true, // prevents multiple signups with the same email
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

exports.model = mongoose.model('User', userSchema);
```

```javascript
// api/routes/users/userRoutes.js
const express = require('express');
const router = express.Router();

const { model: UserModel } = require('./userModel');

// POST /api/users/
router
  .route('/')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = new UserModel({ email, password });
      const doc = await user.save();
      res.status(201).json({
        data: [doc],
      });
    } catch (e) {
      next(e);
    }
  });

exports.router = router;
```

```javascript
// api/server.js

// ...
const { router: userRoutes } = require('./users/userRoutes');
app.use('/api/users', userRoutes);
// ...
```

### Create `/login` Route

#### Update `userRoutes.js` With `/login` Route
```javascript
// api/routes/users/userRoutes.js
const express = require('express');
const router = express.Router();

const { model: UserModel } = require('./userModel');

// POST /api/users/
router
  .route('/')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = new UserModel({ email, password });
      const doc = await user.save();
      res.status(201).json({
        data: [doc],
      });
    } catch (e) {
      next(e);
    }
  });

// POST /api/users/login/
router
  .route('/login')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user && user.password === password) {
        res.json({
          data: [user],
        });
      } else {
        next(new Error('unauthorized'));
      }
    } catch (e) {
      next(e);
    }
  });

exports.router = router;
```

```javascript
const express = require('express');
const router = express.Router();

const { model: UserModel } = require('./userModel');
```

#### Add Password Hashing

> `npm install bcryptjs`

##### Update `api/users/userModel.js`
1. Add middleware to handle `.save()` hook (hashing)
2. Add instance method to handle password comparing

> https://mongoosejs.com/docs/middleware.html#pre

```javascript
// api/routes/userModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = exports.schema = new Schema({
  email: {
    type: String,
    unique: true, // prevents multiple signups with the same email
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModifed('password') || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      return next();
    } catch (e) {
      return next(e);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

exports.model = mongoose.model('User', userSchema);
```

##### Update `api/users/userRoutes.js`
1. Use instance method to compare incoming password with hash

```javascript
// api/routes/users/userRoutes.js
const express = require('express');
const router = express.Router();

const { model: UserModel } = require('./userModel');

// POST /api/users/
router
  .route('/')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = new UserModel({ email, password });
      const doc = await user.save();
      res.status(201).json({
        data: [doc],
      });
    } catch (e) {
      next(e);
    }
  });

// POST /api/users/login/
router
  .route('/login')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
          next(new Error('not found'));
      } else {
        const match = await user.comparePassword(password);

        if (match) {
          res.json({
            data: [user],
          });
        } else {
          next(new Error('unauthorized'));
        }
      }
    } catch (e) {
      next(e);
    }
  });

exports.router = router;
```
