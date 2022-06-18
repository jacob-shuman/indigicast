import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tw } from 'twind';

import { Podcast } from 'project-shared';
import useParse from '../hooks/useParse';

import { getPodcastById } from '../utils';
import Header from '../components/podcast-details/Header'
import Transcript from '../components/podcast-details/Transcript'

import { Columns } from '../components/Columns';


const PlayPodcastPage: React.FC = () => {
    const { podcastId } = useParams<{ podcastId: string }>();
    const [podcast, setPodcast] = useState<Podcast>();
    const { initialized } = useParse();

    useEffect(() => {
        if (!initialized) return;
        async function getPodcast() {
            const podcastResponse = await getPodcastById(podcastId);
            setPodcast(podcastResponse);
        }
        getPodcast()
    }, [podcastId, initialized])

    if (!podcast) return null;

    return (
        <Columns className="items-center">
            <div className={tw(`col-span-4`)}>
                <Header podcast={podcast} />
                <Transcript podcast={podcast} />
            </div>
        </Columns>
    );
};

export default PlayPodcastPage;
