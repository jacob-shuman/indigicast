import "./Header.css"

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Podcast, User } from 'project-shared'
import useParse from "../../hooks/useParse";
import { getUserById } from "../../utils";

const PodcastDetailsHeader: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
    const [author, setAuthor] = useState<User>();
    const { initialized } = useParse();

    useEffect(() => {
        if (!initialized) return;
        async function getAuthor() {
            const authorResponse = await getUserById(podcast.attributes.author.id);
            setAuthor(authorResponse);
        }
        getAuthor()
    }, [podcast, initialized])
    return (
        <>
            <div className="home-link"><Link to="/">x</Link></div>
            <h1>{podcast.attributes.name}</h1>
            <p>Details</p>
            <ul>
                <li><strong>Author: </strong>{author?.attributes.firstName} {author?.attributes.lastName}</li>
                <li><strong>Recorded Date: </strong>{String(podcast.attributes.recordedDate)}</li>
                <li><strong>Tags: </strong>{podcast.attributes.tags.map(tag => <span>{JSON.stringify(tag)}</span>)}</li>
            </ul>
        </>
    );
};

export default PodcastDetailsHeader;
