import './Header.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Podcast, User } from 'project-shared';
import useParse from '../../hooks/useParse';
import { getUserById } from '../../utils';
import useTags from '../../hooks/useTags';
import { toDate } from 'date-fns';
import { CardImg, Col, Row } from 'reactstrap';

const PodcastDetailsHeader: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  const [author, setAuthor] = useState<User>();
  const { initialized } = useParse();
  const tags = useTags();
  const { file } = podcast.attributes;
  const imageUrl = file?._url ? file._url : 'https://unsplash.com/photos/78A265wPiO4'

  useEffect(() => {
    if (!initialized) return;
    async function getAuthor() {
      const authorResponse = await getUserById(podcast.attributes.author.id);
      setAuthor(authorResponse);
    }
    getAuthor();
  }, [podcast, initialized]);
  return (
    <>
      <div className='px-5'>
        <div className="home-link">
          <Link to="/">x</Link>
        </div>
        <h1>{podcast.attributes.name}</h1>
        <Row>
        <Col className='col-3'>
          <CardImg src={imageUrl}></CardImg>
        </Col>
        <Col>
        <ul>
          <li>
            <strong>Author: </strong>
            {author?.attributes.firstName} {author?.attributes.lastName}
          </li>
          <li>
            <strong>Recorded Date: </strong>
            {String(podcast.attributes.recordedDate)}
          </li>
          <li>
            <strong>Tags: </strong>
            {podcast.attributes.tags.map((tag) => (
              <span>{tags[tag]?.attributes.name}</span>
            ))}
          </li>
        </ul>
        </Col>
      </Row>
      </div>
    </>
  );
};

export default PodcastDetailsHeader;
