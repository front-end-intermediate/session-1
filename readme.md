#Session One

##Variables

start-here.html

* var - can be reassigned

* is function scoped:

```
function setWidth(){
  var width = 500;
  console.log(width);
}
console.log(width);
```

* var - can leak when its not inside a function

```
var someNumber = 100
if ( someNumber > 12 ) {
  var someMultiple = 4;
  var result = someNumber * someMultiple;
  console.log(someNumber + ' times ' + someMultiple + ' equals ' + result)
}
```

Here, both someMultiple and result 'leak' outside the function.

* let and const are scoped to the block (function and otherwise anywhere we have curly brackets)

```
var someNumber = 100
if ( someNumber > 12 ) {
  let someMultiple = 4;
  let result = someNumber * someMultiple;
  console.log(someNumber + ' times ' + someMultiple + ' equals ' + result)
}
console.log(result);
```

Additionally `let` variables can only be declared once

```
let height = 300;
```

Although they can be reassigned

```
height = 300
```
Since they are block scoped this is allowed

```
if (height > 10){
    let height = 300;
}
```

* const variables cannot be updated

```
testString = 'abcd1234'
```

But they are not immutable

```
const me = {
  hair: true,
  age: 48
}
me.age = 49;
```



##Step One

Replace the existing nav items with items from an array.

```
<ul>
  <li class="logo"><a href="#">FAQ</a></li>
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Images</a></li>
  <li><a href="#">Locations</a></li>
  <li><a href="#">Maps</a></li>
</ul>
```

```
const navList = nav.querySelectorAll('li a');

for (let i =0; i < navList.length; i++ ){
  navList[i].innerHTML = navItems[i];
}
```

##Step Two

Dynamically generate the nav from items in the array

```
<nav id="main"></nav>
```

```
var navList = document.createElement('ul')
nav.appendChild(navList);
for (let i =0; i < navItems.length; i++ ){
      var listItem = document.createElement('li');
      var link = '#';
      var linkText = navItems[i];
      listItem.innerHTML = '<a href="' + link + '">' + linkText + '</a>';
      navList.appendChild(listItem);
    }
```

Switch out the concatenation for a template string

```
for (let i =0; i < navItems.length; i++ ){
  var listItem = document.createElement('li');
  var link = '#';
  var linkText = navItems[i];
  listItem.innerHTML = `<a href="${link}">${linkText}</a>`;
  navList.appendChild(listItem);
}
```

Refactor 

```
for (let i =0; i < navItems.length; i++ ){
  var listItem = document.createElement('li');
  listItem.innerHTML = `<a href="#">${navItems[i]}</a>`;
  navList.appendChild(listItem);
}
```

##Objects

Introduction to objects - `objects.html`

```
const me = {
  first: 'Daniel',
  last: 'Deverell',
  links: {
    social: {
      twitter: '@dannyboynyc',
      facebook: 'https://facebook.com/danieldeverell'
    },
    web: {
      blog: 'http://daniel.deverell.com'
    }
  }  
}
```

```
const twitter = me.links.social.twitter
```

Destructuring

```
const { first, last } = person;
```

```
const { twitter, facebook } = me.links.social;
```

Change the variable

```
const { twitter:tw, facebook:fb } = me.links.social;
```

##Back to Layout

Objects in our page

```
var navItemsObj = [
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

```
for (let i =0; i < navItemsObj.length; i++ ){
  var listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${navItemsObj[i].link}">${navItemsObj[i].label}</a>`;
  navList.appendChild(listItem);
}
```

##Sticky Menu

offSetTop

```
let topOfNav = nav.offsetTop;
```

```
window.addEventListener('scroll', fixNav);
```

scrollY

```
function fixNav() {
  console.log(window.scrollY)
}
```

classList 

```
function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  }
}
```

```
body.fixed-nav nav {
  position: fixed;
  box-shadow:0 5px 0 rgba(0,0,0,0.1);
}
```

```
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

```
body.fixed-nav .site-wrap {
  transform: scale(1);
}
```



```
function fixNav() {
  console.log(window.scrollY)
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
  }
}
```

Take care of the jump

```
function fixNav() {
  console.log(window.scrollY)
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
```

