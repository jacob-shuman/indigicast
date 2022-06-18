import { tw } from 'twind';
import { Podcast} from 'project-shared';



const Transcript: React.FC<Podcast> = podcast => {
  return (
    <div className={tw(`h-full w-full bg-gray-200 text-blue-500`)}>


      <p>{podcast.transcript}</p>


    </div>
  );
};

export default Transcript;
