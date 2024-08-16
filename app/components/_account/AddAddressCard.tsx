import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export default function AddAddressCard() {
  const { t } = useTranslation();

  return (
    <>
      <Link
        preventScrollReset
        className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        to="/account/addresses/new"
      >
        <span className="text-base-semi">{t('address.new')}</span>
        <PlusIcon className="w-6 h-6"></PlusIcon>
      </Link>
    </>
  );
}
