import { data } from "./data.mjs";

function getStates(features) {
  const states = features.map(({ attributes: { State } }) => State);
  return [...new Set(states)];
}

function getUniversity(features) {
  return features.map(
    ({
      attributes: { University_Chapter: locationName },
      geometry: { x, y },
    }) => {
      return { locationName, latLng: [x, y] };
    }
  );
}

function locationsTransformer({ features }) {
  console.log(getStates(features));
  console.log(getUniversity(features));
}

locationsTransformer(data);
