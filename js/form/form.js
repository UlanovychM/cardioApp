import L from 'leaflet';
import {
  form,
  inputType,
  inputElevation,
  map,
  mapEvent,
  inputTemp,
} from '../constants/constants';

const forms = () => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('You will be here')
      .openPopup();

    form.reset();
  });
};

inputType.addEventListener('change', () => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
});

export default forms;
