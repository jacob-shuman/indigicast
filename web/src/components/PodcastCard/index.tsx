import { Podcast } from 'project-shared';
import { tw } from 'twind';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const { attributes, createdAt, updatedAt } = podcast;
  const { name, tags } = attributes;

  return (
    <Link to={`podcasts/${podcast.id}`}>
      <div
        className={tw(`flex flex-row items-center p-12 rounded-xl
      border-solid border-2 border-gray-400 bg-white`)}
      >
        <p>{name}</p>
        <p>{tags.map((tag) => tag)}</p>
        <p>{format(createdAt, 'MM/dd/yyyy')}</p>
        <p>{format(updatedAt, 'MM/dd/yyyy')}</p>
      </div>
    </Link>
  );
};
