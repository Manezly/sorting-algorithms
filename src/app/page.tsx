'use client';

import { useEffect } from 'react';
import { useSortingAlogrithimContext } from './context/Visualiser';
import { Slider } from './components/Input/Slider';
import { Select } from './components/Input/Select';
import {
  algorithimOptions,
  generateAnimationArray,
  sortingAlgorithmsData,
} from './lib/utils';
import { SortingAlgorithimType } from './lib/types';
import { RxReset } from 'react-icons/rx';
import { FaPlayCircle } from 'react-icons/fa';

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    animationSpeed,
    setAnimationSpeed,
    selectedAlgorithim,
    setSelectedAlgorithim,
    requiresReset,
    resetArrayAnimation,
    runAnimation,
  } = useSortingAlogrithimContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithim(e.target.value as SortingAlgorithimType);
    resetArrayAnimation();
    return;
  };

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAnimation();
      return;
    }

    generateAnimationArray(
      selectedAlgorithim,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  useEffect(() => {
    console.log('selectedAlgorithim', selectedAlgorithim);
  }, [selectedAlgorithim]);

  return (
    <main className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
      <div className='flex h-full justify-center'>
        <div className='flex max-w-[1020px] w-full flex-col lg:px-0 px-4'>
          <div className='h-[66px] relative flex items-center justify-between w-full'>
            <h1 className='text-gray-300 text-2xl font-light hidden md:flex'>
              Sorting Algorithims
            </h1>
            <div className='flex items-center justify-center gap-4'>
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <Select
                options={algorithimOptions}
                defaultValue={selectedAlgorithim}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              <button
                className='flex items-center justify-center'
                onClick={handlePlay}
              >
                {requiresReset ? (
                  <RxReset className='text-gray-400 h-8 w-8' />
                ) : (
                  <FaPlayCircle className='text-system-green60 h-8 w-8' />
                )}
              </button>
            </div>

            <div className='hidden custom-w-h-control absolute top-[120%] left-0 w-full'>
              <div className='flex justify-between w-full text-gray-400 p-4 rounded border border-system-purple20 bg-system-purple80 bg-opacity-10 gap-6'>
                <div className='flex flex-col items-start justify-start w-3/4'>
                  <h3 className='text-lg'>
                    {sortingAlgorithmsData[selectedAlgorithim].title}
                  </h3>
                  <p className='text-sm text-gray-500 pt-2'>
                    {sortingAlgorithmsData[selectedAlgorithim].description}
                  </p>
                </div>

                <div className='flex flex-col items-end justify-start w-3/4 gap-2'>
                  <h3 className='text-lg'>Time Complexity</h3>
                  <div className='flex flex-col gap-2'>
                    <p className='flex w-full text-sm text-gray-500'>
                      <span className='w-28'>Worst Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithim].worstCase}
                      </span>
                    </p>
                    <p className='flex w-full text-sm text-gray-500'>
                      <span className='w-28'>Average Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithim].averageCase}
                      </span>
                    </p>
                    <p className='flex w-full text-sm text-gray-500'>
                      <span className='w-28'>Best Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithim].bestCase}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='relative flex  bar-parent w-full'>
            <div
              className='absolute bar-container w-full mx-auto left-0 right-0 flex justify-center items-end'
              id='content-container'
            >
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className='array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color'
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
