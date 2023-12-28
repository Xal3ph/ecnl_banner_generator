//
// Place any custom JS here
//

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

function save() {
  localStorage.setItem('inputEventName', $('#inputEventName').val())
  localStorage.setItem('inputImageNumber', $('#inputImageNumber').val())
  localStorage.setItem('inputEventLocation1', $('#inputEventLocation1').val())
  localStorage.setItem('inputEventDateTime1', $('#inputEventDateTime1').val())
  localStorage.setItem('inputEventLocation2', $('#inputEventLocation2').val())
  localStorage.setItem('inputEventDateTime2', $('#inputEventDateTime2').val())
  localStorage.setItem('inputEventLocation3', $('#inputEventLocation3').val())
  localStorage.setItem('inputEventDateTime3', $('#inputEventDateTime3').val())
  localStorage.setItem('inputEventLocation4', $('#inputEventLocation4').val())
  localStorage.setItem('inputEventDateTime4', $('#inputEventDateTime4').val())
}

function loadForm() {
  $('#inputImageNumber').val(localStorage.getItem('inputImageNumber'))
  $('#inputEventName').val(localStorage.getItem('inputEventName'))
  $('#inputEventLocation1').val(localStorage.getItem('inputEventLocation1'))
  $('#inputEventDateTime1').val(localStorage.getItem('inputEventDateTime1'))
  $('#inputEventLocation2').val(localStorage.getItem('inputEventLocation2'))
  $('#inputEventDateTime2').val(localStorage.getItem('inputEventDateTime2'))
  $('#inputEventLocation3').val(localStorage.getItem('inputEventLocation3'))
  $('#inputEventDateTime3').val(localStorage.getItem('inputEventDateTime3'))
  $('#inputEventLocation4').val(localStorage.getItem('inputEventLocation4'))
  $('#inputEventDateTime4').val(localStorage.getItem('inputEventDateTime4'))
}

function loadImage() {
  var imgNum = localStorage.getItem('inputImageNumber') || getUrlParameter('imageNum')
  if(imgNum) {
    $('#main-ig-card').removeClass (function (index, className) {
      return (className.match (/(^|\s)ig-img-\S+/g) || []).join(' ');
    }).addClass('ig-img-'+imgNum);
  }

  $('#eventName').html(localStorage.getItem('inputEventName') || 'eventName')
  $('#eventLocation1').html(localStorage.getItem('inputEventLocation1'))
  $('#eventDateTime1').html(localStorage.getItem('inputEventDateTime1'))
  $('#eventLocation2').html(localStorage.getItem('inputEventLocation2'))
  $('#eventDateTime2').html(localStorage.getItem('inputEventDateTime2'))
  $('#eventLocation3').html(localStorage.getItem('inputEventLocation3'))
  $('#eventDateTime3').html(localStorage.getItem('inputEventDateTime3'))
  $('#eventLocation4').html(localStorage.getItem('inputEventLocation4'))
  $('#eventDateTime4').html(localStorage.getItem('inputEventDateTime4'))
}

$(function(){

  loadImage();
  $('#save').click(() => {save();});
  loadForm();

  $('#gotoInstagram').click(() => {
    save();
    window.open('./instagram.html', '_blank');
  })
});
