

import { useViewportWidth } from "~/utils/use-viewport-width";

interface SidebarProps {
  className?: string;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
    <>
      {isMobile ? null : (
        <aside
          className={`sticky top-[8.3125rem] hidden max-h-[calc(100vh_-_8.3125rem)] overflow-y-hidden lg:block -ml-6${className ? ` ${className}` : ""}`}
        >
          {children}
          <div className='absolute left-0 top-0 h-8 w-[calc(100%_-_0.5rem)] bg-gradient-to-b from-background from-10%'></div>
          <div className='absolute bottom-0 left-0 h-8 w-[calc(100%_-_0.5rem)] bg-gradient-to-t from-background from-10%'></div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
