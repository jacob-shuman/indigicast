import { tw } from 'twind';

interface ColumnsProps {
  children: React.ReactNode;
  className?: string;
}

export const Columns = ({ children, className }: ColumnsProps) => {
  return (
    <div
      className={`${tw(
        `h-screen w-full grid grid-cols-4 gap-4 px-4`
      )} ${className}`}
    >
      {children}
    </div>
  );
};
