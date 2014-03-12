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
var nSamples = 2;
var delay;
var count;
var length;
var pixelsPerSecond = 50

var delaySample1=0;
var delaySample2=0;

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
  elems[0] = document.getElementById("sampleFile1");
  $("#sample1").width(elems[0].duration*pixelsPerSecond)
  $("#sample1").text('drums ('+elems[0].duration+'s)')

  elems[1] = document.getElementById("sampleFile2");
  $("#sample2").width(elems[1].duration*pixelsPerSecond)
  $("#sample2").text('bass ('+elems[1].duration+'s)')

  nSamples=2;
  count=nSamples+1;
  length=getMaxDuration();
}


//plays loop
function playLoop()
{ 
  setTimeout(function() { elems[0].play()}, delaySample1);
  setTimeout(function() { elems[1].play()}, delaySample2);

  startCursor();
}

//stops loop
function stopLoop()
{
  elems[0].pause();
  elems[1].pause();

  stopCursor();
  stopChrono();
}

//refreshes delays
function refreshDelays() {

  //this as to work as follows:
  // - if argument is single, then refresh delays only for that sample/track
  // - if argument is non, then refreshes all delays for all sample/tracks

  delaySample1 = document.getElementById("timeSample1").value*1000;
  delaySample2 = document.getElementById("timeSample2").value*1000;
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

  setTimeout(stopChrono, length);
  setTimeout(stopCursor, length);
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
    if (elems[i].duration > d) d=elems[i].duration*1000
  }
  return d;
}
//refresh max duration of loop
function refreshMaxDuration() { //this is not correct but works in some cases
  length=Math.max(delaySample1,delaySample2)
  for (i=0; i<elems.length; i++)
  {
    length+=elems[i].duration*1000
  }
}

//jquery draggable/droppable effects
$(function() {
    $('#sample1, #sample2').draggable({
      containment: '#totalTracks',
      grid: [ 10, 50 ], 
      snapMode: "inner",
      cursor: "pointer",
      drag:function(event, ui) {
        $("input#positionSample").val($(this).position().left);
        $("input#timeSample").val(($(this).position().left-5)/pixelsPerSecond);

        var draggableId = $(this).attr("id");
        if (draggableId == "sample1")
          delaySample1 = $("input#timeSample").val()*1000;
        if (draggableId == "sample2")
          delaySample2 = $("input#timeSample").val()*1000;

      }
    });
    $("#track1, #track2, #track3").droppable({
      drop: function(event, ui) {
        var draggableId = ui.draggable.attr("id");
        var droppableId = $(this).attr("id");
        $("input#trackSample").val(droppableId);
        $("input#droppedSample").val(draggableId);

        refreshMaxDuration(); //refreshes max duration of loop
      }
    });
  });