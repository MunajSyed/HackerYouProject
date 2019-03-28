# Database Design

## Group Exercise
1. List 3 Entities
2. List 3 Properties for each Entity
3. How do these Entities relate?

### Amazon
* Items
  * Name
  * Description
  * Price
  * Reviews (interesting)
  * Category

* Users
  * ID
  * Name
  * Email
  * Products (interesting)

* Reviews
  * Item (intesting)
  * User (intesting)
  * Votes

```javascript
const item = {
  name: 'Slippers',
  description: 'The Comfiest',
  price: '10.00',
  reviews: [
    { review things }
  ],
  category: 'footware',
};
```

### Twitter
* Users
  * Name
  * Tweets
  * Followers (interesting)
  * Following (interesting)
* Tweets
  * Users
  * Likes
  * Retweets
  * Replies
  * Message

* Lists
  * Tweets
  * Members (intesting)
  * Subscribers (interesting)

```javascript
const tweet = {
  users: [
    { user things }
  ],
  likes: 100,
  retweets: 100,
  replies: [
    { tweet things}
  ],
  message: 'animals are so cute!',
};
```

### Medium
* Articles
  * Title
  * Body
  * Author (intesting)
  * Claps

* Authors
  * Name
  * Email
  * Password
  * Avatar
  * Comments

* Comments
  * Message
  * Author
  * Article (interesting)

```javascript
const article = {
  title: 'Why JavaScript is awesome!',
  body: "info on why it's awesome",
  author: "Riley",
  claps: 100,
}
```

### GitHub
* Repositories
  * Name
  * Branches
  * Owners
  * Status
  * Commits
  * Contributors
  * Issues (interesting)

* Users
  * Username
  * ID
  * Password
  * Repositories (interesting)
  * Projects
  * Followers

* Pull Requests
  * Author
  * Reviewers (interesting)
  * Summary
  * Comments
  * Commits (interesting)
  * Status

* Issues
  * Author
  * Comments
  * Assignees
  * Labels

```javascript
const repository = {
  name: 'HackerYou',
  branches: [
    'master',
    'develop',
  ],
  owners: [
    { user things }
  ],
  status: '',
  commits: [
    { commit things }
  ],
  pullRequests: [
    { pull-request things }
  ]
  contributors: [
    { user things }
  ]
  issues: [
    { issue things }
  ]
}
```
