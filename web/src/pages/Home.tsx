import { tw } from 'twind';

const HomePage: React.FC = () => {
  return (
    <div className={tw(`h-full w-full bg-gray-200 text-blue-500`)}>
      <h1>Hello World!</h1>
    </div>
  );
};

export default HomePage;
