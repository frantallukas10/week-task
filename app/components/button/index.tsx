import React, { FC, ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({
  children,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className="bg-blue-500 text-white font-bold py-1 px-2 mr-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};
