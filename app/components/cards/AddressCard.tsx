import { Card, CardFooter } from "~/components/ui-custom/MyCard";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import Map from "../common/Map";
import { Switch } from "../ui-custom/MySwitch";
import { Label } from "../ui/label";

interface AddressCardProps {
  title?: string;
  type: "shipping" | "billing";
}

const AddressCard: React.FC<AddressCardProps> = ({
  title = "Címsor",
  type,
}) => {
  /* const addressDetails =
    type === "shipping"
      ? dummy.addressOptions[0].shipping[0]
      : dummy.addressOptions[0].billing[0]; */

  const [inputId, setInputId] = useState<string>();

  useEffect(() => {
    setInputId(`default-address-${v4()}`);
  }, []);

  return (
    <Card className='flex h-full flex-col gap-8 border p-6 shadow-none transition hover:border-primary/30'>
      <div className='flex grow flex-col gap-4'>
        {type === "shipping" && <Map />}
        <div className='text-lg font-bold'>{title}</div>
        <div>
          <div className='text-sm text-color-tertiary'>Teljes név</div>
          <div>{"addressDetails.name"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Cím</div>
          <div>{"addressDetails.address"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Cégnév</div>
          <div>{"addressDetails.company"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Adószám</div>
          <div>{"addressDetails.taxNumber"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Irányítószám</div>
          <div>{"addressDetails.postCode"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Vármegyek</div>
          <div>{"addressDetails.county"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Ország</div>
          <div>{"addressDetails.country"}</div>
        </div>
        <div>
          <div className='text-sm text-color-tertiary'>Telefonszám</div>
          <div>{"addressDetails.phoneNumber"}</div>
        </div>
      </div>
      <CardFooter className='p-0'>
        <Label
          className='flex flex-none items-center gap-4 font-normal'
          htmlFor={inputId}
        >
          <Switch id={inputId} name='Alapértelmezett cím' />
          Alapértelmezett cím
        </Label>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
