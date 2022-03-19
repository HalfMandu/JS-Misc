function binarySearch(array, val){
  'use strict';

  let minimumIndex = 0;
  let maxIndex = array.length - 1;
  let currentIndex;

  (function search(){
    currentIndex = Math.floor((minimumIndex + maxIndex) / 2);

    console.log(`curently looking between ${array[minimumIndex]} and ${array[maxIndex]}`);

    if (array[currentIndex] === val ){
      console.log(`FOUND IT! ${val} == ${array[currentIndex]}`);
      return;
    }

    if (val > array[currentIndex]){
      minimumIndex = currentIndex + 1;
    }

    if (val < array[currentIndex]){
      maxIndex = currentIndex -1;
    }

    search();
  })();
}

let arr = [1, 3, 4, 5, 8, 10, 15, 18, 20, 21, 22];
let val = 15;

binarySearch(arr, val);

module.exports = {binarySearch};
