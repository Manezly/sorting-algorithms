import { generateBubbleSortAnimationArray } from '@/algorithims/bubbleSort';
import { AnimationArrayType, SortingAlgorithimType } from './types';
import { generateSelectionSortAnimationArray } from '@/algorithims/selectionSort';
import { generateQuickSortAnimationArray } from '@/algorithims/quickSort';
import { generateMergeSortAnimationArray } from '@/algorithims/mergeSort';
import { generateInsertionSortAnimationArray } from '@/algorithims/insertionSort';

export const MIN_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;

export const generationRandomNumberFromInterval = (
  min: number,
  max: number
) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const algorithimOptions = [
  { label: 'Bubble', value: 'bubble' },
  { label: 'Quick', value: 'quick' },
  { label: 'Merge', value: 'merge' },
  { label: 'Insertion', value: 'insertion' },
  { label: 'Selection', value: 'selection' },
  { label: 'Heap', value: 'heap' },
  { label: 'Radix', value: 'radix' },
];

export const generateAnimationArray = (
  selectedAlgorithim: SortingAlgorithimType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) => {
  switch (selectedAlgorithim) {
    case 'bubble':
      generateBubbleSortAnimationArray(isSorting, array, runAnimation);
      break;
    case 'quick':
      generateQuickSortAnimationArray(isSorting, array, runAnimation);
      break;
    case 'merge':
      generateMergeSortAnimationArray(isSorting, array, runAnimation);
      break;
    case 'insertion':
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case 'heap':
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case 'radix':
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case 'selection':
      generateSelectionSortAnimationArray(isSorting, array, runAnimation);
    default:
      break;
  }
};

export const sortingAlgorithmsData = {
  bubble: {
    title: 'Bubble Sort',
    description:
      'A simple comparison-based sorting algorithm. Bubble sort repeatedly compares and swaps adjacent elements if they are in the wrong order, moving larger elements towards the end with each pass through the list. This process continues until the list is sorted and no more swaps are needed.',
    worstCase: 'O(n²)',
    averageCase: 'O(n²)',
    bestCase: 'O(n)',
  },
  insertion: {
    title: 'Insertion Sort',
    description:
      'Insertion sort builds the final sorted array one element at a time, by repeatedly taking the next unsorted element and inserting it into its correct position among the previously sorted elements. This process continues until all elements have been inserted into their proper place, resulting in a sorted list.',
    worstCase: 'O(n²)',
    averageCase: 'O(n²)',
    bestCase: 'O(n)',
  },
  selection: {
    title: 'Selection Sort',
    description:
      'Selection sort works by repeatedly finding the minimum element from the unsorted portion of the list and swapping it with the element at the current position. This process is continued for each position in the list, moving the boundary of the sorted and unsorted portions one element forward each time until the entire list is sorted.',
    worstCase: 'O(n²)',
    averageCase: 'O(n²)',
    bestCase: 'O(n²)',
  },
  merge: {
    title: 'Merge Sort',
    description:
      'Merge sort divides the unsorted list into n sublists, each containing one element (a list of one element is considered sorted), and then repeatedly merges these sublists to produce new sorted sublists until there is only one sublist remaining, which is the sorted list. This algorithm uses a divide-and-conquer approach, splitting the list in half recursively and merging the sorted halves back together.',
    worstCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    bestCase: 'O(n log n)',
  },
  quick: {
    title: 'Quick Sort',
    description:
      "Quick sort selects a 'pivot' element from the array and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively, and the sorted sub-arrays are combined with the pivot to form the sorted array.",
    worstCase: 'O(n²)',
    averageCase: 'O(n log n)',
    bestCase: 'O(n log n)',
  },
  heap: {
    title: 'Heap Sort',
    description:
      'It is a comparison-based sorting algorithm that uses a binary heap data structure. It works by building a heap from the input data, then repeatedly extracting the maximum element from the heap and rebuilding the heap until all elements are sorted.',
    worstCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    bestCase: 'O(n log n)',
  },
  radix: {
    title: 'Radix Sort',
    description:
      'Radix sort is an integer sorting algorithm that sorts data with integer keys by grouping the keys by individual digits that share the same significant position and value (place value). Radix sort uses counting sort as a subroutine to sort an array of numbers. Because integers can be used to represent strings (by hashing the strings to integers), radix sort works on data types other than just integers.',
    worstCase: 'O(w * n)',
    averageCase: 'O(w * n)',
    bestCase: 'O(w * n)',
  },
};
