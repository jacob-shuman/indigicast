import { tw } from 'twind';
import { Podcast } from 'project-shared';
import { getPodcasts, getPodcastsByTags } from '../utils';
import { useEffect, useState } from 'react';
import useParse from '../hooks/useParse';
import { PodcastCard } from '../components/PodcastCard';
import { Columns } from '../components/Columns';
import logo from '../assets/LogoIFA.png';

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

  return (
    <Columns>
      <div className={tw(`col-span-4`)}>
        <img src={logo} alt="logo" className={tw(`h-20 my-4`)} />
        <h1>Good Morning, Friend.</h1>
        <button
          className={tw(``)}
          onClick={async () => {
            console.log(await getPodcastsByTags(['ljZj2JZCDV']));
          }}
        >
          Get Podcast by Tags
        </button>
      </div>
      <div className={tw(`col-span-4`)}>
        {podcasts.map((podcast) => (
          <div className={tw(`my-4`)}>
            <PodcastCard key={podcast.id} podcast={podcast} />
          </div>
        ))}
      </div>
    </Columns>
  );
};

export default HomePage;
