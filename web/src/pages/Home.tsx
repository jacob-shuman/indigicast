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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string[]>([]);
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

  useEffect(() => {
    console.log('dropdownValue', dropdownValue);
  }, [dropdownValue]);

  if (!podcasts) return null;

  const toggleValues = (values: string[], clickedTag: string): string[] => {
    const index = values.indexOf(clickedTag);
    if (index === -1) {
      return [...values, clickedTag];
    }
    return values.filter((value) => value !== clickedTag);
  };

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleCheckboxClick = (e: any) => {
    const clickedTag = e.target.value;
    setDropdownValue((values) => toggleValues(values, clickedTag));
  };

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
          <select
            placeholder="Select Tags"
            className="form-select"
            aria-label="Default select example"
            value={dropdownValue}
            onClick={handleDropdown}
          />
          <div>
            <ul>
              {dropdownOpen
                ? tags.map((tag) => {
                    const {
                      id,
                      attributes: { name },
                    } = tag;
                    return (
                      <li>
                        <input
                          type="checkbox"
                          value={name}
                          id={id}
                          onClick={handleCheckboxClick}
                        />
                        {name}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
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
