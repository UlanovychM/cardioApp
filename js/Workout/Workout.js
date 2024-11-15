export class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    this.type === 'running'
      ? (this.description = `Running ${this.date}`)
      : (this.description = `Cycling ${this.date}`);
  }
}
