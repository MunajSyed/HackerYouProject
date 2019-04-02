'use strict';

const mongoose = require('mongoose');

const { model: userModel } = require('./models/userModel');
const { model: postModel } = require('./models/postModel');
const { model: commentModel } = require('./models/commentModel');

async function seed () {
  // Truncate the User collection
  await userModel.remove();
  // Truncate the Post collection
  await postModel.remove();
  // Truncate the Comment collection
  await commentModel.remove();

  const usersData = [
    { firstName: 'Michael', lastName: 'Perrotte' },
    { firstName: 'Riley', lastName: 'Reed' },
    { firstName: 'Joanna', lastName: 'Smith' },
  ];

  const userPromises = usersData.map(async (userData) => {
    const user = new userModel(userData);
    const userDoc = await user.save();
    return userDoc;
  });

  const users = await Promise.all(userPromises); // FOR REASONS;

  const commentsData = [
    { body: "You're so great!", user: users[0] },
  ];

  const commentPromises = commentsData.map(async (commentData) => {
    const comment = new commentModel(commentData);
    const commentDoc = await comment.save();
    return commentDoc;
  });

  const comments = await Promise.all(commentPromises); // FOR REASONS;

  const postsData = [
    {
      body: "HackerYou Students are the best students",
      user: users[0],
      comments,
    }
  ];

  const post = new postModel(postsData[0]);
  const postDoc = await post.save();
  console.log('Seeding complete.');
}

const url = 'mongodb://localhost:27017/blog';

mongoose.connect(url, { useNewUrlParser: true })
  .then(async () => {
    console.log(`Connect to server: ${url}`);
    await seed();
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

  /// EXAMPLE
const express = require('express');
const router = express();

mongoose.connect(url, { useNewUrlParser: true })
  .then(async () => {
    console.log(`Connect to server: ${url}`);
    await seed();

    router.listen(4000, () => {
      console.log('API serving traffic');
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
