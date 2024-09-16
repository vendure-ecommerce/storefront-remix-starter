import { Outlet, useOutletContext } from '@remix-run/react';
import HistoryProduct from '~/components/common/section/HistoryProduct';
import Usp from '~/components/common/section/Usp';
import { TGlobalOutletContext } from '~/types/types';

export default function CheckoutLayout() {
  const outlet = useOutletContext<TGlobalOutletContext>();
  const { setLayoutData } = outlet;
  setLayoutData({
    showFooterImage: false,
    showFooterMenu: false,
  });
  return (
    <>
      <div className="mx-auto w-full px-6 lg:max-w-screen-2xl">
        <div className="flex flex-col gap-16 py-12">
          <div className="flex flex-col gap-20">
            <Outlet context={outlet} />
            <Usp />
            <HistoryProduct />
          </div>
        </div>
      </div>
    </>
  );
}
