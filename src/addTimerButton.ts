import $ from "jquery";
import Timer from "./timer";

const runCodeButtonAttr = "data-cy=\"run-code-btn\""

let intervalId: any;
let runCodeButton: JQuery<HTMLElement>;
let buttonDiv: JQuery<HTMLElement>;
let timerButton: JQuery<HTMLElement>;
let timerText: JQuery<HTMLElement>;
let isTimerOn = false;
let timer: Timer;

const zeroPad = (num: number): string => String(num).padStart(2, "0");

const startTimer = () => {
  console.log("Starting timer")
  if (timer === undefined) {
    timer = new Timer((hours, minutes, seconds) => {
      const timeString = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
      $(timerText).text(timeString);
    });
  }
  timer.start();
}

const stopTimer = () => {
  console.log("Stopping timer")
  timer.stop();
}

const addTimerButton = () => {
  runCodeButton = $(`[${runCodeButtonAttr}]`);
  timerButton = $(".timerSpan");
  if (runCodeButton !== null && !timerButton.length) {
    // Get the div that we'll insert the timer button into
    console.log("Detected run code button")
    buttonDiv = runCodeButton.parent();
    timerButton = $("<span/>")
      .addClass("timerSpan")
      .append($("<button/>")
        .addClass("timerButton")
        .append($("<img/>")
          .addClass("timerImg")
          .attr("src", browser.runtime.getURL("dist/images/dark-timer.svg"))
        )
        .append($("<span/>")
          .addClass("timerButtonLabel")
          .text("Start Stopwatch")
          .on("click", (e) => {
            if (isTimerOn) {
              e.currentTarget.textContent = "Start Stopwatch"
              isTimerOn = false;
              stopTimer();
            } else {
              e.currentTarget.textContent = "Stop Stopwatch"
              isTimerOn = true;
              startTimer();
            }
          })
        )
      )
      .insertBefore(buttonDiv);
    timerText = $("<p/>").text("00:00:00").addClass("timerText").insertBefore(timerButton);
  } else if (timerButton.length) {
    console.log("Timer button exists. Clearing interval");
    clearInterval(intervalId)
    console.log("Clear interval")
  } else  {
    console.log("Failed. Trying again.")
  }
}

intervalId = setInterval(addTimerButton, 500);