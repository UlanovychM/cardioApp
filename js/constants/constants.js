export const form = document.querySelector('.form');
export const containerWorkouts = document.querySelector('.workouts');
export const inputType = document.querySelector('.form__input--type');
export const inputDistance = document.querySelector('.form__input--distance');
export const inputDuration = document.querySelector('.form__input--duration');
export const inputTemp = document.querySelector('.form__input--temp');
export const inputElevation = document.querySelector('.form__input--climb');

export let map, mapEvent;

export const navigationMap = () => {
  map = L.map('map').setView([50.441665, 30.5149715], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', event => {
    mapEvent = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  });
};
