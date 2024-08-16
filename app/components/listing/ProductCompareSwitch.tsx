

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui-custom/MySwitch";

const ProductCompareSwitch = () => {
  return (
    <Label
      className='flex flex-none items-center gap-4 font-normal'
      htmlFor='compare-products'
    >
      Termékek Összevetésa
      <Switch id='compare-products' name='Termékek Összevetésa' />
    </Label>
  );
};

export default ProductCompareSwitch;
