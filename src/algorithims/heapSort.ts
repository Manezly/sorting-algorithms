import { AnimationArrayType } from '@/app/lib/types';

function heapify(
  array: number[],
  n: number,
  i: number,
  animations: AnimationArrayType
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child is larger than root
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    animations.push([[i, largest], false]); // Compare elements
    [array[i], array[largest]] = [array[largest], array[i]];
    animations.push([[i, array[i]], true]); // Swap elements
    animations.push([[largest, array[largest]], true]);

    // Recursively heapify the affected subtree
    heapify(array, n, largest, animations);
  }
}

function runHeapSort(array: number[], animations: AnimationArrayType) {
  const n = array.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    animations.push([[0, i], false]); // Compare root with the last element
    [array[0], array[i]] = [array[i], array[0]];
    animations.push([[0, array[0]], true]); // Swap root with the last element
    animations.push([[i, array[i]], true]);

    // Call heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

export function generateHeapSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];
  const animations: AnimationArrayType = [];

  const auxiliaryArray = array.slice();
  runHeapSort(auxiliaryArray, animations);
  runAnimation(animations);
}
