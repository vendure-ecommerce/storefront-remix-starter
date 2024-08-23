import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IFilterContextProps {
  children: React.ReactNode;
}

const FilterContext = createContext<{
  filterTerms: string[];
  setFilterTerms: Dispatch<SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}>({
  filterTerms: [],
  setFilterTerms: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  sortBy: '',
  setSortBy: () => {},
  priceRange: [],
  setPriceRange: () => {},
});

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }

  return context;
};

export const FilterProvider: React.FC<IFilterContextProps> = ({ children }) => {
  const [stFilterTerms, setFilterTerms] = useState<string[]>([]);
  const [stSearchTerm, setSearchTerm] = useState('');
  const [stSortBy, setSortBy] = useState('');
  const [stPriceRange, setPriceRange] = useState<number[]>([]);

  return (
    <FilterContext.Provider
      value={{
        filterTerms: stFilterTerms,
        setFilterTerms,
        searchTerm: stSearchTerm,
        setSearchTerm,
        sortBy: stSortBy,
        setSortBy,
        priceRange: stPriceRange,
        setPriceRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
