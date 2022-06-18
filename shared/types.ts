import * as Parse from 'parse';

export interface User {
  firstName: string;
  lastName: string;
}

export interface Podcast {
  name: string;
  description: string;
  author: Parse.Object<User>;
  file?: Parse.File;
  recordedDate?: Date;
  transcript?: string;
}

export interface Tag {
  name: string;
}

export interface PodcastTag {
  podcast: Parse.Object<Podcast>;
  tag: Parse.Object<Tag>;
}
