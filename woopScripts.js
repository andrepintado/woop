var elems = new Array();
var nSamples = 1;
var delay;
var count;
var length;

function playLoop()
{ 
  delayTrack1Sample1 = document.getElementById("timeSample1").value*1000;
  delayTrack2Sample1 = 0
  delayTrack1Sample2 = 0

  setTimeout(function() { elems[0].play()}, delayTrack1Sample1);
  //setTimeout(function() { elems[1].play()}, delayTrack2Sample1);
  //setTimeout(function() { elems[2].play()}, delayTrack1Sample2);
}
function stopLoop()
{
  elems[0].pause();
  //elems[1].pause();
  //elems[2].pause();
}
function loaded()
{
  elems[0] = document.getElementById("track1sample1");
  //elems[1] = document.getElementById("track2sample100");
  //elems[2] = document.getElementById("track1sample200");
  nSamples=1;
  count=nSamples+1;
  length=getMaxDuration();
}
function clean()
{
  count=nSamples+1;
}
function startCursor()
{
  startChr();

  document.getElementById("playcursor").style.webkitAnimationDuration = '10s'
  document.getElementById("playcursor").style.webkitAnimationPlayState = "running"

  setTimeout(stopChr, length*1000);
}

function stopCursor() {
  document.getElementById("playcursor").style.webkitAnimationPlayState = "paused"
}

function getMaxDuration() {
  var d=0
  for (i=0; i<elems.length; i++)
  {
    if (elems[i].duration > d) d=elems[i].duration
  }
  
console.log(elems[0].duration)

  return d;
}


var nPreLoadedSamples=0;
function preLoad()
{
  nPreLoadedSamples++;
  if (nPreLoadedSamples==nSamples)
  {
    loaded();
  }
}

$(function() {
    $('#sample1').draggable({
      containment: '#totalTracks',
      grid: [ 10, 50 ], 
      snapMode: "inner",
      cursor: "pointer",
      create:function(event, ui) {
        $("input#positionSample1").val($(this).position().left);
        $("input#timeSample1").val(($(this).position().left-5)/60);
      },
      stop: function(event, ui) {
        $("input#positionSample1").val($(this).position().left);
        $("input#timeSample1").val(($(this).position().left-5)/60);
      }
    });
    $("#track1, #track2").droppable({
      drop: function(event, ui) {
        var draggableId = ui.draggable.attr("id");
        var droppableId = $(this).attr("id");
        $("input#trackSample1").val(droppableId);
      }
    });
  });