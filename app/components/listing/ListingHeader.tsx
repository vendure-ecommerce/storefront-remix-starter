

import ListingInfo from "./ListingInfo";
import ListingOrder from "./ListingOrder";
import ProductCompareSwitch from "./ProductCompareSwitch";

interface ListingHeaderProps {
  showListingInfo?: boolean;
  showProductCompareSwitch?: boolean;
  showListingOrder?: boolean;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  showListingInfo = true,
  showProductCompareSwitch = true,
  showListingOrder = true,
}) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-4'>
        {showListingInfo && <ListingInfo />}
        <div className='flex items-center gap-8'>
          {showListingOrder && <ListingOrder />}
          {showProductCompareSwitch && <ProductCompareSwitch />}
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
