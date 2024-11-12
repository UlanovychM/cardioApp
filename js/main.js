'use strict';
import 'leaflet/dist/leaflet.css';
import map from './map/map';
import form from './form/form';

window.addEventListener('DOMContentLoaded', () => {
  map();
  form();
});
