type CallbackFunction = (hours: number, minutes: number, seconds: number) => void;

export default class Timer {
  callback: CallbackFunction;
  startTime = 0;
  interval: any;
  elapsedMilliseconds = 0;

  constructor(callback: CallbackFunction) {
    this.callback = callback;
  }

  start = () => {
    this.startTime = Date.now()
    this.interval = setInterval(() => {
      const elapsedMilliseconds = this.elapsedMilliseconds + Date.now() - this.startTime;
      const [hours, minutes, seconds] = Timer.calculateHMS(elapsedMilliseconds);
      this.callback(hours, minutes, seconds)
    }, 100);
  }

  stop = () => {
    clearInterval(this.interval);
    this.elapsedMilliseconds += Date.now() - this.startTime;
  }

  static calculateHMS(elapsedMilliseconds: number) {
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return [hours, minutes, seconds];
  }
}