import React from 'react';
import { tw } from 'twind';

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
}
export const Button = ({ children, color = '#FF7700' }: ButtonProps) => {
  return (
    <button className={tw(`h-12 bg-[${color}] w-full text-white rounded-full`)}>{children}</button>
  );
};
