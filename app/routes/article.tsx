import { Outlet } from '@remix-run/react';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import MobileMenu from '~/components/common/mobile/MobileMenu';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import Usp from '~/components/common/section/Usp';

export default function ArticleRoot() {
  return (
    <>
      <div className="mx-auto w-full px-6 lg:max-w-screen-2xl">
        <div className="flex flex-col gap-16 py-12">
          <Breadcrumbs />
          <main className="flex flex-col gap-20">
            <Outlet />
            <Usp />
            <HistoryProduct />
          </main>
        </div>
      </div>
      <MobileMenu
        showMenuButton={true}
        showOrderButton={false}
        showFilterButton={false}
        showFavoriteProductButton={false}
        showCompareProductsButton={false}
        showCartButton={true}
      />
    </>
  );
}
