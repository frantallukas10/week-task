'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './components/button';
import { WeekTable } from './components/weekTable';

const HABIT_DATA = [0, 3, 2, 5, 3, 2, 1, 7, 0, 5, 1, 6, 1, 6, 1];

const fetchHabitData = (): Promise<string> => {
  const stringifyData = JSON.stringify(HABIT_DATA);
  return new Promise((resolve) => {
    setTimeout(() => resolve(stringifyData), 1000);
  });
};

export default function Home() {
  const [habitData, setHabitData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchHabitData()
      .then((data) => {
        setIsLoading(false);
        const parsedData = JSON.parse(data);
        setHabitData(parsedData);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  const [startDay, setStartDay] = useState(0);

  const handleMovePrevious = useCallback(() => {
    setStartDay((prev) => Math.max(prev - 1, 0)); // Prevent negative index
  }, []);

  const handleMoveNext = useCallback(() => {
    setStartDay((prev) => Math.min(prev + 1, habitData.length - 7)); // Prevent out-of-bounds
  }, [habitData.length]);

  // Extract a sliding window of 7 days
  const currentWindow = habitData.slice(startDay, startDay + 7);

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold text-blue-500 mt-4 mb-2">
        Week Task Challenge
      </h1>
      <p className="mb-2">
        The goal of this task is to create a 7-day task calendar where each day
        can have between 0 and 7 tasks. When loading the data, tasks are fetched
        from the back-end. This task allows navigating forward or backward by
        days while maintaining the correct number of days based on the database.
        Additionally, the number of tasks for each day should be displayed
        within the corresponding column of the table.
      </p>
      <div className="relative inline-flex">
        {isLoading && (
          <div className="absolute inset-0 bg-opacity-80 flex justify-center items-center z-10">
            <div className="text-lg font-bold text-gray-800">
              Loading data...
            </div>
          </div>
        )}
        <WeekTable currentWindow={currentWindow} startDay={startDay} />
      </div>
      <div>
        <Button
          isDisabled={startDay === 0 || isLoading}
          onClick={handleMovePrevious}
        >
          Previous day
        </Button>
        <Button
          isDisabled={startDay >= habitData.length - 7 || isLoading}
          onClick={handleMoveNext}
        >
          Next day
        </Button>
      </div>
    </div>
  );
}
