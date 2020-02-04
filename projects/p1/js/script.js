"use strict";

/********************************************************************

Project 1: The Butcher Poet
Sylvain Tran


*********************************************************************/

$(document).ready(setup);
let $calendar;
let $dialogLoveMail;
let currentHour = 8;
let currentMinutes = 0;
const MINS_IN_HOUR = 60;
const MINS_TICK_INCREASE = 10;
const END_OF_SHIFT = 17; // in currentHour
const BEGIN_SHIFT = 8;
const PROBABILITY_THRESHOLD = 0.2; // probability to spawn the poem dialog
let poemDialogList = [];
let progressBarValue = 0;
const tofuLaborValue = 0.1;
const maxValueForTofuJob = 100;
const minValueForTofuJob = 0;

//setup
//
//Setups the game scene
function setup() {
  $calendar = $('#calendar');
  $calendar.draggable();
  setInterval(updateCalendar, 1 * 1000); // Each 10 seconds is one hour
  $dialogLoveMail = $('.dialog');
  setInterval(showPoemDialog, 1000);
  $('#tofuFlattener').draggable({axis: "x"});
  $("#progressbar").progressbar({
    value: progressBarValue,
    max: maxValueForTofuJob
  });
  $('#tofuFlattener').on("drag", function(event, ui){
    progressBarValue = clampTofuJobValues(progressBarValue + tofuLaborValue, minValueForTofuJob, maxValueForTofuJob);
    updateProgressBar();
  });
}

function sendPoem() {
  console.log("sending a poem");
}

function closeDialog() {
  console.log("closing dialog");
}

//updateCalendar
//
// Updates the currentHour and currentMinutes of the day
function updateCalendar() {
  console.log(progressBarValue);
  if(currentMinutes < MINS_IN_HOUR) {
    currentMinutes += MINS_TICK_INCREASE;
  }
  else {
    currentMinutes = 0;
    if(currentHour < END_OF_SHIFT) {
      currentHour++;
    }
    else {
      currentHour = BEGIN_SHIFT; // restart the day to beginning of shift at 8am
    }
  }
  $calendar.text(currentHour + " : " + currentMinutes);
}

//showPoemDialog
//
//Shows the poem dialog at random times during the work shift
function showPoemDialog() {
  let randomNumber = Math.random();
  console.log(randomNumber);
  if(randomNumber <= PROBABILITY_THRESHOLD) {
    createPoemDialog();
  }
}


//createPoemDialog
//
//Creates the poem dialog
function createPoemDialog() {
  let poemDialog = document.createElement("div");

  $(poemDialog).addClass(".dialog");
  $(poemDialog).attr("title", "Love Mail");
  $(poemDialog).text("Send her a poem?");
  $(poemDialog).dialog({
    buttons: [
      {
        text: "Yes",
        click: sendPoem
      },
      {
        text: "No",
        click: closeDialog
      }
    ]
  }); 
  poemDialogList.push(poemDialog);
}

//updateProgressBar
//
// Updates the progress bar on drag event of the tofu flattener and resets the progress value if > max
function updateProgressBar(){
  $('#progressbar').progressbar( "option", "value", progressBarValue);
  if(progressBarValue >= maxValueForTofuJob) {
    resetTofuJob();
  }  
}

//clampTofuJobValues
//
//clamps a provided tofu flattening job value arg within the provided min max args
function clampTofuJobValues(value, min, max){
  if(value > max) {
    return max;
  }
  else if(value < min) {
    return min;
  }
  else{
    return value;
  }
}

//resetTofuJob
//
//Resets the tofu job progress bar at the top
function resetTofuJob() {
  progressBarValue = minValueForTofuJob;
}