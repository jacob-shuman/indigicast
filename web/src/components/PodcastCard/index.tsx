import { Podcast } from 'project-shared';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Button, Row } from 'reactstrap';
import { Col } from 'reactstrap';

interface PodcastCardProps {
  podcast: Podcast;
}
export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const { attributes, createdAt } = podcast;
  const { name, tags, file } = attributes;
  const imageUrl = file?._url ? file._url : 'https://unsplash.com/photos/78A265wPiO4'
  const recordedOn = attributes.recordedDate

  return (
      <Card>
        <CardBody>
          <Row>
        <Col>
        <CardTitle><h1>{name}</h1></CardTitle> 
          <p>{tags.map((tag) => tag)}</p>
          <CardText>
          <p>Created on: {format(createdAt, 'MM/dd/yyyy')}</p>
          {recordedOn && 
            <p>Recorded on: {format(recordedOn, 'MM/dd/yyyy')}</p>
          }
          </CardText>
        </Col>
        <Col>
        <Link to={`podcasts/${podcast.id}`} >
          <CardImg src={imageUrl}></CardImg>
        </Link>
        </Col>
        </Row>
        <Button color='primary'>
        <Link to={`podcasts/${podcast.id}`} style={{color: 'white'}}>
          Listen to Podcast
          </Link>
        </Button>
        </CardBody>
      </Card>
  );
};
