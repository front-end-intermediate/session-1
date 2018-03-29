const nav = document.querySelector('#main');
nav.innerHTML = ''
const markup = `
<ul>
  ${navItems.map(navItem => `<li><a href="${navItem.link}">${navItem.label}</a></li>`).join('')}
</ul>
`;

nav.innerHTML = markup;

let topOfNav = nav.offsetTop;
window.addEventListener('scroll', fixNav);

function fixNav() {
  if (window.scrollY >= topOfNav) {
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

// const navTest = document.querySelectorAll('#main ul li a');
// for (let i = 0; i < navTest.length; i++) {
//   navTest[i].addEventListener('click', prepContent)
// }
// function prepContent(e) {
//   if (this.hash == "#workbook") {
//     e.preventDefault();
//   }
// }

const sitewrap = document.querySelector('.site-wrap');
const navTest = document.querySelectorAll('#main ul li a');
for (let i = 0; i < navTest.length; i++) {
  navTest[i].addEventListener('click', prepContent)
}

// const foo = [...navTest]

function prepContent(e) {
  if (this.hash == "#workbook") {
    const header = fakeContent[0].header;
    const content = fakeContent[0].content;
    sitewrap.innerHTML = `
      <h2>${header}</h2>
      <p>${content}</p>
    `;
    e.preventDefault();
  }
}