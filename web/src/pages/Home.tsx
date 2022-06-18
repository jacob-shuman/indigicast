import { ToString, tw } from 'twind';
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
  const { initialized } = useParse();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);

  async function getPodcast() {
    const podcastResponse = await getPodcasts();
    setPodcasts(podcastResponse);
  }

  async function getTags() {
    const tagResponse = await getTagsUtil();
    setTags(tagResponse);
    setSelectedTags(tagResponse.map((tag) => tag.attributes.name));
  }

  async function filterBySelectedTags(tags: string[]) {
    const filteredTagsResponse = await getPodcastsByTags(tags);
    setFilteredPodcasts(filteredTagsResponse);
  }

  useEffect(() => {
    if (!initialized) return;

    getPodcast();
    getTags();
  }, [initialized]);

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
    const updatedTags = toggleValues(selectedTags, clickedTag);
    setSelectedTags((values) => toggleValues(values, clickedTag));
    filterBySelectedTags(updatedTags);
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
            value={selectedTags}
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
                          value={id}
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
        {filteredPodcasts.length > 1
          ? filteredPodcasts.map((podcast) => (
              <div className={tw(`my-4`)}>
                <PodcastCard key={podcast.id} podcast={podcast} />
              </div>
            ))
          : podcasts.map((podcast) => (
              <div className={tw(`my-4`)}>
                <PodcastCard key={podcast.id} podcast={podcast} />
              </div>
            ))}
      </div>
    </Columns>
  );
};

export default HomePage;
