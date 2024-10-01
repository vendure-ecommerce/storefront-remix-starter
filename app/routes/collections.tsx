import { Outlet } from '@remix-run/react';
import Navbar from '~/components/common/navbar/Navbar';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import Usp from '~/components/common/section/Usp';
import { FilterProvider } from '~/providers/filter';

export default function CollectionLayout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-20 px-6 pb-12">
        <FilterProvider>
          <Outlet />
          <Usp />
          <HistoryProduct />
        </FilterProvider>
      </div>
    </>
  );
}
