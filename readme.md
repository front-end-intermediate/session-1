#Session One

##Homework - TBD

1. Complete the navbar exercise as outlined in class (in flex-nav)
1. Log into the class Slack account and say hi.
1. Bring your laptop to the next class. 
1. Create a Github account
1. Download Sublime text and install [Package Manager](https://packagecontrol.io/installation), our Cobalt 2 theme and Emmet
1. Install [node.js](https://nodejs.org/en/) and [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your laptop.


##Text Books (part one)

Mat Marquis - [JavaScript for Web Designers](https://abookapart.com/products/javascript-for-web-designers)

Ethan Marcotte - [Responsive Web Design](https://abookapart.com/products/responsive-web-design)

Dan Cederholm - [SASS for Web Designers](https://abookapart.com/products/sass-for-web-designers)

David Demaree - [GIT For Humans](https://abookapart.com/products/git-for-humans)

[Syllabus](http://mean.deverell.com/syllabus/)


##Text Editor - [Sublime Text](http://www.sublimetext.com)

Packages - Sublime [Package Manager](https://packagecontrol.io/installation)

####Cobalt

1. Open package control Tools → Command Palette and type Install Package
2. Search for Cobalt2 and hit enter
3. Open Preferences → Settings - User. Add the following lines (only the first two are required): 

```json
"color_scheme": "Packages/Theme - Cobalt2/cobalt2.tmTheme",
"theme": "Cobalt2.sublime-theme",   
"highlight_line": true,
"indent_guide_options": [ "draw_normal", "draw_active" ],
"highlight_modified_tabs": true,
"line_padding_bottom": 1,
"line_padding_top": 1,
"wide_caret": true,
"caret_extra_bottom": 2,
"caret_extra_top": 2,
"caret_extra_width": 3,
"caret_style": "phase",
"bold_folder_labels": true,
```

4. Restart Sublime for the Theme to be fully applied.

####Emmet

1. Open package control Tools → Command Palette and type Install Package
2. Search for Emmet and hit enter


####Variables

basic-DOM > index.html

```
var width = 100;
let height = 200;
const testString = '123456';
```

* var - can be redeclared and reassigned

* var - is function scoped:

```js
function setWidth(){
  var width = 500;
  console.log('inner ' + width);
}
setWidth();
console.log(width);
```

Install Sublime [ConsoleWrap addon](https://packagecontrol.io/packages/Console%20Wrap%20for%20js)

* var - can 'leak' when its not inside a function:

```js
if ( width > 12 ) {
  var someMultiple = 4;
  var result = width * someMultiple;
  console.log(width + ' times ' + someMultiple + ' equals ' + result)
}
console.log(someMultiple);
```

Here, both someMultiple and result 'leak' outside the block.

* let and const are scoped to the block (function and otherwise - anywhere we have curly brackets)

```js
if ( width > 12 ) {
  let someMultiple = 10;
  let result = width * someMultiple;
  console.log(width + ' times ' + someMultiple + ' equals ' + result)
}
console.log(result);
```

Additionally `let` variables can only be declared once

```js
let height = 300;
```

Although they can be reassigned:

```js
let height = 200;
height = 300
```

And, since they are blockscoped the internal height variable below is isolated:

```js
var width = 100;
let height = 200;
const testString = '123456';

if (height > 10){
  let height = 500;
}
console.log(height);
```

* const variables cannot be reassigned

```
testString = 'abcd1234'
```

But they are not 'immutable', they just create an immutable binding.

```js
const me = {
  hair: true,
  age: 48
}
me.age = 49;
console.log(me);
```


##EXERCISE - Step One

Replace the existing nav labels with items from an array.

```js
const navItems = ['LOGO', 'Watchlist', 'Research', 'Markets', 'Workbook', 'Connect', 'Desktop', 'FAQ'];

console.log(navItems[2])
```

[querySelector() vs getElementById()](https://plainjs.com/javascript/selecting/)

```
const nav = document.querySelector('#main');
var nav = document.getElementById('main');
console.log(nav);
```

querySelectorAll()

```
const navList = nav.querySelectorAll('li a');
console.log(navList);
```

Compare navList and navItems in the console and the Array vs nodeList prototypes.

* for loop and innerHTML

```
for (let i =0; i < navList.length; i++ ){
  navList[i].innerHTML = navItems[i];
}
console.log(i) // not defined
```

##EXERCISE Step Two - Dynamic Generation

Problem: we are using existing `<li>` elements but have fewer of them than there are items in our array. 

Solution: dynamically generate the nav from items in the array.

* depopulate the nav children:

```html
<nav id="main"></nav>
```

* Append an `<ul>` tag to nav ( [createElement](https://plainjs.com/javascript/manipulation/create-a-dom-element-51/), [appendChild](https://plainjs.com/javascript/manipulation/append-or-prepend-to-an-element-29/) ) : 

```js
// const navList = nav.querySelectorAll('li a');
var navList = document.createElement('ul');
nav.appendChild(navList);
```

* dynamically create the nav based on the number of items in the array:

```js
for (let i =0; i < navItems.length; i++ ){
  let listItem = document.createElement('li');
  let linkText = navItems[i];
  listItem.innerHTML = '<a href="#">' + linkText + '</a>';
  navList.appendChild(listItem);
}
```

Note how gracefully the CSS for the navbar (flex) accomodates the increased number of links.

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
nav li {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Switch out the concatenation for a template string:

```js
listItem.innerHTML = `<a href="${link}">${linkText}</a>`;
```

Refactor:

```js
for (let i=0; i < navItems.length; i++ ){
  var listItem = document.createElement('li');
  listItem.innerHTML = `<a href="#">${navItems[i]}</a>`;
  navList.appendChild(listItem);
}
```

Template strings and Let and Const variables are ES6 (ecmascript version 6). Translate the code back to ES5 at https://babeljs.io


####Objects

Introduction to objects - `objects.html`

```js
const twitter = me.links.social.twitter
```

Destructuring

```js
const { first, last } = me;
```

```js
const { twitter, facebook } = me.links.social;
```

Change the variable name:

```js
const { twitter:tw, facebook:fb } = me.links.social;
```

Examine navitems.js as a sample of an object.


##EXERCISE Step Three - Dynamic Generation with an Object

Links for our page - an array that contains multiple objects:

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

```html
<script src="navitems.js"></script>
```

```js
for (let i =0; i < navItems.length; i++ ){
  var listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${navItems[i].link}">${navItems[i].label}</a>`;
  navList.appendChild(listItem);
}
```

####Array Methods

1. Array.prototype.filter()

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
const fifteen = inventors.filter ( function(inventor){
  if (inventor.year >= 1500 && inventor.year <= 1599 ) {
    return true; // keep it
  }
});

console.table(fifteen);
```

Refactor using arrow function and implicit return:

```js
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600))
```

2. Array.prototype.map() and join()

Give an array of the inventors first and last names

```
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`).join(', ');
console.log('Fullnames: ' + fullNames);
```

An alternate method for creating the list items using map():

```js
const markup = `
<ul>
  ${navItems.map( listItem => `<li><a href="${listItem.link}">${listItem.label}</a></li>` ).join('')}
</ul>
`;
console.log(markup)
nav.innerHTML = (markup);
```


##EXERCISE Step Four - Sticky Menu

offSetTop

```js
let topOfNav = nav.offsetTop;
```

* addEventListener('event', function)

```js
window.addEventListener('scroll', fixNav);
```

scrollY

```js
function fixNav() {
  console.log(topOfNav)
  console.log(window.scrollY)
}
```

[classList](https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/)

```
function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  }
}
```

Note that we add the class fixed-nav to the body (as opposed to, say, the nav itself) so that we can use it to target other elements on the page (which may not be children of the nav). We'll do this with the site-wrap.

```css
function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
  }
}
```

```css
body.fixed-nav nav {
  position: fixed;
  box-shadow:0 5px 3px rgba(0,0,0,0.1);
}
```

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

Take care of the jankey jump using offsetHeight to add padding equal to the height of the nav. 

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

Note the use of camel case.

##EXERCISE Step Five - Adding the SVG Image

```js
const logo = document.querySelector('#main ul li');
logo.classList.add('logo');
logo.firstChild.innerHTML = '<img src="img/logo.svg" />';
```

* Examine the SVG file 
* some interesting applications of SVG:

http://responsivelogos.co.uk
http://www.svgeneration.com/recipes/Beam-Center/

Format the logo and create the sliding logo behaviour. Note: CSS only, no JavaScript:

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

##EXERCISE End (for today) - Faking It!

Note the use of hashes in the nav links:

`<a href="#watchlist">Watchlist</a>`

These allow us to navigate to sections of the document marked up with the matching id: 

`<p id="watchlist">`

However one of them behaves differently, the Workbook link.

```js
const sitewrap = document.querySelector('.site-wrap');
const navTest = document.querySelectorAll('#main ul li a');
for (let i=0; i<navTest.length; i++){
  // console.log('hash ', navTest[i].hash);
  navTest[i].addEventListener('click', prepContent)
}

function prepContent(e){
  if (this.hash == "#workbook"){
    const header = "Workbook";
    const para = "Workbooks are good. "
    sitewrap.innerHTML = `
    <h1 style="color: black;">${header}</h1>
    <p>${para}</p>
    `;
    e.preventDefault();
  }
}
```


##HOMEWORK - CSS Flexible Box Layout Module

Flexbox can be quite difficult to master. You could do worse than checking out:

* Free Code Camp's [article on Medium.com](https://medium.freecodecamp.com/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af#.usjz1l93w), or

* A simple guide to the various CSS properties on [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

<img src="other-stuff/hero-1.png">

[Use a system font instead of a custom font?](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/). [In SVG?](https://css-tricks.com/system-fonts-svg/).

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
    <li>Create an object with a new set of labels and links for the site-nav li's and use the JavaScript techniques we covered today to dynamically generate the nav menu</li>

    <li>Use classList to assign the active class to a link when clicked (be sure to remove it from the previously highlighted link as well)</li>

    <li>Use the 'Faking It' code stubb to change the content of the site-wrap when a link is clicked.</li>

    <li>Optional: Add some paragraphs to the page and make the navigation sticky</li>
  </ol>

  <p>Post your efforts to the class Slack Channel and a web server (if you don't have I can provide)</p>
</div>

```

##TO DO - Make It Responsive

* Mobile first design

* Use min-width media queries to add features to larger screens `@media (min-width: 46.25em) { }`

* Use the meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to ensure this works on devices 

[Viewport Demo for Phone](http://daniel.deverell.com/css-files/responsive-meta-example/)


##TO DO - Use SASS

* error checking - watch out for this

* variables - added padding and breakpoint

* imports and structure

[Bootstrap SASS](https://github.com/twbs/bootstrap-sass)


##GIT and GITHUB

Git Config (typically only need to do this once on your machine)

```
git config
git config --global user.name "DannyBoyNYC"
git config --global user.email "daniel.deverell@gmail.com"
git config --list
```
* make sure terminal is in the correct directory

```
git init
```
Examine the .git Directory

```
ls -al
cd .git
ls
cd ..
```

Git Status

```
git status
On branch master
```
Git doesn't auto track files - only those you tell it to. 

Adding files creates untracked files. 

Create and add .gitignore run status.

```
git status
git commit -m 'initial commit'
```

Note: `git commit`  without the `-m` flag goes into VIM. 

Avoid this unless you like VIM. If this happens, hit ESC and type “:q” to exit.

```
git status
On branch master
nothing to commit, working directory clean
```

```
git branch
git branch <branchname>
git checkout <branchname>
git diff
```

To merge branches 

* be in the branch you want to merge to

* run status on that branch to make sure nothing is odd

```
git checkout master
git status
git merge <branchname>
```

Other useful branch commands (delete, show unmerged and merged branches)

```
git branch -d <branchname>
git branch --no-merge
git branch --merged
```

Pushing Files to Remote Repos - Github

* Copy URL from github.

```
git remote add origin https://github.com/.../...
git push -u origin master
```



###Notes

[vh and vw in the CSS](https://css-tricks.com/viewport-sized-typography/)

