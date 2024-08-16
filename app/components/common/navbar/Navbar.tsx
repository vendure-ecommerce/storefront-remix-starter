import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import { useViewportWidth } from '~/utils/use-viewport-width';
import { getCollections } from '~/providers/collections/collections';
import { createContext, useContext } from 'react';

export interface INavbarProps {
  children?: React.ReactNode;
  collections: Awaited<ReturnType<typeof getCollections>>;
}

const CollectionsContext = createContext<
  Awaited<ReturnType<typeof getCollections>> | undefined
>(undefined);

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};

export const CollectionsProvider: React.FC<INavbarProps> = ({
  collections,
  children,
}) => {
  return (
    <CollectionsContext.Provider value={collections}>
      {children}
    </CollectionsContext.Provider>
  );
};

const Navbar: React.FC<INavbarProps> = ({ collections }) => {
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
    <CollectionsProvider collections={collections}>
      {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
    </CollectionsProvider>
  );
};

export default Navbar;
