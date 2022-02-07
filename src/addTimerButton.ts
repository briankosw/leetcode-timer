import $ from "jquery";
import Timer from "./timer";

const runCodeButtonAttr = "data-cy=\"run-code-btn\""

let runCodeButton: JQuery<HTMLElement>;
let buttonDiv: JQuery<HTMLElement>;
let timerButton: JQuery<HTMLElement>;
let timerButtonLabel: JQuery<HTMLElement>;
let timerText: JQuery<HTMLElement>;
let optionDiv: JQuery<HTMLElement>;
let isTimerOn = false;
let timer: Timer;
let isOptionOpen = false;

const zeroPad = (num: number): string => String(num).padStart(2, "0");

const toggleTimer = () => {
  if (isTimerOn) {
    timer.stop();
    $(timerButtonLabel).text("Start Stopwatch");
  } else {
    if (timer === undefined) {
      timer = new Timer((hours, minutes, seconds) => {
        const timeString = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
        $(timerText).text(timeString);
      });
    }
    timer.start();
    $(timerButtonLabel).text("Stop Stopwatch");
  }
  isTimerOn = !isTimerOn
  closeOption();
}

const resetTimer = () => {
  if (timer !== undefined) {
    timer.reset()
    $(timerText).text("00:00:00");
    isTimerOn = false;
    $(timerButtonLabel).text("Start Stopwatch");
  }
  closeOption();
}

const openOption = () => {
  isOptionOpen = true;
  $(optionDiv).show()
}

const closeOption = () => {
  isOptionOpen = false;
  $(optionDiv).hide()
}

const addTimerButton = () => {
  runCodeButton = $(`[${runCodeButtonAttr}]`);
  timerButton = $(".timerButton");
  if (runCodeButton !== null && !timerButton.length) {
    // Get the div that we'll insert the timer button into
    buttonDiv = runCodeButton.parent();
    const timerButtonDiv = $("<div/>")
      .addClass("timerButtonDiv")
      .insertBefore(buttonDiv);
    optionDiv = $("<div/>")
      .addClass("optionDiv")
      .append(
        $("<button/>")
        .addClass("timerButton")
        .append(
          $("<img/>")
            .addClass("timerImg")
            .attr("src", browser.runtime.getURL("dist/images/reset.svg"))
        )
        .append(
          $("<span/>")
            .addClass("timerButtonLabel")
            .text("Reset Stopwatch")
        )
        .append(
          $("<span/>")
            .addClass("timerImg")
        )
      )
      .on("click", resetTimer)
      .hide()
      .appendTo(timerButtonDiv);
    timerButtonLabel = $("<p/>")
      .addClass("timerButtonLabel")
      .text("Start Stopwatch")
      .on("click", toggleTimer)
    timerButton = $("<button/>")
      .addClass("timerButton")
      .append(
        $("<img/>")
          .addClass("timerImg")
          .attr("src", browser.runtime.getURL("dist/images/dark-timer.svg"))
          .on("click", toggleTimer)
      )
      .append(timerButtonLabel)
      .append(
        $("<img/>")
          .addClass("timerImg")
          .attr("src", browser.runtime.getURL("dist/images/option.svg"))
          .on("click", () => {
            if (isOptionOpen) {
              closeOption();
            } else {
              openOption();
            }
          })
      )
      .appendTo(timerButtonDiv);

    const timerTextDiv = $("<div/>")
      .addClass("timerTextDiv")
      .insertBefore(timerButtonDiv);
    timerText = $("<p/>")
      .text("00:00:00")
      .addClass("timerText")
      .on("click", (e) => {
        navigator.clipboard.writeText(e.currentTarget.innerHTML);
        const copyText = $("<p/>")
          .addClass("copyText")
          .text("Copied!")
        $(timerTextDiv).prepend(copyText)
        copyText.fadeOut(1500, () => copyText.remove());
      })
      timerTextDiv.append(timerText)
  }
}

setInterval(addTimerButton, 500);