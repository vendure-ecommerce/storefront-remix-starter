import { useCollections } from "~/providers/collections";

const ListingInfo = () => {
  const { collectionItems, pagination } = useCollections();

  return (
    <p className='text-sm'>
      {pagination.limit < collectionItems?.totalItems ? pagination.limit : collectionItems?.totalItems} megjelenítve, összesen {collectionItems?.totalItems}
    </p>
  );
};

export default ListingInfo;
