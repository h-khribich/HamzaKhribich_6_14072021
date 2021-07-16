const main = document.querySelector('main');

/* The fetch API will enable loading the data from the JSON file as soon as the page loads */
fetch('https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    appendPhotographer(data);
  })
  .catch(function(err) {
    console.log(err);
  });