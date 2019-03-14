'use strict';

const express = require('express');
const app = express();

// const options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html'],
//   index: ['index.htm'],
//   maxAge: '1d',
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now())
//   }
// };

// app.use('/', express.static('public', options));
app.use('/', express.static('public'));

app.listen(5000, () => {
  console.log('Ex6 is running...');
});
