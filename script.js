/* -- DOM Selectors -- */
const navButton = document.querySelector('.header__button');

// Making the button visible as soon as the user scrolls down
window.onscroll = function stick() {
  const sticky = navButton.offsetTop;
  if (window.pageYOffset >= sticky) {
    navButton.classList.add('sticky');
  }
};

// The fetch API will enable loading the data from the JSON file as soon as the page loads
fetch('fisheye_data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data['media'][2].title);
    data.media.forEach(element => {
      const foo = document.createElement('p');
      foo.innerText = element.title;
      document.getElementById('test').appendChild(foo);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
