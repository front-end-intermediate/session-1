// your scripts go here

const nav = document.getElementById('main');

nav.innerHTML = '';

const markup = `
<ul>
  ${navItems.map( navItem => `<li><a href="${navItem.link}">${navItem.label}</a></li>` ).join('')}
</ul>
`;

nav.innerHTML = markup;

// new positioning stuff

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

const logo = nav.querySelector('#main ul li');
logo.classList.add('logo');
logo.innerHTML = '<a href="#"><img src="img/logo.svg" /></a>';

var elem = document.querySelector('.site-wrap');
const nytapi = 'd7d88f32a04d4c6aab4e46735441d0ee';
const limit = 3;

function requestStories(url) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    // Only run if the request is complete
    if (request.readyState !== 4) return;
    
    // Process our return data
    if (request.status === 200) {
      // Success!
      renderStories(request); // NEW
    } else {
      // Request failed
      console.log('boo hoo')
    }
  };
  request.open('GET', 'https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=' + nytapi)
  request.send();
}

// function renderStories(data) {
//   var content = (JSON.parse(data.responseText));
//   var stories = content.results.slice(0, limit);
//   stories.forEach(function (story) {
//     var storyEl = document.createElement('div');
//     storyEl.className = 'entry';
//     storyEl.innerHTML = `
//       <div>
//       <img src="${story.multimedia[0].url}" /> 
//       <h3><a target="_blank" href="${story.short_url}">${story.title}</a></h3>
//       </div>
//       <p>${story.abstract}</p>
//     `;
//     elem.append(storyEl); // NEW
//   });
// }

function renderStories(data) {
  var content = (JSON.parse(data.responseText));
  var stories = content.results.slice(0, limit);
  //NEW
  const htmlFrag = stories.map(story => `
    <div class="entry">
    <div>
      <img src="${story.multimedia[0].url}" /> 
      <h3><a target="_blank" href="${story.short_url}">${story.title}</a></h3>
    </div>
    <p>${story.abstract}</p>
    </div>
  `).join('')
  elem.innerHTML = htmlFrag;
}

requestStories();