import { Outlet } from '@remix-run/react';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import Usp from '~/components/common/section/Usp';

export default function CollectionLayout() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-20 px-6 pb-12">
      <Outlet />
      <Usp />
      <HistoryProduct />
    </div>
  );
}
