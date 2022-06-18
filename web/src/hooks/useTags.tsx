import React, { useState, useEffect } from 'react';

import { Tag } from 'project-shared';

import { getTags } from '../utils';

import useParse from './useParse';

type TagsLookup = {
  [key: string]: Tag;
};

const TagsContext = React.createContext<TagsLookup>({});

export const TagsProvider: React.FC = ({ children }) => {
  const [tagsLookup, setTagsLookup] = useState<TagsLookup>({});
  const { initialized } = useParse();

  useEffect(() => {
    if (!initialized) return;
    async function callApi() {
      const tagsResponse: Tag[] = await getTags();
      setTagsLookup(
        tagsResponse.reduce((acc: TagsLookup, tag: Tag) => {
          acc[tag.id] = tag;
          return acc;
        }, {})
      );
    }
    callApi();
  }, [initialized]);

  return (
    <TagsContext.Provider value={tagsLookup}>{children}</TagsContext.Provider>
  );
};

export default function useTags(): TagsLookup {
  return React.useContext(TagsContext);
}
