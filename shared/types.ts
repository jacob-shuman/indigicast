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
  tags: string[];
  file?: Parse.File;
  recordedDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  transcript?: string;
}

export type Podcast = Parse.Object<PodcastProps>;

export interface TagProps {
  name: string;
}

export type Tag = Parse.Object<TagProps>;
