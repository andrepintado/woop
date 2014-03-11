// WOOP - your loops on the web
//
// 
// all these are prototypes.
//
// an ideia would be to create an object for each sample containing: name, duration, delay, tags, etc 
// also, an object for each track 
// also, an object for the whole loop, containing a list of tracks, samples, is that all?
//
//
// would that be ALL? NO!!!! ALLLL!!!!!!!!!!!!!!!!!!


var elems = new Array();
var nSamples = 1;
var delay;
var count;
var length;
var pixelsPerSecond = 50

var delayTrack1Sample1=0;

//makes sure that every sample is preloaded before calling "loaded()"
var nPreLoadedSamples=0;
function preLoad()
{
  nPreLoadedSamples++;
  if (nPreLoadedSamples==nSamples)
  {
    loaded();
  }
}

function loaded()
{
  elems[0] = document.getElementById("track1sample1");
  $("#sample1").width(elems[0].duration*pixelsPerSecond)
  $("#sample1").text('drums ('+elems[0].duration+'s)')
  //elems[1] = document.getElementById("track2sample100");
  //elems[2] = document.getElementById("track1sample200");
  nSamples=1;
  count=nSamples+1;
  length=getMaxDuration();
}


//plays loop
function playLoop()
{ 
  delayTrack1Sample1 = document.getElementById("timeSample1").value*1000;
  delayTrack2Sample1 = 0
  delayTrack1Sample2 = 0

  setTimeout(function() { elems[0].play()}, delayTrack1Sample1);
  //setTimeout(function() { elems[1].play()}, delayTrack2Sample1);
  //setTimeout(function() { elems[2].play()}, delayTrack1Sample2);

  startCursor();
}

//stops loop
function stopLoop()
{
  elems[0].pause();
  //elems[1].pause();
  //elems[2].pause();

  stopCursor();
  stopChrono();
}

//refreshes delays
function refreshDelays() {

  //this as to work as follows:
  // - if argument is single, then refresh delays only for that sample/track
  // - if argument is non, then refreshes all delays for all sample/tracks

  delayTrack1Sample1 = document.getElementById("timeSample1").value*1000;

}

//cleans vars
function clean()
{
  count=nSamples+1;
}

//starts cursor
function startCursor()
{
  startChrono();

  document.getElementById("playcursor").style.webkitAnimationDuration = '15s'
  document.getElementById("playcursor").style.webkitAnimationPlayState = "running"

  setTimeout(stopChrono, length*1000);
  setTimeout(stopCursor, length*1000);
}

//stops cursor
function stopCursor() {
  document.getElementById("playcursor").style.webkitAnimationPlayState = "paused"
}

//get max duration of loop
function getMaxDuration() {
  var d=0
  for (i=0; i<elems.length; i++)
  {
    if (elems[i].duration > d) d=elems[i].duration
  }

  console.log("get: "+d)

  return d;
}
//refresh max duration of loop
function refreshMaxDuration() {
  length=delayTrack1Sample1
  for (i=0; i<elems.length; i++)
  {
    length+=elems[i].duration
  }

  console.log("refresh: "+length)

}

//jquery draggable/droppable effects
$(function() {
    $('#sample1').draggable({
      containment: '#totalTracks',
      grid: [ 10, 50 ], 
      snapMode: "inner",
      cursor: "pointer",
      drag:function(event, ui) {
        $("input#positionSample1").val($(this).position().left);
        $("input#timeSample1").val(($(this).position().left-5)/pixelsPerSecond);
      }
    });
    $("#track1, #track2").droppable({
      drop: function(event, ui) {
        var draggableId = ui.draggable.attr("id");
        var droppableId = $(this).attr("id");
        $("input#trackSample1").val(droppableId);
        
        //this as to be put as function
        delayTrack1Sample1 = document.getElementById("timeSample1").value*1000;

        refreshMaxDuration(); //refreshes max duration of loop
      }
    });
  });