import { Podcast, Tag } from 'project-shared';
import * as Parse from 'parse';

export const getPodcastById = async (id: string): Promise<Podcast> =>
  await new Parse.Query<Podcast>('Podcast').get(id);

export const getTagById = async (id: string): Promise<Tag> =>
  await new Parse.Query<Tag>('Tag').get(id);

export const getPodcasts = async (skip = 0, limit = 100): Promise<Podcast[]> =>
  await new Parse.Query<Podcast>('Podcast').skip(skip).limit(limit).find();

export const getTags = async (skip = 0, limit = 100): Promise<Tag[]> =>
  await new Parse.Query<Tag>('Tag').skip(skip).limit(limit).find();

export const getPodcastsByTags = async (
  tags: string[],
  skip = 0,
  limit = 100
): Promise<Podcast[]> =>
  await new Parse.Query<Podcast>('Podcast')
    .containedIn('tags', [tags])
    .skip(skip)
    .limit(limit)
    .find();
