import * as Parse from 'parse';

export interface UserProps {
  firstName: string;
  lastName: string;
}

export type User = Parse.Object<UserProps>;

export interface PodcastProps {
  name: string;
  description: string;
  author: Parse.Object<UserProps>;
  file?: Parse.File;
  recordedDate?: Date;
  transcript?: string;
}

export type Podcast = Parse.Object<PodcastProps>;

export interface TagProps {
  name: string;
}

export type Tag = Parse.Object<TagProps>;

export interface PodcastTagProps {
  podcast: Parse.Object<PodcastProps>;
  tag: Parse.Object<TagProps>;
}

export type PodcastTag = Parse.Object<PodcastTagProps>;
