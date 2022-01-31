type CallbackFunction = (hours: number, minutes: number, seconds: number) => void;

export default class Timer {
  callback: CallbackFunction;
  isRunning = false;
  startTime = 0;
  interval: any;

  constructor(callback: CallbackFunction) {
    this.callback = callback;
  }

  start = () => {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = Date.now()
    this.interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      const hours = Math.floor(elapsedSeconds / 3600);
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60
      this.callback(hours, minutes, seconds)
    }, 100);
  }

  stop = () => {
    clearInterval(this.interval);
  }
}