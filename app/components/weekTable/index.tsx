import React, { FC, useMemo, ReactNode } from 'react';

interface WeekTableProps {
  currentWindow: number[];
  startDay: number;
}

const Td: FC<{ className?: string; children?: ReactNode }> = ({
  className,
  children,
}) => (
  <td className={'border border-black w-8 h-8 ' + className}>{children}</td>
);

export const WeekTable: FC<WeekTableProps> = ({ currentWindow, startDay }) => {
  const Array7 = useMemo(() => Array.from({ length: 7 }, () => []), []);

  return (
    <table className="mb-2">
      <tbody>
        {Array7.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array7.map((_, colIndex) => {
              const dayValue = currentWindow[colIndex];
              const isDone = dayValue > 0 && rowIndex >= 6 - dayValue; // Ensure no green if dayValue is 0
              return (
                <Td key={colIndex} className={isDone ? 'bg-green-600' : ''} />
              );
            })}
          </tr>
        ))}
        {/* Numbers at the bottom */}
        <tr>
          {Array7.map((_, index) => (
            <Td key={index}>
              <span className="pl-1">{startDay + index + 1}</span>
            </Td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
