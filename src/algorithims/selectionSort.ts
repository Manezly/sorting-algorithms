import { AnimationArrayType } from '@/app/lib/types';

const runSelectionSort = (array: number[], animations: AnimationArrayType) => {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push([[j, i], false]);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    animations.push([[i, array[minIndex]], true]);
    animations.push([[minIndex, array[i]], true]);
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
};

export const generateSelectionSortAnimationArray = (
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) => {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxilleryArray = array.slice();
  runSelectionSort(auxilleryArray, animations);
  runAnimation(animations);
};
