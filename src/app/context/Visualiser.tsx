'use client';

import {
  createContext,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AnimationArrayType, SortingAlgorithimType } from '../lib/types';
import {
  generationRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
} from '../lib/utils';

type SortingAlgorithimContextType = {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithim: SortingAlgorithimType;
  setSelectedAlgorithim: (algorithim: SortingAlgorithimType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  resetArrayAnimation: () => void;
  runAnimation: (animations: AnimationArrayType) => void;
  requiresReset: boolean;
};

const SortingAlgorithimContext = createContext<
  SortingAlgorithimContextType | undefined
>(undefined);

export const SortingAlgorithimProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithim, setSelectedAlgorithim] =
    useState<SortingAlgorithimType>('bubble');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const requiresReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAnimation();
    window.addEventListener('resize', resetArrayAnimation);

    return () => {
      window.removeEventListener('resize', resetArrayAnimation);
    };
  }, []);

  const resetArrayAnimation = () => {
    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++) {
      tempArray.push(
        generationRandomNumberFromInterval(100, maxLineHeight - 100)
      );
    }

    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);

    setTimeout(() => {
      const arrayLines = document.getElementsByClassName(
        'array-line'
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < arrayLines.length; i++) {
        arrayLines[i].classList.remove('change-line-color');
        arrayLines[i].classList.add('default-line-color');
      }
    });
  };

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName(
      'array-line'
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      });
    };

    const updateHeightValues = (
      lineIndex: number,
      newHeight: number | undefined
    ) => {
      if (newHeight === undefined) return;
      arrayLines[lineIndex].style.height = `${newHeight}px`;
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, 'change-line-color', 'default-line-color');
          setTimeout(() => {
            updateClassList(values, 'default-line-color', 'change-line-color');
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = values;
          updateHeightValues(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });

    const finalTimeout = animations.length * inverseSpeed;

    setTimeout(() => {
      Array.from(arrayLines).forEach((line) => {
        line.classList.add('pulse-animation', 'change-line-color');
        line.classList.remove('default-line-color');
      });

      setTimeout(() => {
        Array.from(arrayLines).forEach((line) => {
          line.classList.remove('pulse-animation', 'change-line-color');
          line.classList.add('default-line-color');
        });
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 1000);
    }, finalTimeout);
  };

  const value = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithim,
    setSelectedAlgorithim,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAnimation,
    runAnimation,
    requiresReset,
  };

  return (
    <SortingAlgorithimContext.Provider value={value}>
      {children}
    </SortingAlgorithimContext.Provider>
  );
};

export const useSortingAlogrithimContext = () => {
  const context = useContext(SortingAlgorithimContext);
  if (!context) {
    throw new Error(
      'useSortingAlgorithimContext must be used within a SortingAlgorithimProvider'
    );
  }
  return context;
};
