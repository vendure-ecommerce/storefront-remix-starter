import { Outlet, useOutletContext } from '@remix-run/react';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import Usp from '~/components/common/section/Usp';
import { TGlobalOutletContext } from '~/types/types';

export default function CartLayout() {
  const { setLayoutData } = useOutletContext<TGlobalOutletContext>();
  setLayoutData({
    showFooterImage: false,
    showFooterMenu: false,
  });
  return (
    <>
      <div className="mx-auto w-full px-6 lg:max-w-screen-2xl">
        <div className="flex flex-col gap-20 py-12">
          <Outlet />
          <Usp />
          <HistoryProduct />
        </div>
      </div>
    </>
  );
}
