import { AnimationArrayType } from '@/app/lib/types';

function countingSort(
  array: number[],
  exp: number,
  animations: AnimationArrayType
) {
  const n = array.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const index = Math.floor(array[i] / exp) % 10;
    count[index]++;
  }

  // Change count[i] so that count[i] now contains actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(array[i] / exp) % 10;
    output[count[index] - 1] = array[i];
    animations.push([[i, count[index] - 1], false]); // Record position change
    count[index]--;
  }

  // Copy the output array to array[], so that array now contains sorted numbers
  for (let i = 0; i < n; i++) {
    animations.push([[i, output[i]], true]); // Copy sorted values back
    array[i] = output[i];
  }
}

function runRadixSort(array: number[], animations: AnimationArrayType) {
  // Find the maximum number to know the number of digits
  const max = Math.max(...array);

  // Do counting sort for every digit. Note that exp is 10^i where i is the current digit number.
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(array, exp, animations);
  }
}

export function generateRadixSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];
  const animations: AnimationArrayType = [];

  const auxiliaryArray = array.slice();
  runRadixSort(auxiliaryArray, animations);
  runAnimation(animations);
}
