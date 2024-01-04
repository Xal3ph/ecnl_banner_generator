const fontFamily = 'Segoe UI, Helvetica Neue, Helvetica, sans-serif'
async function loadImage(url) {
  return new Promise((resolve, reject) => {
    img = new Image();
    img.src = url
    img.crossOrigin = "anonymous"
    img.onload = function () {
      resolve(img)
    }
  });
}

function getTitleGroup(x, y, width, height) {
  var titleGroup = new Konva.Group();

  var title = new Konva.Text({
    id: "title",
    text: `${localStorage.getItem('inputTitle')}`,
    fontSize: 80,
    fontFamily,
    fontStyle: 'lighter',
    fill: '#fff',
    width,
    padding: 20,
    align: 'left',
  });

  titleGroup.add(title);


  return titleGroup;
}

async function getFooterGroup(x, y, width, height) {
  var footerGroup = new Konva.Group()
  var footerBG = new Konva.Group({x, y, width, height})
  footerBG.add(new Konva.Rect({
      width: width,
      height: height,
      fill: 'rgb(33,37,41)',
  }));
  var footerLeft = new Konva.Group({width, height})
  footerLeft.add(new Konva.Text({
    id: "playerName",
    x: 10,
    y: 10,
    fontSize: 56,
    fontFamily,
    fill: '#fff',
    text: localStorage.getItem('playerName')
  }))
  footerGroup.add(footerLeft)

  function append(a, b) {
    return (b) ? `${a}\n${b}` : a
  }
  function toFooterString(...v) {
    return v.join(`\n`).replace(`\n\n`,`\n`)
  }
  footerLeft.add(new Konva.Text({
    x: 20,
    y: 56+10,
    fontSize: 24,
    fontFamily,
    fill: '#aaa',
    lineHeight: 1.2,
    fontStyle: 200,
    text: toFooterString(
      localStorage.getItem('playerPosition'),
      localStorage.getItem('playerGradYear'),
      localStorage.getItem('playerInstagram'),
      localStorage.getItem('playerEmail'),
      localStorage.getItem('playerOther1')
    )
  }))
  footerBG.add(footerLeft)

  var footerRight = new Konva.Group({width, height, align: 'right'})
  function getBadgeWidth(badgeSize, image) {
    return (badgeSize / image.height) * image.width
  }
  const badgeSize = 120
  const badge1 = await loadImage("./images/ECNL Girls Badge.svg")
  const badge2 = await loadImage("./images/New-VDA-2019+Logo-1920w-slim.png")
  x = width - (getBadgeWidth(badgeSize, badge1) + getBadgeWidth(badgeSize, badge2)) - 15 * 2;
  y = (height / 2 - badgeSize / 2)
  const badge1Image = new Konva.Image({
      x,
      y: 20,
      image: badge1,
      width: getBadgeWidth(badgeSize, badge1),
      height: badgeSize,
  })
  const badge2Image = new Konva.Image({
      x: x + getBadgeWidth(badgeSize, badge1) + 15,
      y: 20,
      image: badge2,
      width: getBadgeWidth(badgeSize, badge2),
      height: badgeSize,
  })
  footerRight.add(badge1Image)
  footerRight.add(badge2Image)
  footerRight.add(new Konva.Text({
    x: width/2,
    y: 0,
    width: width/2,
    height,
    fontSize: 32,
    fontFamily,
    fill: '#aaa',
    lineHeight: 1.2,
    fontStyle: 200,
    text: 'VDA 08g ECNL',
    align: 'right',
    verticalAlign: 'bottom',
    padding: 20,
  }))
  footerBG.add(footerRight)

  footerGroup.add(footerBG)
  // footerBG.dragBoundFunc(function(pos) {
  //   footerBG.setHeight(footerBG.height() +1)
  //   footerBG.y(footerBG.y()-1)

  //   console.log(footerBG.height())
  //   return {
  //     x: this.absolutePosition().x,
  //     y: this.absolutePosition().y
  //   }
  // })
  return footerGroup
}

