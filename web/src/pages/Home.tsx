import { tw } from 'twind';
import { Podcast } from 'project-shared';
import { getPodcastsByTags } from '../utils';

const HomePage: React.FC = () => {
  return (
    <div className={tw(`h-full w-full bg-gray-200 text-blue-500 bg-[#ffffff]`)}>
      <h1>Hello World!</h1>
      <button
        className={tw(``)}
        onClick={async () => {
          console.log(await getPodcastsByTags(['ljZj2JZCDV']));
        }}
      >
        test
      </button>
    </div>
  );
};

export default HomePage;
