# Node Environment

## Environment Differences
  - `window` vs `global`

```javascript
// Browser
console.log(window); // Our global "object"

// Node
console.log(global); // Our global "object"
```

> Similarities

```javascript
// Global Constructors
console.log(Object);
console.log(Array);
console.log(String);
console.log(Number);

// Global Objects
console.log(console);
```

> Differences

```javascript
// Global Objects
console.log(console);
console.log(require);
console.log(process);
console.log(module);

// Runtime Libraries
const path = require('path'); // CommonJS import
const fileSystem = require('fs');
const http = require('http');
```

## In Class Work
- Command line work
  - `node example1.js`
  ```javascript
    console.log('hello world');
  ```
  ```javascript
    console.log('hello world');
    console.log(process.argv);
  ```
  - `node example1.js your-first-name`
  ```javascript
    console.log(process.argv);

    // Output
    $ [ '/some/path/to/node',
        '/some/path/to/file/example1.js',
        'your-first-name' ]
  ```
  - `PORT=3000 node example1.js`

  > (Caveat: only works on macOS or windows subsystem (win10))

  ```javascript
    console.log(process.env.PORT) // PORT = 3000
  ```
  - Set sane default value
  ```javascript
    const PORT = process.env.PORT || 3000
  ```

- Created a module `calc.js`
  - Used `process.argv[x]` to get commandline params
  ```javascript
    /**
     * NOTE: we start a position 2 to skip the
             first two items in the array
     */
    const a = process.argv[2];
    const b = process.argv[3];

    // Input
    $ node calc.js 3 2
  ```
  - Created `add` function
  ```javascript
    const a = process.argv[2];
    const b = process.argv[3];
    const add = (a, b) => a + b;
  ```
  - Created `subtract` function
  ```javascript
    const a = process.argv[2];
    const b = process.argv[3];
    const subtract = (a, b) => a - b;
  ```
  - Switched on `operator`
  ```javascript
    const a = process.argv[2];
    const b = process.argv[3];
    const operator = process.argv[4];
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;

    switch (operator) {
      case '+': {
        console.log(add(a, b));
        break;
      }
      case '-': {
        console.log(subtract(a, b));
        break;
      }
    }
  ```
  - Exported functions (created `main.js`)
  ```javascript
    module.exports = add = (a, b) => a + b;
    module.exports = subtract = (a, b) => a - b;

    // OR

    module.exports = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
    };
  ```
  - Used exported functions in `main.js`
  ```javascript
    const calc = require('./calc');

    const a = process.argv[2];
    const b = process.argv[3];
    const operator = process.argv[4];

    switch (operator) {
      case '+': {
        console.log(calc.add(a, b));
        break;
      }
      case '-': {
        console.log(calc.subtract(a, b));
        break;
      }
    }
  ```
  - Created module with other module (`sentencer`)
  ```javascript
    // myModule.js
    const sentencer = require('sentencer');

    const phrase = 'The {{ adjective }} brown {{ noun }} jumped over the {{ adjective }} {{ noun }}';

    exports.generateSentence = () => sentencer.make(phrase);
  ```
  - Used new module in `main.js`
  ```javascript
    const myModule = require('./myModule');

    console.log(myModule.generateSentence);
  ```
  - Spoke about runtime libraries (`require('os')`)
  ```javascript
    const os = require('os');
    // https://nodejs.org/docs/latest/api/
  ```