function getEventsGroup(x, y, width, height) {
  const eventsGroup = new Konva.Group({x, y, draggable: true})

  const events = JSON.parse(localStorage.getItem('events') ?? '[]');
  let eY = 0
  events.forEach((e) => {
    const margin = 10
    const eventGroup = new Konva.Group({y: eY})
    const rect = new Konva.Rect({
      width,
      height: eventGroup.height(),
    });
    eventGroup.add(rect)
    const props = {
      x: margin,
      fontSize: 32,
      fontFamily,
      fontStyle: '500',
      fill: '#fff',
      width,
      padding: 3,
      align: 'left',
    }
    const name = new Konva.Text({...props, y: margin, text: e.name,})
    eventGroup.add(name)
    eY += name.height() + margin

    const col1Width = 240
    const dateTime = new Konva.Text({...props, fill: '#aaa', width: col1Width, y: margin + name.height(), text: e.dateTime})
    eventGroup.add(dateTime)
    const location = new Konva.Text({...props, fill: '#aaa', width: width-col1Width, x: col1Width+margin, y: margin + name.height(), text: e.location})
    eventGroup.add(location)
    eY += Math.max(dateTime.height(), location.height()) + margin

    rect.setHeight(name.height() + dateTime.height() + margin * 2)


    eventsGroup.add(eventGroup)
  })

  return eventsGroup;

}

async function loadCanvas(stage) {
  

  var background = new Konva.Layer({draggable: true});
  Konva.Image.fromURL(localStorage.getItem('imageBackgroundUrl'), function (bgImage) {
    const scale = Math.max(stage.width()/bgImage.width(), stage.height()/bgImage.height())
    bgImage.setAttrs({
      scaleX: scale,
      scaleY: scale,
    });
    background.add(bgImage);
    var rect1 = new Konva.Rect({
      width: background.width(),
      height: background.height(),
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 1080, y: 0 },
      fillLinearGradientColorStops: [0.3, 'rgba(0,0,0,0.7)', 0.7, 'rgba(0,0,0,0)'],
      stroke: 'black',
      strokeWidth: 4,
    });
    background.add(rect1);
    background.dragBoundFunc(function(pos) {
      rect1.setX(rect1.x - pos.x)
      return {
        // x: Math.max(Math.min(pos.x, 0), -stage.width()/2),
        x: pos.x,
        y: this.absolutePosition().y
      }
    })
  });

  stage.add(background);

  const hudLayer = new Konva.Layer()



  // add the layer to the stage
  const titleLayer = getTitleGroup(0, 0, stage.width(), stage.height());
  hudLayer.add(titleLayer);
  const title = titleLayer.find('#title')[0]

  hudLayer.add(getEventsGroup(20, title.getAbsolutePosition().y + title.height(), stage.width(), stage.height()))
  hudLayer.add(await getFooterGroup(0, stage.height() - stage.height()/5, stage.width(), stage.height()/5))

  stage.add(hudLayer)

  // draw the image
  stage.draw();
}

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function reloadValues(stage) {
  stage.find('#title')[0].setText(localStorage.getItem('inputTitle'))
  stage.find('#playerName')[0].setText(localStorage.getItem('playerName'))
}

$(function () {
  const aspectRatio = localStorage.getItem('styleAspectRatio') || '1'
  // first we need to create a stage
  var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 1080,
    height: (aspectRatio === '1') ? 1080 : 1920
  });

  loadCanvas(stage)
  document.getElementById('btnSave').addEventListener('click', () => {
    stage.destroyChildren();
    // reloadValues(stage)
    stage.setHeight((aspectRatio === '1') ? 1080 : 1920)
    loadCanvas(stage)
  })
  document.getElementById('download').addEventListener(
    'click',
    function () {
      var dataURL = stage.toDataURL();
      downloadURI(dataURL, `${localStorage.getItem('playerName')}.png`);
    },
    false
  );
});