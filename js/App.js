import L from 'leaflet';
import { Running } from './Running/Running';
import { Cycling } from './Cycling/Cycling';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputElevation = document.querySelector('.form__input--climb');

export class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleClimbField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert(`check your privacy settings`);
      });
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _newWorkout(e) {
    const checkOnNumber = (...number) =>
      number.every(num => Number.isFinite(num));
    const checkPositiveNum = (...number) => number.every(num => num > 0);

    e.preventDefault();
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (type === 'running') {
      const temp = +inputTemp.value;
      if (
        !checkOnNumber(distance, duration, temp) ||
        !checkPositiveNum(distance, duration, temp)
      )
        return alert('check your value');
      workout = new Running([lat, lng], distance, duration, temp);
    }

    if (type === 'cycling') {
      const climb = +inputElevation.value;
      if (
        !checkOnNumber(distance, duration, climb) ||
        !checkPositiveNum(distance, duration)
      )
        return alert('check your value');
      workout = new Cycling([lat, lng], distance, duration, temp);
    }

    this.#workouts.push(workout);

    this._displayWorkout(workout);
    this._displayWorkoutOnSidebar(workout);

    form.reset();
  }

  _displayWorkout(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent('You will be here')
      .openPopup();
  }

  _toggleClimbField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _displayWorkoutOnSidebar(workout) {
    const {
      id,
      type,
      distance,
      duration,
      description,
      pace,
      temp,
      speed,
      climb,
    } = workout;

    let html = `
      <li class="workout workout--${type}" data-id="${id}">
          <h2 class="workout__title">${description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              type === 'running' ? '🏃' : '🚵‍♂️'
            }</span>
            <span class="workout__value">${distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `;

    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">📏⏱</span>
          <span class="workout__value">${pace.toFixed(2)}</span>
          <span class="workout__unit">m/min</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">👟⏱</span>
            <span class="workout__value">${temp}</span>
            <span class="workout__unit">step/min</span>
        </div>
       </li>`;
    }

    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
            <span class="workout__icon">📏⏱</span>
            <span class="workout__value">${speed.toFixed(2)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🏔</span>
          <span class="workout__value">${climb}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }
}

const app = new App();
