const nav = document.getElementById('main');

nav.innerHTML = '';

// const navList = document.createElement('ul')
// nav.appendChild(navList)

const markup = `
    <ul>
      ${navItems.map(
        navItem => `<li><a href="${navItem.link}">${navItem.label}</a></li>` 
        ).join('')}
    </ul>
    `;

nav.innerHTML = markup;

let topOfNav = nav.offsetTop;

window.addEventListener('scroll', fixNav);

function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

const logo = document.querySelector('#main ul li');
logo.classList.add('logo');
logo.firstChild.innerHTML = '<img src="img/logo.svg" />';


// for (let i =0; i < navItems.length; i++ ){
//   const listItem = document.createElement('li');
//   listItem.innerHTML = `<a href="${navItems[i].link}">${navItems[i].label}</a>`;
//   navList.appendChild(listItem);
// }

// const fifteen = inventors.filter (
//   function(inventor){
//     if (inventor.year >= 1500 && inventor.year <= 1599 ) {
//       return true; // keep it
//     }
// });

// const fifteen = inventors.filter (
//   inventor =>
//     (inventor.year >= 1500 && inventor.year <= 1599)
// );

// console.table(fifteen);

// const fullNames = inventors.map(
//   inventor => `${inventor.first} ${inventor.last}`
// ).join(', ')

// console.log('Full names ' + fullNames)