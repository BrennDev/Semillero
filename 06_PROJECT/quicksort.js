const quicksort = (arr) => {
  if (arr.length <= 1) return arr;

  let pivot = arr[0];
  arr.splice(0, 1);

  return [
    ...quicksort(arr.filter((y) => y.lon < pivot.lon)),
    pivot,
    ...quicksort(arr.filter((y) => y.lon >= pivot.lon)),
  ];
};

module.exports = quicksort;
