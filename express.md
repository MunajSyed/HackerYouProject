# Express

### Exercise 1 - Simple Express App
```javascript
'use strict';

// 1. Require express package
const express = require('express');

// 2. Instantiate express "app"
const app = express();

// 3. Start application
app.listen(6000, () => {
  console.log('app running...');
});
```

```javascript
'use strict';

// 1. Require express package
const express = require('express');

// 2. Instantiate express "app"
const app = express();

// 3. Add simple GET handler
app.get('/', (req, res) => {
  res.send('hello world');
});

// 3. Start application
app.listen(6000, () => {
  console.log('app running...');
});
```

### Exercise 2 - Utilise the `res` object
```javascript
'use strict';

const express = require('express');
const app = express();

// 1. Send HTML
app.get('/html', (req, res) => {
  res.send('<h1>Hello World</h1><br /><h3>HTML Route<h3>');
});

// 2. Send JSON
app.get('/json', (req, res) => {
  res.json({ main: 'hello world', meta: 'JSON route' });
});

// 3. Send custom status code
app.get('/', (req, res) => {
  res.statusCode(418).send({
    data: "I'm a Teapot"
  });
});

app.listen(6000, () => {
  console.log('app running...');
});
```

### Exercise 3 - Utilise the `req` object
```javascript
'use strict';

const express = require('express');
const app = express();

// 1. req.query
app.get('/query', (req, res) => {
  const { completed } = req.query;

  res.json({ data: req.query });
});

// 2. req.params
app.get('/params/:id', (req, res) => {
  const { id } = req.params;

  res.json({ data: req.params });
});

// 3. req.method
app.get('/method', (req, res) => {
  res.json({ data: req.method });
});

// 4. req.path
app.get('/path', (req, res) => {
  res.json({ data: req.path });
});

app.listen(6000, () => {
  console.log('app running...');
});
```

### Exercise 4 - Router
```javascript
'use strict';

// 1. Require express package
const express = require('express');

// 2. Instantiate a router
const router = express.Router();

// 3. Instantiate expess "app"
const app = express();

// 4. Add route handlers
router.route('/')
  .get((req, res) => {

    // 4a. Respond with JSON data
    res.json({
      data: {
        path: req.path,
        method: req.method,
      }
    });
  })
  .post((req, res) => {
    // 4b. Response with JSON data
    res.json({
      data: {
        path: req.path,
        method: req.method,
        payload: req.body,
      }
    })
  });

// 5. Add router as middleware to "app"
app.use('/router', router);

app.listen(6000, () => {
  console.log('app running...');
});
```
