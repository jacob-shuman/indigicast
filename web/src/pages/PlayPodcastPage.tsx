import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tw } from 'twind';
import { EXAMPLE } from 'project-shared';

import { getPodcastById } from '../api/podcasts';

type Podcast = any;

const PlayPodcastPage: React.FC = () => {
    const { podcastId } = useParams<{ podcastId: string }>()
    const [podcast, setPodcast] = useState<Podcast>()
    return (
        <div className={tw(`h-full w-full bg-gray-200 text-blue-500`)}>
            <h1>Play Podcast {JSON.stringify(podcast)}</h1>

            <p>This is Podcast {podcastId}</p>
        </div>
    );
};

export default PlayPodcastPage;
