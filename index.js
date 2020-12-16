'use strict';

function getDogImage() {
  const options = {method: 'GET'};
  let desiredAmountOfPhotos =  $("#quantity").val();
  if(!parseInt(desiredAmountOfPhotos)) {
    console.log("error, user didn't type a number")
  }
  if (parseInt(desiredAmountOfPhotos) < 3 || parseInt(desiredAmountOfPhotos) > 50  )
    {console.log('hey, the execution should be stopped because photos are not in the range')}
  fetch('https://dog.ceo/api/breeds/image/random/' + desiredAmountOfPhotos, options)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson))
  .catch(error => {
    console.log(error);
    alert('something went wrong. Try again later.');
    });
}
 
function displayResults(responseJson) {
  //console.log(responseJson);
  console.log(responseJson.message);
  // replace the existing image with the new one
  if(typeof(responseJson.message) == 'string') {
    $('.results-img').replaceWith(`<img src="${responseJson.message}" class ="results-img">`)
  }
  else {
    let bunch_of_images = ''
    for (let item of responseJson.message) {
      bunch_of_images += `<img src="${item}" class ="results-img">`
    }
    $('#where-results-are').html(bunch_of_images);
    
  }


  // display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});