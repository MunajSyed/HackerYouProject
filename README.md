# Welcome to Full Stack Masterclass Notes!

## Table of Contents:
* Review
    * Intro to Full Stack
    * A JavaScript Refresher
    * React
* Introduction to Node and Express
    * Introduction to Backends and HTTP
    * Creating a backend with Node and Express
    * Communicating between React and Express
* Models, MongoDB, and Mongoose
    * Intro to MongoDB
    * Intro to Mongoose
    * Database Design
    * Mongoose Todo App Codealong
    * Mongoose/Relationships Blog Codealong
* Validation, Authorization, and Querying
    * Authentication
    * Querying with MongoDB and Mongoose
    * Validation with Mongoose
    * Front-end Validation
    * Authorization and Security
    * Front End Auth Codealong
* Routing, Advanced Models, and Deployment
    * Routing in React
    * Relationships between models in Mongoose
    * Modelling Relationships - Common Patterns
    * Deploying your Application
* Additional Resources

----

## Class Setup

### Code Editor
You can use any of the following code editors for this class:
- Atom
- Sublime
- Visual Studio Code

If you'd like to use a different editor, please run it by the instructor.

### Git & GitHub

You should have git installed on your computer and have an account registered with GitHub.
- If you don't have a GitHub account you should [register for one](https://github.com/join)
- To validate that `git` is installed on your computer open up a terminal and type `git --version`

### NodeJS

You should have `NodeJS` installed on your computer. To validate that you have `node` installed, run the following command: `node --version`. You should also validate that you have Node Package Manager (`npm`) installed as well but running `npm --version`.

> Note: we currently support node `v8.15.0` and npm `v6.2.0` and above

## Folder Organization
- Wherever you keep your sites, create a new folder called `{year}-{cohort}-fullstack`. Where `{cohort}` is `spring`, `summer`, `fall`, or `winter`.
- In `{year}-{cohort}-fullstack`, create a folder called `class-work`.
- Inside `class-work`, create 9 folders, `day{num}`, where `{num}` is the week number, like: `day1`, `day2`, etc.
- In `{year}-{cohort}-fullstack` type the command:
```bash
git clone --single-branch --branch project https://github.com/HackerYou/con-ed-full-stack-student-notes.git
```
- In `{year}-{cohort}-fullstack` type the command:
```bash
git clone https://github.com/HackerYou/con-ed-full-stack-student-notes.git material
```
- By the end, you should have something that looks like this:

```shell
{year}-{cohort}-fullstack/
├── material/
│   └── {clone-github-repo:master-branch}
├── class-work/
│   ├── day1/
│   ├── day2/
│   ├── day3/
│   ├── day4/
│   ├── day5/
│   ├── day6/
│   ├── day7/
│   ├── day8/
│   └── day9/
└── project/
    ├── {clone-github-repo:project-branch}
    └── project-proposal.md
```
