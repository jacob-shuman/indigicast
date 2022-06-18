import { tw } from 'twind';
import { Podcast } from 'project-shared';
import { useEffect } from 'react';



const Transcript: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  return (
    <div className={tw(`h-full w-full bg-gray-200 text-blue-500`)}>

      <h1 className={tw(`text-lg`)}>Transcript</h1>
      <p>{podcast.attributes.transcript}</p>

    </div>
  );
};

export default Transcript;
