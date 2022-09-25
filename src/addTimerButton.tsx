import $ from "jquery";
import Timer from "./timer";
import React from "dom-chef";

function findRunCodeButton(){
  var ns = $('[data-cypress="RunCode"]'); // leetcode.cn
  if (ns===null){
    ns = $('[data-cy="run-code-btn"]'); // leetcode.com
  }
  return ns;  
}

let isTimerOn = false;
let timer: Timer;
let isOptionOpen = false;
let timerText = "00:00:00";
let timerButtonText = "Start Stopwatch"

const zeroPad = (num: number): string => String(num).padStart(2, "0");

const toggleTimer = () => {
  if (isTimerOn) {
    timer.stop();
    timerButtonText = "Start Stopwatch";
  } else {
    if (timer === undefined) {
      timer = new Timer((hours, minutes, seconds) => {
        timerText = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
        $(".timerText").text(timerText);
      })
    }
    timer.start();
    timerButtonText = "Stop Stopwatch";
  }
  $(".timerButtonLabel").text(timerButtonText);
  isTimerOn = !isTimerOn;
  closeOption();
}

const resetTimer = () => {
  if (timer !== undefined) {
    timer.reset()
    timerText = "00:00:00"
    $(".timerText").text(timerText);
    isTimerOn = false;
    timerButtonText = "Start Stopwatch";
    $(".timerButtonLabel").text(timerButtonText);
  }
  closeOption();
}

const openOption = () => {
  isOptionOpen = true;
  $(".optionDiv").show();
}

const closeOption = () => {
  isOptionOpen = false;
  $(".optionDiv").hide();
}

const el = (
  <>
    <div className="timerTextDiv" onClick={() => {
      navigator.clipboard.writeText(timerText);
      const copyText = $("<p/>")
        .addClass("copyText")
        .text("Copied!")
      $(".timerTextDiv").prepend(copyText)
      copyText.fadeOut(1500, () => copyText.remove());
    }}>
      <p className="timerText">{timerText}</p>
    </div>
    <div className="timerButtonDiv">
      <div className="optionDiv" onClick={resetTimer}>
        <button className="timerButton">
          <img className="timerImg" src={browser.runtime.getURL("dist/images/reset.svg")} />
          <span className="resetButtonLabel">Reset Stopwatch</span>
          <span className="timerImg"/>
        </button>
      </div>
      <button className="timerButton">
        <img
          className="timerImg"
          src={browser.runtime.getURL("dist/images/dark-timer.svg")}
          onClick={toggleTimer}
        />
        <span
          className="timerButtonLabel"
          onClick={toggleTimer}
        >
          {timerButtonText}
        </span>
        <img 
          className="timerImg"
          src={browser.runtime.getURL("dist/images/option.svg")}
          onClick={() => {
            if (isOptionOpen) {
              closeOption();
            } else {
              openOption();
            }
          }}
        />
      </button>
    </div>
  </>
);

const addTimerButton = () => {
  const runCodeButton = findRunCodeButton();
  const timerButton = $(".timerButton");
  if (runCodeButton !== null && !timerButton.length) {
    // const buttonDiv = runCodeButton.parent();
    $(el).insertBefore(runCodeButton);;
    $(".optionDiv").hide();
  }
}

setInterval(addTimerButton, 500);