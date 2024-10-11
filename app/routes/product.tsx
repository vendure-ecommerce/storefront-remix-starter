import { Outlet } from '@remix-run/react';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import Navbar from '~/components/common/navbar/Navbar';
import HistoryProduct from '~/components/common/section/HistoryProduct';

export default function ProductLayout() {
  return (
    <>
      <div className="mx-auto w-full px-6 lg:max-w-screen-2xl">
        <div className="flex flex-col gap-16 py-12">
          <Breadcrumbs items={[]} />
          <main className="flex flex-col gap-20">
            <Outlet />
            <HistoryProduct />
          </main>
        </div>
      </div>
    </>
  );
}
