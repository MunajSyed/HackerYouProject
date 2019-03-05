# Quiz

## Question 1

> Find the bug

```javascript
function Artist(name) {
  this.name = name;
}

Artist.prototype.paintings = [];
Artist.prototype.addWork = function addWork(painting) {
  this.paintings.push(painting);
}
Artist.prototype.listWorks = function listWorks() {
  console.log(this.paintings);
}

const vanGogh = new Artist('Vincent van Gogh');
vanGogh.addWork('Sorrow');
vanGogh.addWork('The Potato Eaters');
vanGogh.addWork('Sunflowers');
vanGogh.addWork('The Starry Night');

const picasso = new Artist('Pablo Picasso');
picasso.addWork('The Weeping Woman');
picasso.addWork('Mona Lisa');

vanGogh.listWorks();
picasso.listWorks();
```

## Solution 1
```javascript
function Artist(name) {
  this.name = name;
  /**
   * By adding the property here we give each Artist object
   * it's own `paintings` property, rather than sharing the
   * property in the prototype constructor.
   */
  this.paintings = [];
}

Artist.prototype.addWork = function addWork(painting) {
  this.paintings.push(painting);
}
Artist.prototype.listWorks = function listWorks() {
  console.log(this.paintings);
}

const vanGogh = new Artist('Vincent van Gogh');
vanGogh.addWork('Sorrow');
vanGogh.addWork('The Potato Eaters');
vanGogh.addWork('Sunflowers');
vanGogh.addWork('The Starry Night');

const picasso = new Artist('Pablo Picasso');
picasso.addWork('The Weeping Woman');
picasso.addWork('Mona Lisa');

vanGogh.listWorks();
picasso.listWorks();
```

## Question 2

> Convert into ES6 Class and extend a Person class

```javascript
function Artist(name) {
  this.name = name;
}

Artist.prototype.paintings = [];
Artist.prototype.addWork = function addWork(painting) {
  this.paintings.push(painting);
}
Artist.prototype.listWorks = function listWorks() {
  console.log(this.paintings);
}
```

## Solution 2
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Artist extends Person {
  constructor(name) {
    /**
     * We must call the `super` function with the
     * parameters we want to instanciate the class
     * which with we are extending from. `super`
     * is calling the `constructor` function of
     * the class we are extending.
     */
    super(name);
    this.paintings = [];
  }

  addWork(painting) {
    this.paintings.push(painting);
  }

  listWorks() {
    console.log(this.paintings);
  }
}
```
