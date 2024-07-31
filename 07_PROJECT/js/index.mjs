import { data } from './data.mjs';

function validateFeatures(features) {
  return Array.isArray(features) && features.length > 0;
}

function validateState(state) {
  return state ? state.trim() : 'Unknown State';
}

function validateUniversityName(universityName) {
  return universityName ? universityName.trim() : 'Unknown University';
}

function validateCoordinate(x, y) {
  return typeof x === 'number' && typeof y === 'number' ? [x, y] : [null, null];
}

function getStates(features) {
  const states = features.map(({ attributes: { State } }) => validateState(State));
  return [...new Set(states)];
}

function getUniversity(features) {
  return features.map(
    ({ attributes: { University_Chapter: universityName }, geometry: { x, y } }) => {
      const locationName = validateUniversityName(universityName);
      const latLng = validateCoordinate(x, y);
      return { locationName, latLng };
    },
  );
}

function locationsTransformer({ features }) {
  if (!validateFeatures(features)) {
    return [[], []];
  }
  const states = getStates(features);
  const locationUniversity = getUniversity(features);
  return [states, locationUniversity];
}

//Functions for manipulation of the DOM

function statesOptions(states) {
  const selectElement = document.getElementById('statesSelect');
  states.forEach((state) => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    selectElement.appendChild(option);
  });
}

function locationUniversityTable(locationUniversity) {
  const tableBody = document.querySelector('#UniversityTable');
  locationUniversity.forEach(({ locationName, latLng }) => {
    const [x, y] = latLng;
    const row = document.createElement('tr');
    row.innerHTML = `<td>${locationName}</td>
    <td>${x !== null ? x.toFixed(4) : 'N/A'}</td>
    <td>${y !== null ? y.toFixed(4) : 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}

function getData() {
  const [states, locationUniversity] = locationsTransformer(data);
  statesOptions(states);
  locationUniversityTable(locationUniversity);
  document.getElementById('showSectionButton').style.display = 'block';
  console.log(states);
  console.log(locationUniversity);
}

document.getElementById('dataButton').addEventListener('click', getData);
