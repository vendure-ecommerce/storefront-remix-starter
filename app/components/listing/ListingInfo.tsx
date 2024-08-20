import { useCollections } from "~/providers/collections";

const ListingInfo = () => {
  const { collection, pagination } = useCollections();

  return (
    <p className='text-sm'>
      {pagination.limit < collection?.totalItems ? pagination.limit : collection?.totalItems} megjelenítve, összesen {collection?.totalItems}
    </p>
  );
};

export default ListingInfo;
