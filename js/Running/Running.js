import { Workout } from '../Workout/Workout';

export class Running extends Workout {
  type = 'running';

  date = new Date();
  id = (new Date() + '').slice(-10);

  constructor(coords, distance, duration, temp) {
    super(coords, distance, duration);
    this.temp = temp;
    this.calculatePace();
    this._setDescription();
  }

  calculatePace() {
    this.pace = this.duration / this.distance;
  }
}
