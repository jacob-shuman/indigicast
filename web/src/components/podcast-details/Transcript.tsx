import { tw } from 'twind';
import { Podcast } from 'project-shared';
import { useEffect } from 'react';



const Transcript: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  return (
    <div className='px-5'>
      <h1>Transcript</h1>
      <p>{podcast.attributes.transcript}</p>
    </div>
  );
};

export default Transcript;
