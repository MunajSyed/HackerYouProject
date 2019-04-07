# Handling JWT's

## JWT Generation (API)

> `npm install jsonwebtoken`

```javascript
// api/utils/tokenService.js
const jwt = require('jsonwebtoken');
const { SECRET } = require('./constants');

exports.create = (user) => {
  const { _id: id } = user;

  const payload = {
    user: {
      id,
    },
  };

  return jwt.sign(payload, SECRET);
};
```

```javascript
// api/routes/users/userRoutes.js
const tokenService = require('../../utils/tokenService');

// ...

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
          const token = tokenService.create(user);
          res.json({
            data: [token],
          });
        } else {
          next(new Error('unauthorized'));
        }
      }
    } catch (e) {
      next(e);
    }
  });
```

## JWT Validation (API)

```javascript
// api/utils/tokenService.js
const jwt = require('jsonwebtoken');
const { SECRET } = require('./constants');

exports.create = (user) => {
  const { _id: id } = user;

  const payload = {
    user: {
      id,
    },
  };

  return jwt.sign(payload, SECRET);
};

exports.verify = (token) => {
  return jwt.verify(token, SECRET);
};
```

```javascript
// api/routes/users/userRoutes.js
const tokenService = require('../../utils/tokenService');
const { model: UserModel } = require('./userModel');
// ...

router
  .route('/me')
  .get(async (req, res, next) => {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        next(new Error('invalid request'));
      } else {
        const [prefix, token] = authHeader.split(' ');
        const decoded = tokenService.verify(token);
        if (decoded) {
          const { user: { id } } = decoded;
          const user = await UserModel.findById(id);
          if (user) {
            res.json({
              data: [user],
            });
          } else {
            next(new Error('unauthorized'));
          }
        }
      }
    } catch (e) {
      next(e);
    }
  });
```

## JWT Validation Middleware

```javascript
// api/middleware/auth.js
const tokenService = require('../utils/tokenService');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(new Error('invalid request'));
  } else {
    const [prefix, token] = authHeader.split(' ');
    try {
      const decoded = tokenService.verify(token);
      req.token = decoded;
      next();
    } else {
      next(new Error('unauthorized'));
    }
  }
};
```

```javascript
// api/routes/users/userRoutes.js
const authentication = require('../../middleware/auth');
const { model: UserModel } = require('./userModel');

// ...

router
  .route('/me')
  .get(authentication, async (req, res, next) => {
    try {
      if (!req.token) {
        next(new Error('unauthorized'));
      } else {
        const user = await UserModel.findById(req.token.user.id);
        if (!user) {
          next(new Error('unauthorized'));
        } else {
          res.json({
            data: [user],
          });
        }
      }
    } catch (e) {
      next(e);
    }
  });
```
