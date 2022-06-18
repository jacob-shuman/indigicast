import { tw } from 'twind';
import { Podcast } from 'project-shared';

const HomePage: React.FC = () => {
  return (
    <div className={tw(`h-full w-full bg-gray-200 text-blue-500 bg-[#ffffff]`)}>
      <h1>Hello World!</h1>
    </div>
  );
};

export default HomePage;
