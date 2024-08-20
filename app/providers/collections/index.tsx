import { createContext, useContext, useState } from 'react';
import { getCollections } from './collections';
import { loader } from '~/routes/collections/$slug';

interface ICollectionsProps {
	children?: React.ReactNode;
	collections: Awaited<ReturnType<typeof getCollections>>;
}

const CollectionsContext = createContext<{
  collection?: any;
  setCollection: React.Dispatch<React.SetStateAction<any>>;
  collections: Awaited<ReturnType<typeof getCollections>>;
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  pagination: {
    limit: number;
    page: number;
  };
  setPagination: React.Dispatch<React.SetStateAction<{ limit: number, page: number }>>;
}>({
  collection: undefined,
  setCollection: () => {},
	collections: [],
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  pagination: {
    limit: 25,
    page: 1,
  },
  setPagination: () => {},
});

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};

export const CollectionsProvider: React.FC<ICollectionsProps> = ({
  collections,
  children,
}) => {
  const [stCollection, setCollection] = useState<any>();
  const [stSearchParams, setSearchParams] = useState(new URLSearchParams());
  const [stPagination, setPagination] = useState({ limit: 25, page: 1 });

  return (
    <CollectionsContext.Provider
			value={{
        collection: stCollection,
        setCollection,
        collections,
        searchParams: stSearchParams,
        setSearchParams,
        pagination: stPagination,
        setPagination,
      }}
		>
      {children}
    </CollectionsContext.Provider>
  );
};