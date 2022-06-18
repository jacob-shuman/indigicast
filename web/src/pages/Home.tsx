import { tw } from 'twind';
import { Podcast, Tag } from 'project-shared';
import {
  getPodcasts,
  getPodcastsByTags,
  getTags as getTagsUtil,
} from '../utils';
import { useEffect, useState } from 'react';
import useParse from '../hooks/useParse';
import { PodcastCard } from '../components/PodcastCard';
import { Columns } from '../components/Columns';
import logo from '../assets/LogoIFA.png';

const HomePage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const { initialized } = useParse();

  useEffect(() => {
    if (!initialized) return;
    async function getPodcast() {
      const podcastResponse = await getPodcasts();
      setPodcasts(podcastResponse);
    }

    async function getTags() {
      const tagResponse = await getTagsUtil();
      setTags(tagResponse);
    }
    getPodcast();
    getTags();
  }, [initialized]);

  if (!podcasts) return null;

  console.log('tags', tags);

  return (
    <Columns>
      <div className={tw(`col-span-4`)}>
        <img src={logo} alt="logo" className={tw(`h-20 my-4`)} />
        <p className="text-2xl text-center">Good Morning, Friend.</p>
        <button
          className={tw(``)}
          onClick={async () => {
            console.log(await getPodcastsByTags(['ljZj2JZCDV']));
          }}
        >
          Get Podcast by Tags
        </button>
        <div>
          {tags.map((tag) => {
            const {
              id,
              attributes: { name },
            } = tag;
            return (
              <>
                <input type="checkbox" value={name} id={id} />
                {name}
              </>
            );
          })}
        </div>
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
