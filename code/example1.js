
// NOTE: Simple node app
console.log('hello world');

/**
 * NOTE: commandline arguments
 *
 * [ '/some/path/on/computer/node',
 *   '/some/other/path/to/file/example1.js' ]
 */
console.log(process.argv);


/**
 * NOTE: Environment context when running node application
 */
console.log(process.env);

// NOTE: Getting
const PORT = process.env.PORT || 4000; // INFO: sane default
console.log(PORT);
