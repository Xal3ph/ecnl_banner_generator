let events = [];

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
  localStorage.setItem('inputTitle', $('#inputTitle').val())
  localStorage.setItem('inputImageNumber', $('#inputImageNumber').val())

  events = []
  $('.event').each((index, row) => {
    events.push(
      {
        name: $(row).find('.inputEventName').val(),
        location: $(row).find('.inputEventLocation').val(),
        dateTime: $(row).find('.inputEventDateTime').val(),
      }
    );
  });
  localStorage.setItem('events', JSON.stringify(events))

  localStorage.setItem('playerName', $('#inputPlayerName').val());
  localStorage.setItem('playerHeight', $('#inputPlayerHeight').val());
  localStorage.setItem('playerPosition', $('#inputPlayerPosition').val());
  localStorage.setItem('playerGradYear', $('#inputPlayerGradYear').val());
  localStorage.setItem('playerEmail', $('#inputPlayerEmail').val());
  localStorage.setItem('playerInstagram', $('#inputPlayerInstagram').val());
}

function loadForm() {
  $('#inputImageNumber').val(localStorage.getItem('inputImageNumber'))
  $('#inputTitle').val(localStorage.getItem('inputTitle'))
  events = JSON.parse(localStorage.getItem('events') ?? '[]');
  events.forEach(e => {
    addEvent(e.name, e.location, e.dateTime)
  });
  if($('#inputEvents .event').length > 1) {
    $('#inputEvents .event').first().remove();
  }

  $('#inputPlayerName').val(localStorage.getItem('playerName'));
  $('#inputPlayerHeight').val(localStorage.getItem('playerHeight'));
  $('#inputPlayerPosition').val(localStorage.getItem('playerPosition'));
  $('#inputPlayerGradYear').val(localStorage.getItem('playerGradYear'));
  $('#inputPlayerEmail').val(localStorage.getItem('playerEmail'));
  $('#inputPlayerInstagram').val(localStorage.getItem('playerInstagram'));
}

function loadImage(imgNum) {
  imgNum = imgNum ?? localStorage.getItem('inputImageNumber') ?? getUrlParameter('imageNum')
  if(imgNum) {
    $('#main-ig-card').removeClass (function (index, className) {
      return (className.match (/(^|\s)ig-img-\S+/g) || []).join(' ');
    }).addClass('ig-img-'+imgNum);
    try {
      $('#card-bg-image').attr('src', $('.ig-img-'+imgNum).css('background-image').split('"')[1])
    }catch(e) {

    }
    // $('#card-bg-image').attr('src',)
  }

  $('#title').html(localStorage.getItem('inputTitle') || 'title')
  events = JSON.parse(localStorage.getItem('events') ?? '[]');
  events.forEach(e => {
    console.log(e)
    $('#eventDetails .event:last').clone(true).insertAfter('#eventDetails .event:last');
    $('#eventDetails .event:last .eventName').html(e.name);
    $('#eventDetails .event:last .eventLocation').html(e.location);
    $('#eventDetails .event:last .eventDateTime').html(e.dateTime);
  });
  $('#eventDetails .event').first().remove();

  $('#playerName').html(localStorage.getItem('playerName'));
  $('#playerHeight').html(localStorage.getItem('playerHeight'));
  $('#playerPosition').html(localStorage.getItem('playerPosition'));
  $('#playerGradYear').html(localStorage.getItem('playerGradYear'));
  $('#playerEmail').html(localStorage.getItem('playerEmail'));
  $('#playerInstagram').html(localStorage.getItem('playerInstagram'));
}

function addEvent(inputEventName, inputEventLocation, inputEventDateTime) {
  $('#inputEvents .event:last').clone(true).insertAfter('#inputEvents .event:last');
  $('#inputEvents .event:last .inputEventName').val(inputEventName);
  $('#inputEvents .event:last .inputEventLocation').val(inputEventLocation);
  $('#inputEvents .event:last .inputEventDateTime').val(inputEventDateTime);
}

function removeEvent(e) {
  if($('.event').length === 1) {
    $('.event input').val('')
  }
  else {
    $(e.target).closest('.event').remove();
  }
}

function loadHash() {
  const hash = getUrlParameter('hash')
  if(hash) {
    const decodedHash = JSON.parse(atob(hash) ?? '{}')
    Object.entries(decodedHash).forEach(function ([key, value]) {
      localStorage.setItem(key, value);
    });
  }
}

function getHash() {
  return btoa(JSON.stringify(localStorage));
}

$(function(){

  loadHash();
  loadImage();
  loadForm();

  $("#addEvent").click(() => {addEvent();});
  $(".removeEvent").click((e) => {removeEvent(e);});

  $('#btnLink').click(() => {
    save();
    window.open(`./?hash=${getHash()}`, '_blank');
    // navigator.clipboard.writeText(copyText.value);
  });
  $('#btnSave').click(() => {save();});
  $('#btnClear').click(()=>{
    localStorage.clear();
    window.location = window.location.href.split("?")[0];
  });

  $('#btnInstagramTall').click(() => {
    save();
    window.open('./instagram_tall.html', '_blank');
  })
  $('#btnInstagramWide').click(() => {
    save();
    window.open('./instagram_wide.html', '_blank');
  })
});
