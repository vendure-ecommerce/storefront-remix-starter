import { Outlet } from '@remix-run/react';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import Usp from '~/components/common/section/Usp';

export default function ArticleLayout() {
  return (
    <div className="mx-auto w-full px-6 lg:max-w-screen-2xl">
      <div className="flex flex-col gap-16 py-12">
        <Breadcrumbs />
        <div className="flex flex-col gap-20">
          <Outlet />
          <Usp />
          <HistoryProduct />
        </div>
      </div>
    </div>
  );
}
