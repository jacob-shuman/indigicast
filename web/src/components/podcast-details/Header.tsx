import { tw } from 'twind';

import { Podcast } from 'project-shared'

const PodcastDetailsHeader: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
    return (
        <div className={tw(`h-full w-full bg-gray-200 text-blue-500`)}>
            <h1>Hello World!</h1>
        </div>
    );
};

export default PodcastDetailsHeader;
