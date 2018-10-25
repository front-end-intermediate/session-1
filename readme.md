# I - JavaScript and DOM Manipulation

Today we begin introducing much of the JavaScript you will need for this semester - arrays, objects, template strings, and functions. We will be doing this in the context of DOM scripting. DOM is an acronym for Document Object Model.

Install [Visual Studio Code](https://code.visualstudio.com/) on your laptop now.

Install [Node.js](https://nodejs.org/en/) on your laptop now.

## Syllabus

[Syllabus](http://daniel.deverell.com/syllabii/_intermediate-syllabus.pdf)

## Homework

<!-- Review the notes below. Download and unzip the files as completed by me at the end of the class [here](http://daniel.deverell.com/intermediate/session-1.zip). 'cd' into the directory and run `npm install` and then `npm run start`. (Windows users may need to edit the script in `package.json` to read `"start": "browser-sync start --server \"app\" --files \"app\""` as noted below.) Follow the instructions that begin [here](https://github.com/front-end-intermediate/session-1#exercise---faking-it), to hijack one of the hashes and emulate a single page application for the Workbook link. -->

* Watch this video on Node and NPM: [Node.js Tutorial for Absolute Beginners](https://youtu.be/U8XF6AFGqlc) on YouTube
* Install [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your laptop
* Create a Github account

## VSCode

Install [Visual Studio Code](https://code.visualstudio.com/) on your laptop now.

In this class we will be using [Visual Studio Code](https://code.visualstudio.com/) as our editor. We will discuss its features as needed. For today we will take care of some basic configuration details.

In VSCode press `cmd + shift + p` and type in the word `shell`. Select `Install code command in PATH`

![Image of layout](other/images/vscode.png)

## The Command Line

In order to create websites you need to have a minimal set of terminal commands at your disposal.

Note: Windows users normally use Powershell (run as Administrator) but can try the Git Bash terminal that is installed along with Git when things go wrong. Some of the commands below may be different on Windows or have alternatives.

```sh
$ cd  // change directory
$ cd ~  // go to your home directory
$ cd <PATH>  // Mac: copy and paste the folder you want to go to
$ cd Desk  // tab completion
$ cd ..  // go up one level
$ ls  // list files, dir on a PC
$ ls -al  // list file with flags that expand the command
$ pwd  // print working directory
```

`cd` into today's working directory and type:

```sh
$ code .
```

## Node Package Manager

[Node Package Manager](https://www.npmjs.com) is an essential part of the web design and development ecosystem. [Node](https://nodejs.org/en/) includes NPM as part of its install.

Install [node.js](https://nodejs.org/en/) on your laptop now.

<!-- ## Node Package Manager (NPM) - Demo

NPM case study - A static site generator. (What is a [static site generator?](https://davidwalsh.name/introduction-static-site-generators)).

* [Wintersmith](https://github.com/jnordberg/wintersmith) - `git clone`, `npm install -g`
* [Markdown](https://en.wikipedia.org/wiki/Markdown)
* [Pug](https://www.npmjs.com/package/pug) is a [template processing language](https://en.wikipedia.org/wiki/Template_processor), it is one of [many](https://colorlib.com/wp/top-templating-engines-for-javascript/)
* [Article on pug](https://codeburst.io/getting-started-with-pug-template-engine-e49cfa291e33) (aka Jade)
* [Pug online demo](http://aramboyajyan.github.io/online-jade-template-editor/)
* [CoffeeScript](http://coffeescript.org) -->

## NPM Manifests

`cd` into today's working directory and type:

```sh
$ code .
```

Open the integrated terminal in VSCode (`View > Terminal`) with `ctrl + ~`

For our first foray into NPM we will install and use [Browser Sync](https://www.browsersync.io).

```sh
$ npm init -y
```

* `npm init -y` creates `package.json`

```sh
$ npm install browser-sync --save-dev
```

* `npm install browser-sync --save-dev` installs [Browser Sync](https://www.browsersync.io) into the `node_modules` folder. `--save-dev` adds the software to a list of development dependencies in `package.json`

```sh
touch .gitignore
```

`touch .gitignore` creates a `.gitignore` file. Edit it to include `node_modules` so Git does not track the `node_modules` folder.

### Editing package.json

* Browser Sync [Command Line (CLI) documentation](https://www.browsersync.io/docs/command-line)
* [Github Repo](https://github.com/BrowserSync/browser-sync)

Create the NPM script using the Browser Sync command line documentation:

```js
  "scripts": {
    "start": "browser-sync start --server 'app' --files 'app'"
  },
```

And run the process:

```sh
$ npm run start
```

![Image of layout](other/images/layout.png)

This will open `index.html` in your browser - examine the html and css in the inspector.

Note: Browser Sync has an interface running at port 3001: [http://localhost:3001](http://localhost:3001)

## DOM Scripting

DOM scripting is not really 'pure' JavaScript. It uses JavaScript - but only in the browser - and extends vanilla JavaScript functionality with a wide variety of custom methods. The HTML DOM (Document Object Model) allows JavaScript to access and manipulate the elements of an HTML document.

See the [Mozilla Developer's Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript) entry on JS and on [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) scripting.

### Getting elements in the DOM

Use document`.querySelectorAll()` to find all matching elements on a page. You can use any valid CSS selector.

```js
// Get all links in the nav
var elems = document.querySelectorAll('#main a');

// Get all paragraphs
var elemsPara = document.querySelectorAll('p');
```

Use `document.querySelector()` to find the first matching element on a page.

```js
// The first div
var elem = document.querySelector('div');

// The first link
var elemLink = document.querySelectorAll('#main a');

// The first div with a data attribute of main
var elem = document.querySelector('[data-headline="main"]');

// An element that doesn't exist
var elemNone = document.querySelector('.foo');
```

If an element isn’t found, `querySelector()` returns null. If you try to do something with the nonexistant element, an error will get thrown. You should check that a matching element was found before using it.

```js
// Verify element exists before doing anything with it
if (elemNone) {
    // Do something...
}
```

### Looping through items

In JavaScript, you use `for` to loop through array and node list items.

```js
var elems = document.querySelectorAll('#main a');

for (var i = 0; i < elems.length; i++) {
    console.log(i) // index
    console.log(elems[i]) // value
}
```

A `for...in` loop is a modified version of a `for` loop that you can use to loop through _objects_.

The first part, `key`, is a variable that gets assigned to the object key on each loop. The second part is the object to loop over.

We also want to check that the property belongs to this object, and isn’t inherited from further up the object chain (for nested or deep objects). `if (obj.hasOwnProperty(key))` handles that for us.

```js
var dinner = {
  // key: value
  main: 'pasta',
  appetizer: 'corn',
  drink: 'martini',
  desert: 'parfait',
  guests: 4,
  alcohol: true,
};

for (var key in dinner) {
  if (dinner.hasOwnProperty(key)) {
    console.log(key); // key
    console.log(dinner[key]); // value
  }
}
```

ES6 introduced a new `forEach()` method for looping over arrays.

You pass a callback function into `forEach()`. The first argument is the current item in the loop. The second is the current index in the array. You can name these two variables anything you want.

Unlike with a for loop, you can’t terminate the `forEach()` function before it’s completed. You can return to end the current loop, but you can’t call break.

```js
var pizzas = [
    'cheese',
    'ham',
    'chicken',
    'veg'
];

pizzas.forEach(function (pizza, index) {
    console.log(index) // index
    console.log(pizza) // value
});
```

The `Array.forEach()` method only works with arrays, not NodeLists (like those returned from `querySelectorAll())`. While there is a `NodeList.forEach()` method, it has poor browser support at this time.

You can convert NodeLists into Arrays with the `Array.from()` method and use `Array.forEach()` on that.

```js
Array.from(document.querySelectorAll('#main a')).forEach(function (item, index) {
    // Do something...
    console.log(item);
    console.log(index)
});
```

## EXERCISE - generated content from an array

Note the CSS for the links:

```css
nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
}

nav li {
    flex: 1;
    text-align: center;
}
```

We will replace the existing nav labels with items from an array using a `for loop`.

Examine the provided JS files. Note that they are added in index.html:

```html
<script src="js/navitems.js"></script>
```

In the console:

```js
> navItemsArray
> navItems
> typeof navItemsArray
> Array.isArray(navItemsArray)
```

Note the difference between `navItems` and `navItemsArray`. The latter contains a simple list of values while the former offers an array of objects consisting of key/value pairs.

JavaScript objects are containers for named values.

```js
var car = {type:"Fiat", model:"500", color:"white"}
```

Note that an Array is an object in JavaScript. Because an array is an object at its core you can add properties to it:

```js
var box = []
typeof box // an array is an object at its core 
Array.isArray(box) // test if the object is in fact an array
box['size'] = 9 // because an array is an object at its core you can add properties to it
box['size']  // returns 9
box.size // alternate syntax for box['size']
box[0] // undefined because there is no first item yet
box.push('test') // add an item
box[0] // returns test
box
```

Add to `myScripts.js`:

```js
console.log(navItemsArray[2])
console.log(navItemsArray.length)
```

* DOM Method [getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

```js
const nav = document.getElementById('main');
```

Alternatively we could use `querySelector()`.

* DOM Method [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

```js
const nav = document.querySelector('#main');
```

When you want to select multiple items use `querySelectorAll()`.

* DOM Method [querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll)

```js
const navList = document.querySelectorAll('#main li a');
```

It is common to use `element.querySelector` as opposed to `document.querySelector`:

```js
const nav = document.getElementById('main');
const navList = nav.querySelectorAll('li a');
```

Leave these two lines as the only items in your script block.

Compare `navList` and `navItemsArray` in the console and note the `prototypes` in the inspector. `navLIst` comes from our JavaScript `const navList = nav.querySelectorAll('li a');` while `navItemsArray` comes from '`navItems.js`. 

Both have a length property - `navList.length` and `navItemsArray.length`.

Note that we have 8 items in the `navItemsArray` but only 6 in our `navList`.

### Replace our placeholder nav items with content from an array

* use a `for` loop and `innerHTML`:

```js
// your scripts go here

const nav = document.getElementById('main');
const navList = nav.querySelectorAll('li a');

for (let i=0; i < navList.length; i++ ){
  console.log(i)
  navList[i].innerHTML = navItemsArray[i];
}
```

The innerHTML property can be used to both get and set HTML content in an element.

```js
var elem = document.querySelector(',site-wrap');

// Get HTML content
var html = elem.innerHTML;

// Set HTML content
elem.innerHTML = 'We can dynamically change the HTML to include HTML elements like <a href="#">this link</a>.';

// Add HTML to the end of an element's existing content
elem.innerHTML += ' Add this after what is already there.';

// Add HTML to the beginning of an element's existing content
elem.innerHTML = 'We can add this to the beginning. ' + elem.innerHTML;

// You can inject entire elements into other ones, too
elem.innerHTML += '<p>A new paragraph</p>';
```

Problem: we are using the existing `<li>` elements but there are 8 items in our `navItemsArray` array.

Solution: dynamically generate the nav from items in the array.

* depopulate the nav children

We could edit the HTML:

```html
<nav id="main"></nav>
```

Let's use JS to accomplish the same:

```js
nav.innerHTML = ''
```

Append a `<ul>` tag to nav using:

1. [document.createElement()](https://plainjs.com/javascript/manipulation/create-a-dom-element-51/) creates an element, e.g. `var div = document.createElement('div');`. 
2. [append](https://plainjs.com/javascript/manipulation/append-or-prepend-to-an-element-29/).

JavaScript offers a number of methods to determine the insertion point.

```js
// Create a new HTML element and add some text
var div = document.createElement('div');
div.textContent = 'Hello world';

// Get the element to add your new HTML element before, after, or within
const target = document.getElementById('main');

// Inject the `div` element before the `#app` element
target.before(div);

// Inject the `div` element after the `#app` element
target.after(div);

// Inject the `div` element before the first item *inside* the `#app` element
target.prepend(div);

// Inject the `div` element after the first item *inside* the `#app` element
target.append(div);
```

Let's empty the html content of our nav and append a new div:

```js
// your scripts go here

const nav = document.getElementById('main');

nav.innerHTML = '';

const navList = document.createElement('ul');
nav.append(navList);
```

Note the `<ul>` in the header.

* dynamically create the nav based on the number of items in the array using a for loop:

```js
for (let i=0; i < navItemsArray.length; i++ ){
  let listItem = document.createElement('li')
  let linkText = navItemsArray[i]
  listItem.innerHTML = '<a href="#">' + linkText + '</a>'
  navList.append(listItem)
}
```

E.g.:

```js
// your scripts go here

const nav = document.getElementById('main');

nav.innerHTML = '';

const navList = document.createElement('ul');

for (let i=0; i < navItemsArray.length; i++ ){
  let listItem = document.createElement('li')
  let linkText = navItemsArray[i]
  listItem.innerHTML = '<a href="#">' + linkText + '</a>'
  navList.append(listItem)
}

nav.append(navList);
```

Our nav bar now displays all the items in our array.

#### Aside - Template Strings (aka Template literals)

Note that we used single quotes in the construction of our innerHTML: `listItem.innerHTML = '<a href="#">' + linkText + '</a>'`. Compare old school concatenation and the variable 'sentence' below:

```js
const name = 'Yorik';
const age = 2;
const oldschool = 'My dog ' + name + ' is ' + age * 7 + 'years old.'
const sentence = `My dog ${name} is ${age * 7} years old.`;
console.log(sentence);
```

Note the use of tick marks instead of single quotes and that we have the ability to access variables and convert dog years to human years using JS inside the curly brackets.

#### Using [Template Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

Switch out the concatenation for a *template string*:

```js
listItem.innerHTML = `<a href="#">${linkText}</a>`
```

Since template strings accept JavaScript inside the curly braces we can further refactor to expand the use of JS:

```js
for (let i = 0; i < navItemsArray.length; i++) {
  let listItem = document.createElement('li')
  listItem.innerHTML = `<a href="#">${navItemsArray[i]}</a>`;
  navList.appendChild(listItem)
}
```

Note: template strings and `let` and `const` variables are ES6 (Ecmascript version 6). While they work on most newer browsers, they may not in older ones. For this reason it is common practice to convert the code to something more universally supported such as ES5 before publishing.

* Translate the code back to ES5 at [Babeljs.io](https://babeljs.io).

#### Aside: Objects

Open for reference: `other > javascript > _Objects > objects.html`

Examine the sample object in that file in the browser console:

```sh
> last
> me
> me.links
> me.links.social.twitter
```

Add to script block:

```js
const twitter = me.links.social.twitter
```

Create a multi-line template string and display it on the page:

```js
const content =
`
<div>
  <h2>
    ${me.first} ${me.last}
  </h2>
    <span>${me.job}</span>
    <p>Twitter: ${twitter}</p>
    <p>Blog: ${me.links.web.blog}</p>
</div>
`

document.body.innerHTML = content;
```

Note: this is what the above would look like without using template strings (courtesy of [Babel](https://babeljs.io)):

```js
var content = "\n<div>\n  <h2>\n    " + me.first + " " + me.last + "\n  </h2>\n    <span>" + me.job + "</span>\n    <p>Twitter: " + tw + "</p>\n    <p>Blog: " + me.links.web.blog + "</p>\n</div>\n";
```

#### Aside: Destructuring

Destructuring allows us to extract properties from objects and arrays. The curly brackets to the left of the equals sign below *do not* create an object. The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects.

Add the below to objects.html:

```js
// const first = me.first;
// const last = me.last;
const { first, last } = me;
```

Access these two variables in the console:

```sh
> first
> last
```

Instead of creating multiple variables (the commented out material above), we use destructuring syntax (the curly braces) to extract information and create multiple variables. This comes in handy:

* when the data you need to access is deeply nested in an object
* when accessing third party data where you might have a variable name clash

```js
const { twitter, facebook } = me.links.social;
```

When accessing third party data where you have a variable name clash (e.g., you already have a constant variable in use called blog but you want to access content from a database that also uses that name) you can avoid issues by destructuring and renaming:

```js
const { twitter:tw, facebook:fb } = me.links.social;
```

```js
const { blog:bg } = me.links.web;
```

Our `content` variable would then be written as:

```js
const content = `
<div class="person">
  <h2>
    ${first} ${last}
  </h2>
  <span>${me.job}</span>
  <p>Twitter: ${tw}</p>
  <p>Blog: ${bg}</p>
</div>
`
```

## EXERCISE - dynamic generation with an array of objects

In the previous portion of this exercise we worked with an simple array.

An array of objects is a very common data structure.

The links for our page are in `navitems.js` - in the navItems array:

```js
var navItems = [
{
  label: 'LOGO',
  link: '#'
},
{
  label: 'Watchlist',
  link: '#watchlist'
},
{
  label: 'Research',
  link: '#research'
},
{
  label: 'Markets',
  link: '#markets'
},
{
  label: 'Workbook',
  link: '#workbook'
},
{
  label: 'Connect',
  link: '#connect'
},
{
  label: 'Desktop',
  link: '#desktop'
},
{
  label: 'FAQ',
  link: '#faq'
}
];
```

Add the links using `navItems` instead of `navItemsArray`:

```js
for (let i =0; i < navItems.length; i++ ){
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${navItems[i].link}">${navItems[i].label}</a>`;
  navList.appendChild(listItem);
}
```

Navigate and nspect the code and note that, thanks to the multiple name / value pairs in navItems we now have anchor tags with page fragment links in our html and are able to navigate within our page.

Note the hash in the url location string.

### Array Methods

We'll use another method for developing our nav - using an Array method called `map`.

First let's look at another Array method - `filter` and arrow functions.

#### Array Methods: [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Uncomment the inventors sample data in `navitems.js`:

```js
const inventors = [
{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
{ first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
{ first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
{ first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
{ first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
{ first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
{ first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
];
```

Filter the list of inventors for those who were born in the 1500's

```js
const fifteen = inventors.filter (
  function(inventor){
    if (inventor.year >= 1500 && inventor.year <= 1599 ) {
      return true; // keep it
    }
});

console.table(fifteen);
```

[Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) have a number of features and are commonly used as a shorter syntax for anonymous functions. Much of the documentation you will read uses them.

Refactor using an arrow function with implicit return:

```js
const fifteen = inventors.filter(
  inventor => (inventor.year >= 1500 && inventor.year < 1600)
  )
```

#### Array Methods: [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

Provide an array of the inventors first and last names:

```js
var fullNames = inventors.map(
  function(inventor){
  return `${inventor.first} ${inventor.last}`;
});

console.log('Full names: ' + fullNames);
```

Notice the commas separating the names.

Refactored it to use an arrow function and join the results with a comma:

```js
const fullNames = inventors.map(
  inventor => `${inventor.first} ${inventor.last}`
  ).join(', ');

console.log('Full names: ' + fullNames);
```

Note the use of `join()` to add a space after the comma.

## EXERCISE - using [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to generate markup

An alternate method for creating the list items using map() and template strings:

```js
const markup = `
    <ul>
      ${navItems.map(
        function(navItem) {
          return `<li><a href="${navItem.link}">${navItem.label}</a></li>` }
        )}
    </ul>
    `;

console.log(markup)

nav.innerHTML = markup;
```

Join the array to avoid the comma:

```js
const markup = `
    <ul>
      ${navItems.map(
        function(navItem) {
          return `<li><a href="${navItem.link}">${navItem.label}</a></li>` }
        ).join('')}
    </ul>
    `;

nav.innerHTML = markup;
```

Refactor using an arrow function:

```js
// your scripts go here

const nav = document.getElementById('main');

nav.innerHTML = '';

const markup = `
<ul>
  ${navItems.map( navItem => `<li><a href="${navItem.link}">${navItem.label}</a></li>` ).join('')}
</ul>
`;

nav.innerHTML = markup;
```

## EXERCISE - Sticky Menu

Problem: the menu scrolls off the screen and we want to to be available at all times.

Solution: we will anchor the menu to the top of the screen once the user has scrolled to the point where the menu would normally be out of sight.

Note: this behavior can be managed without JavaScript using the css position property:

```css
#main {
  position: sticky;
  top: 0px;
}
```

I have elected not to do so because not only is it useful to understand position in JavaScript, but also because it is common to make other changes to the DOM contingent on other changes.

The DOM method [`offSetTop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop) allows us to get information about the position of an element relative to the top of the browser's window.

(See also [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) which returns much more information and is incredibly useful for all manner of positioning).

```js
let topOfNav = nav.offsetTop;
```

The DOM method - [addEventListener('event', function)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), see also [event types](https://developer.mozilla.org/en-US/docs/Web/Events) allows us to listen for an event in the browser and run a function when it occurs.

```js
window.addEventListener('scroll', fixNav);
```

Use [window.scrollY](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY) to get the number of pixels that the document is currently scrolled vertically:

```js
function fixNav() {
  console.log(topOfNav)
  console.log(window.scrollY)
}
```

When `topOfNav` is equal to `window.scrollY` we want to use CSS to make the menu stay at the top of the screen.

To do so we'll employ [classList](https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/):

```js
function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  }
}
```

And add the css for the `fixed-nav` class:

```css
body.fixed-nav nav {
  position: fixed;
  top: 0;
  box-shadow:0 5px 3px rgba(0,0,0,0.1);
  width: 100%;
  z-index: 1;
}
```

And test in the browser.

Add an `else` to our `if` statement to remove the sticky behavior when the banner image is showing.

```js
function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
  }
}
```

We added the class `fixed-nav` to the html body tag (as opposed to, say, the nav itself) so that we can use it to target other elements on the page which may not be children of the nav. Let's do this with the site-wrap.

```css
.site-wrap {
  max-width: 780px;
  margin: 40px auto;
  background:white;
  padding:40px;
  text-align: justify;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  /* add these two */
  transform: scale(0.98);
  transition: transform 0.5s;
}
```

```css
body.fixed-nav .site-wrap {
  transform: scale(1);
}
```

When the nav gets position fixed it no longer takes up space in the window so the content beneath it jumps upward (reflows).

Take care of this jump using `offsetHeight` to add an amount of padding equal to the height of the nav to the body element.

```js
function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
```

Note `paddingTop` (camel case) - I used Javascript for this because the height of the nav bar (`offSetHeight`) could vary. Otherwise I would have used the CSS file. Always try to use CSS instead of Javascript wherever possible.

## EXERCISE - Adding the SVG Image

```js
const logo = document.querySelector('#main ul li');
logo.classList.add('logo');
logo.firstChild.innerHTML = '<img src="img/logo.svg" />';
```

* Examine the SVG file
* some interesting applications of SVG:

[Responsive logos](http://responsivelogos.co.uk)
[Background generator](http://www.svgeneration.com/recipes/Beam-Center/)

Format the logo and create the sliding logo behavior. Note: CSS only, no JavaScript:

```css
li.logo img {
  padding-top: 0.25rem;
  width: 2.5rem;
}

li.logo {
  max-width:0;
  overflow: hidden;
  background: white;
  transition: all 0.5s;
  font-weight: 600;
  font-size: 30px;
}

.fixed-nav li.logo {
  max-width:500px;
}
```

(Note the use of max-width above. We are using this because transitions do not animate width.)

## EXERCISE - Faking It

Note the use of hashes in the navigation:

`<a href="#watchlist">Watchlist</a>`

These allow us to navigate (`index.html#research`) to sections of the document marked up with the corresponding id:

`<p id="watchlist">`

Note that clicking on an hashed link doesn't refresh the page. This makes hashes an important feature for creating Single Page Applications (SPAs) - they are used to load different content via AJAX from a server with no page refresh.

We'll set up our page emulate a single page application.

Run `window.location` in the console.

Sample of a page fragment redirect using `setTimeout()`:

```js
window.onload = function(){
  window.location.hash = '#'
  setTimeout( () => window.location.hash = '#watchlist' , 1500)
}
```

Delete the code above.

```js
const navTest = document.querySelectorAll('#main ul li a');
for (let i=0; i<navTest.length; i++){
  console.log('hash ', navTest[i].hash);
}
```

Add an event listener to the links in the nav:

```js
const navTest = document.querySelectorAll('#main ul li a');
for (let i=0; i<navTest.length; i++){
  navTest[i].addEventListener('click', prepContent)
}

function prepContent(e){
  if (this.hash == "#workbook"){
    e.preventDefault();
  }
}
```

We have hijacked the normal functioning on the workbook link.

Let's use the fakeContent provided in our sample data file for the content of a new variable `siteWrap`. Update the script above to:

1. create a reference to `site-wrap`
1. access fake header and content from the `navitems.js` array
1. use `innerHTML` to apply that content to the document

```js
const sitewrap = document.querySelector('.site-wrap');
const navTest = document.querySelectorAll('#main ul li a');
for (let i=0; i<navTest.length; i++){
  navTest[i].addEventListener('click', prepContent)
}

function prepContent(e){
  if (this.hash == "#workbook"){
    const header = fakeContent[0].header;
    const content = fakeContent[0].content;
    sitewrap.innerHTML = `
      <h2>${header}</h2>
      <p>${content}</p>
    `;
    e.preventDefault();
  }
}
```

### Notes

[vh and vw in CSS](https://css-tricks.com/viewport-sized-typography/)

Flexbox can be quite difficult to master. You could do worse than checking out:

* Free Code Camp's [article on Medium.com](https://medium.freecodecamp.com/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af#.usjz1l93w), or

* A simple guide to the various CSS properties on [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

`<img src="other/hero-1.png">`

[Use a system font instead of a custom font?](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/) [In SVG?](https://css-tricks.com/system-fonts-svg/)

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
```

```css
.site-nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.site-nav li {
  width: 100px;
  height: 100px;
  background-color: #8cacea;
  margin: 8px;
}
```

```css
.account-dropdown ul {
  display: none;
}

.site-header {
  background: #0D1313;
  color: white;
  display: flex;
  align-items: center;
  padding:0.5rem;
}

.logo {
  text-decoration: none;
  color: white;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 10px;
}

a {
  text-transform: uppercase;
  text-decoration: none;
  color: #CDD0D0;
  padding: 20px;
  display: inline-block;
}

.active a {
  font-weight: bold;
  color: #62DEBE;
  background: darken(#62DEBE, 40%);
}

.account-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.sign-out-link {
  color: #62DEBE;
  font-size: 0.8rem;
  margin-left: 10px;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .site-header {
    flex-wrap: wrap;
  }
  .site-nav {
    order: 2;
    background: #333;
    width: 100%;
  }
}
```

[Font Awesome](http://fontawesome.io/)

```html
<link rel="stylesheet" href="font-awesome-4.6.3/css/font-awesome.min.css">

<i class="fa fa-bullseye fa-3x"></i>

<i class="fa fa-gear"></i>

```

Comment out the contents of the ul:

```html
<nav class="site-nav">
  <ul>
    <!-- <li class="active"><a href="#0">Recipes</a></li>
    <li><a href="#0">Reviews</a></li>
    <li><a href="#0">Delivery</a></li> -->
  </ul>
</nav>
```

```html
<div class="site-wrap">
  <h4>Homework</h4>

  <p>The items below all come from today's work on the Basic DOM scripting page. You should attempt each one if possible.</p>

  <ol>
    <li>Create an object with a new set of labels and links for the site-nav li's above and use the JavaScript techniques we covered today to dynamically generate the nav menu</li>

    <li>Use classList to assign the active class to a link when clicked (be sure to remove it from the previously highlighted link as well)</li>

    <li>Add some paragraphs to the page and make the navigation sticky</li>
  </ol>

  <p>Post your efforts to the class Slack Channel and a web server (if you don't have I can provide)</p>
</div>
```

##### ALT loader

```js
function loadDoc1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(“textbox”).innerHTML =
      this.responseText;
    }
  };
  xhttp.open(“GET”, “texts/latestnews.html”, true);
  xhttp.send();
}
```

```html
<nav>
  <ul class=“nav”>
    <li class=“latestnews”><a href=“#” onclick=“loadDoc1()“>LATEST NEWS</a></li>
    <li class=“eswnyc”><a href=“#” onclick=“loadDoc2()“>ESW-NYC</a></li>
    <li class=“team”><a href=“#” onclick=“loadDoc3()“>TEAM</a></li>
    <li class=“projects”><a href=“#” onclick=“loadDoc4()“>PROJECTS</a></li>
    <li class=“contactus”><a href=“#” onclick=“loadDoc5()“>CONTACT US</a></li>
    <li class=“participate”><a href=“#” onclick=“loadDoc6()“>PARTICIPATE</a></li>
    <li class=“donate”><a href=“#” onclick=“loadDoc7();“>DONATE</a></li>
  </ul>
</nav>

```


petitagneaunoir@gmail.com, yumi.ishizuka@gmail.com, paul@instoresnowhere.com, clj260@nyu.edu, am4970@nyu.edu, pavitranew@gmail.com, brs358@nyu.edu