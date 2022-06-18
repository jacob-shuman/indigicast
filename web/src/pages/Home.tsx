import { tw } from 'twind';
import { Podcast } from 'project-shared';
import { getPodcasts, getPodcastsByTags } from '../utils';
import { useEffect, useState } from 'react';
import useParse from '../hooks/useParse';
import { PodcastCard } from '../components/PodcastCard';

const HomePage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>();
  const { initialized } = useParse();

  useEffect(() => {
    if (!initialized) return;
    async function getPodcast() {
      const podcastResponse = await getPodcasts();
      setPodcasts(podcastResponse);
    }
    getPodcast();
  }, [initialized]);

  if (!podcasts) return null;

  console.log('podcasts', podcasts);

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
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default HomePage;
