import SelectCard from "~/components/cards/SelectCard";
import UserCard from "~/components/cards/user/UserCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionDescription from "~/components/common/section/SectionDescription";
import SectionFooter from "~/components/common/section/SectionFooter";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import { Button } from "~/components/ui-custom/MyButton";
import { useViewportWidth } from "~/utils/use-viewport-width";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui-custom/MyDialog";
import { Input } from "~/components/ui-custom/MyInput";
import { Switch } from "~/components/ui-custom/MySwitch";
import { Avatar } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import FormField from "~/components/form/checkoutForm/FormField";
import { useActionData } from "@remix-run/react";
import { Form } from '@remix-run/react';

interface CheckoutFormProps {
  availableCountries: {
    id: string;
    name: string;
    code: string;
  }[];
  eligibleShippingMethods: {
      id: string;
      name: string;
      description: string;
      metadata?: any | null;
      price: number;
      priceWithTax: number;
  }[];
  eligiblePaymentMethods: {
    id: string;
    code: string;
    name: string;
    description: string;
    eligibilityMessage?: string | null;
    isEligible: boolean;
  }[];
  activeCustomer: {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    addresses?: Array<{
        id: string;
        company?: string | null;
        fullName?: string | null;
        streetLine1: string;
        streetLine2?: string | null;
        city?: string | null;
        province?: string | null;
        postalCode?: string | null;
        phoneNumber?: string | null;
        defaultShippingAddress?: boolean | null;
        defaultBillingAddress?: boolean | null;
        country: {
            id: string;
            code: string;
            name: string;
        };
    }> | null;
  } | null | undefined;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  availableCountries,
  eligibleShippingMethods,
  eligiblePaymentMethods,
  activeCustomer,
}) => {
  const actionData = useActionData();
  const [isAccountSectionFilled, setIsAccountSectionFilled] = useState(false);
  const [isPaymentSectionFilled, setIsPaymentSectionFilled] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const width = useViewportWidth();
  const isMobile = width < 1024;

  const [isShippingSectionFilled, setIsShippingSectionFilled] = useState(false);
  const [shippingFullName, setShippingFullName] = useState("");
  const [shippingCompany, setShippingCompany] = useState("");
  const [shippingStreetLine1, setShippingStreetLine1] = useState("");
  const [shippingStreetLine2, setShippingStreetLine2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingPhoneNumber, setShippingPhoneNumber] = useState("");

  const [billingFullName, setBillingFullName] = useState("");
  const [billingCompany, setBillingCompany] = useState("");
  const [billingStreetLine1, setBillingStreetLine1] = useState("");
  const [billingStreetLine2, setBillingStreetLine2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingProvince, setBillingProvince] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingPhoneNumber, setBillingPhoneNumber] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscriptionToggle = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleAccountSubmit = () => {
    if (email) {
      setIsAccountSectionFilled(true);
    } else {
      alert("Please provide a valid email address.");
    }
  };

  const handleShippingSectionSubmit = () => {
    if (validateShippingSection()) {
      setIsShippingSectionFilled(true);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const validateShippingSection = () => {
    return (
      shippingFullName &&
      shippingStreetLine1 &&
      shippingStreetLine2 &&
      shippingCity &&
      shippingProvince &&
      shippingPostalCode &&
      shippingPhoneNumber
    );
  };

  const validateBillingSection = () => {
    return (
      billingFullName &&
      billingStreetLine1 &&
      billingStreetLine2 &&
      billingCity &&
      billingProvince &&
      billingPostalCode &&
      billingPhoneNumber
    );
  };

  const handleFormSubmit = async () => {
    if (isAccountSectionFilled && isShippingSectionFilled && validateBillingSection()) {
    } else {
      alert("Please fill all required sections before submitting.");
    }
  };
  
  return (
    <Form method='post'>
      <Section className=''>
        <SectionHeader className='hidden'>
          <SectionTitle level='h2' title='Rendelés űrlap' srOnly />
        </SectionHeader>
        <SectionContent className='grid grid-cols-1'>
          <Section className='flex flex-col gap-12 p-0 pb-20'>
            <div className='absolute left-7 h-full'>
              <div
                className={`h-full w-[2px] ${!isAccountSectionFilled ? "bg-primary opacity-0" : "bg-green-700 opacity-100"}`}
              ></div>
            </div>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                {!isAccountSectionFilled ? (
                  <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                    1
                  </Avatar>
                ) : (
                  <Avatar className='h-14 w-14 items-center justify-center bg-green-700 text-xl font-bold text-color-primary-foreground'>
                    <Check />
                  </Avatar>
                )}
                <SectionTitle level='h3' title='Fiók' className='text-xl' />
                <div className='ml-auto'>
                  {!isAccountSectionFilled ? (
                    <Button
                      className='flex gap-2 px-0'
                      variant={"link"}
                      onClick={handleAccountSubmit}
                    >
                      <Check className='h-4 w-4'></Check>
                      Mentés
                    </Button>
                  ) : (
                    <Button
                      className='flex gap-2 px-0'
                      variant={"link"}
                      onClick={() => setIsAccountSectionFilled(false)}
                    >
                      <Pencil className='h-4 w-4'></Pencil>
                      Szerkesztés
                    </Button>
                  )}
                </div>
              </div>
              <SectionDescription className='pl-[4.5rem]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
                quisquam iusto quas voluptatibus fuga earum, corporis esse? Esse
                quos omnis et autem nemo porro. Modi molestiae minus assumenda
                facilis! Odio!
              </SectionDescription>
            </SectionHeader>
            {!isAccountSectionFilled ? (
              <SectionContent className='flex flex-col gap-8 pl-[4.5rem]'>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='email'>Email cím</Label>
                  <Input
                    name='email'
                    type='email'
                    id='email'
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <p>
                  Az e-mail cím megadásával Ön elfogadja{" "}
                  <a className='font-bold underline' href={"#"}>
                    Adatvédelmi szabályzatunkat
                  </a>{" "}
                  és{" "}
                  <a className='font-bold underline' href={"#"}>
                    Szolgáltatási feltételeinket
                  </a>
                  .
                </p>
                <Label
                  className='flex flex-none items-center gap-4 font-normal'
                  htmlFor='newsletter-subscription'
                >
                  <Switch
                    id='newsletter-subscription'
                    name='Hírlevél feliratozás'
                    checked={isSubscribed}
                    onCheckedChange={handleSubscriptionToggle}
                  />
                  Iratkozzon fel híreinkért értékesítéseinkről és újdonságainkról
                </Label>
                <Button
                  className='mt-8'
                  onClick={handleAccountSubmit}
                >
                  <Check className='mr-2 h-4 w-4' />
                  Tovább a szállítási adatokhoz
                </Button>
              </SectionContent>
            ) : (
              <SectionContent className='flex flex-col gap-8 pl-[4.5rem]'>
                <UserCard
                  showPhoneNumber={false}
                  showEmail={true}
                  expertEmail={"vasarlo@email.cim"}
                  title={""}
                  expertPhoneNumber={""}
                  imageSrc={""}
                />
              </SectionContent>
            )}
          </Section>
          {isAccountSectionFilled ? (
            <Section className='gap-12 p-0 pb-20'>
              <div className='absolute left-7 h-full'>
                <div
                  className={`h-full w-[2px] ${!isShippingSectionFilled ? "bg-primary opacity-0" : "bg-green-700 opacity-100"}`}
                ></div>
              </div>
              <SectionHeader>
                <div className='flex items-center gap-4'>
                  {!isShippingSectionFilled ? (
                    <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                      2
                    </Avatar>
                  ) : (
                    <Avatar className='h-14 w-14 items-center justify-center bg-green-700 text-xl font-bold text-color-primary-foreground'>
                      <Check />
                    </Avatar>
                  )}
                  <SectionTitle
                    level='h3'
                    title='Szállítás'
                    className='text-xl'
                  />
                  <div className='ml-auto'>
                    <div className='ml-auto'>
                      {!isShippingSectionFilled ? (
                        <Button
                          className='flex gap-2 px-0'
                          variant={"link"}
                          onClick={() => setIsShippingSectionFilled(true)}
                        >
                          <Check className='h-4 w-4'></Check>
                          Mentés
                        </Button>
                      ) : (
                        <Button
                          className='flex gap-2 px-0'
                          variant={"link"}
                          onClick={() => setIsShippingSectionFilled(false)}
                        >
                          <Pencil className='h-4 w-4'></Pencil>
                          Szerkesztés
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <SectionDescription className='pl-[4.5rem]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique quisquam iusto quas voluptatibus fuga earum, corporis
                  esse? Esse quos omnis et autem nemo porro. Modi molestiae minus
                  assumenda facilis! Odio!
                </SectionDescription>
              </SectionHeader>
              {!isShippingSectionFilled ? (
                <SectionContent className='flex flex-col gap-12 pl-[4.5rem]'>
                  <div>
                    <h4 className='mb-8 text-lg font-bold'>Szállítási cím</h4>
                    <div className='flex flex-col gap-6'>
                      <FormField
                        className='grid w-full items-center'
                        id='shipping-fullName'
                        name='shippingAddress[fullName]'
                        label='Teljes név'
                        type='text'
                        value={shippingFullName}
                        onChange={(e) => setShippingFullName(e.target.value)}
                      />
                      <FormField
                        className='grid w-full items-center'
                        id='shipping-company'
                        name='shippingAddress[company]'
                        label='Cégnév'
                        type='text'
                        value={shippingCompany}
                        onChange={(e) => setShippingCompany(e.target.value)}
                      />
                      <div className='flex gap-6'>
                        <FormField
                          className='grid w-1/2 items-center'
                          id='shipping-streetLine1'
                          name='shippingAddress[streetLine1]'
                          label='Utca'
                          type='text'
                          value={shippingStreetLine1}
                          onChange={(e) => setShippingStreetLine1(e.target.value)}
                        />
                        <FormField
                          className='grid w-1/2 items-center'
                          id='shipping-streetLine2'
                          name='shippingAddress[streetLine2]'
                          label='Házszám'
                          type='text'
                          value={shippingStreetLine2}
                          onChange={(e) => setShippingStreetLine2(e.target.value)}
                        />
                      </div>
                      <div className='flex gap-6'>
                        <FormField
                          className='grid w-1/2 items-center'
                          id='shipping-city'
                          name='shippingAddress[city]'
                          label='Város'
                          type='text'
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                        />
                        <FormField
                          className='grid w-1/2 items-center'
                          id='shipping-province'
                          name='shippingAddress[province]'
                          label='Megye'
                          type='text'
                          value={shippingProvince}
                          onChange={(e) => setShippingProvince(e.target.value)}
                        />
                      </div>
                      <div className='flex gap-6'>
                        <FormField
                          className='grid w-1/2 items-center'
                          id='shipping-postalCode'
                          name='shippingAddress[postalCode]'
                          label='Irányítószám'
                          type='number'
                          value={shippingPostalCode}
                          onChange={(e) => setShippingPostalCode(e.target.value)}
                        />
                        <FormField
                          className='grid w-1/2 items-center'
                          id='shipping-phoneNumber'
                          name='shippingAddress[phoneNumber]'
                          label='Telefonszám'
                          type='number'
                          value={shippingPhoneNumber}
                          onChange={(e) => setShippingPhoneNumber(e.target.value)}
                        />
                        <p className='text-[0.8rem] text-muted-foreground'>
                          Csak a rendeléshez kapcsolatos kérdések esetén
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className='mb-8 text-lg font-bold'>Szállítási mód</h4>
                    <div className='flex flex-col gap-4'>
                      <Dialog>
                        <DialogTrigger>
                          <SelectCard
                            title={`Átvételi helyek`}
                            description='Nincs átvételi hely kiválasztva'
                          />
                        </DialogTrigger>
                        <DialogContent className='max-w-screen max-h-screen !rounded-none p-0'>
                          {/* Add your PointSearchDesktop component or content here */}
                        </DialogContent>
                      </Dialog>
                      {eligibleShippingMethods.map((shippingMethod, index) => (
                        <SelectCard
                          key={index}
                          title={shippingMethod.name}
                          description='Várható kézbesítés: aug. 9. - aug. 15'
                          price={shippingMethod.priceWithTax.toString()}
                        />
                      ))}
                    </div>
                  </div>
                  <Button
                    className='mt-8'
                    onClick={handleShippingSectionSubmit}
                  >
                    <Check className='mr-2 h-4 w-4' />
                    Tovább a fizetési adatokhoz
                  </Button>
                </SectionContent>
              ) : (
                <SectionContent className='flex flex-col gap-16 pl-[4.5rem]'>
                  <div>
                    {/* {addressOptions.slice(0, 1).map((option, index) => (
                      <AddressCard
                        key={index}
                        title={option.title}
                        type='shipping'
                      />
                    ))} */}
                  </div>
                  <div>
                    <div className='mb-8 text-lg font-bold'>Szállítási mód</div>
                    <div className='flex flex-col gap-4'>
                      <SelectCard
                        title={`Postai kiszállítás`}
                        description='Várható kézbesítés: aug. 9. - aug. 15'
                        price='2 000 Ft'
                        isSelected
                      />
                    </div>
                  </div>
                </SectionContent>
              )}
            </Section>
          ) : (
            <Section className='gap-12 p-0 pb-20'>
              <div className='absolute left-7 h-full'>
                <div
                  className={`h-full w-[2px] ${!isShippingSectionFilled ? "bg-primary opacity-0" : "bg-green-700 opacity-100"}`}
                ></div>
              </div>
              <SectionHeader>
                <div className='flex items-center gap-4'>
                  {!isShippingSectionFilled ? (
                    <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                      2
                    </Avatar>
                  ) : (
                    <Avatar className='h-14 w-14 items-center justify-center bg-green-700 text-xl font-bold text-color-primary-foreground'>
                      <Check />
                    </Avatar>
                  )}
                  <SectionTitle
                    level='h3'
                    title='Szállítási cím'
                    className='text-xl'
                  />
                  <div className='ml-auto'>
                    <div className='ml-auto'>
                      {!isShippingSectionFilled ? (
                        <Button
                          className='flex gap-2 px-0'
                          variant={"link"}
                          onClick={() => setIsShippingSectionFilled(true)}
                        >
                          <Check className='h-4 w-4'></Check>
                          Mentés
                        </Button>
                      ) : (
                        <Button
                          className='flex gap-2 px-0'
                          variant={"link"}
                          onClick={() => setIsShippingSectionFilled(false)}
                        >
                          <Pencil className='h-4 w-4'></Pencil>
                          Szerkesztés
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <SectionDescription className='pl-[4.5rem]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique quisquam iusto quas voluptatibus fuga earum, corporis
                  esse? Esse quos omnis et autem nemo porro. Modi molestiae minus
                  assumenda facilis! Odio!
                </SectionDescription>
              </SectionHeader>
            </Section>
          )}

          {isAccountSectionFilled && isShippingSectionFilled ? (
            <Section className='gap-12 p-0'>
              <div className='absolute left-7 h-full'>
                <div
                  className={`h-full w-[2px] ${!isPaymentSectionFilled ? "bg-primary opacity-0" : "bg-green-700 opacity-100"}`}
                ></div>
              </div>
              <SectionHeader>
                <div className='flex items-center gap-4'>
                  {!isPaymentSectionFilled ? (
                    <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                      3
                    </Avatar>
                  ) : (
                    <Avatar className='h-14 w-14 items-center justify-center bg-green-700 text-xl font-bold text-color-primary-foreground'>
                      <Check />
                    </Avatar>
                  )}
                  <SectionTitle level='h3' title='Fizetés' className='text-xl' />
                  <div className='ml-auto'>
                    {!isPaymentSectionFilled ? (
                      <Button
                        className='flex gap-2 px-0'
                        variant={"link"}
                        onClick={() => setIsPaymentSectionFilled(true)}
                      >
                        <Check className='h-4 w-4'></Check>
                        Mentés
                      </Button>
                    ) : (
                      <Button
                        className='flex gap-2 px-0'
                        variant={"link"}
                        onClick={() => setIsPaymentSectionFilled(false)}
                      >
                        <Pencil className='h-4 w-4'></Pencil>
                        Szerkesztés
                      </Button>
                    )}
                  </div>
                </div>
                <SectionDescription className='pl-[4.5rem]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique quisquam iusto quas voluptatibus fuga earum, corporis
                  esse? Esse quos omnis et autem nemo porro. Modi molestiae minus
                  assumenda facilis! Odio!
                </SectionDescription>
              </SectionHeader>
              <SectionContent className='flex flex-col gap-12 pl-[4.5rem]'>
                <div>
                  <h4 className='mb-8 text-lg font-bold'>Fizetési mód</h4>
                  <div className='flex flex-col gap-4'>
                    {eligiblePaymentMethods.map((paymentMethod, index) => (
                      <SelectCard key={index} title={paymentMethod.name} />
                    ))}
                  </div>
                </div>
                <div>
                <h4 className='mb-8 text-lg font-bold'>Számlázási cím</h4>
                <div className='flex flex-col gap-6'>
                  <Label
                    className='flex flex-none items-center gap-4 font-normal'
                    htmlFor='billing-address-same-as-shipping-address'
                  >
                    <Switch
                      id='billing-address-same-as-shipping-address'
                      name='Hírlevél feliratozás'
                    />
                    A számlázási címem megegyezik a szállítási címemmel
                  </Label>
                  <FormField
                      className='grid w-full items-center'
                      id='billing-fullName'
                      name='billingAddress[fullName]'
                      label='Teljes név'
                      type='text'
                      value={billingFullName}
                      onChange={(e) => setBillingFullName(e.target.value)}
                    />
                    <FormField
                      className='grid w-full items-center'
                      id='shipping-company'
                      name='billingAddress[company]'
                      label='Cég név'
                      type='text'
                      value={billingCompany}
                      onChange={(e) => setBillingCompany(e.target.value)}
                    />
                    <div className='flex gap-6'>
                      <FormField
                        className='grid w-1/2 items-center'
                        id='shipping-streetLine1'
                        name='billingAddress[streetLine1]'
                        label='Utca'
                        type='text'
                        value={billingStreetLine1}
                        onChange={(e) => setBillingStreetLine1(e.target.value)}
                      />
                      <FormField
                        className='grid w-1/2 items-center'
                        id='shipping-streetLine2'
                        name='billingAddress[streetLine2]'
                        label='Házszám'
                        type='text'
                        value={billingStreetLine2}
                        onChange={(e) => setBillingStreetLine2(e.target.value)}
                      />
                    </div>
                    <div className='flex gap-6'>
                      <FormField
                        className='grid w-1/2 items-center'
                        id='shipping-city'
                        name='billingAddress[city]'
                        label='Város'
                        type='text'
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                      />
                      <FormField
                        className='grid w-1/2 items-center'
                        id='shipping-province'
                        name='billingAddress[province]'
                        label='Megye'
                        type='text'
                        value={billingProvince}
                        onChange={(e) => setBillingProvince(e.target.value)}
                      />
                    </div>
                    <div className='flex gap-6'>
                      <FormField
                        className='grid w-1/2 items-center'
                        id='shipping-postalCode'
                        name='billingAddress[postalCode]'
                        label='Irányítószám'
                        type='number'
                        value={billingPostalCode}
                        onChange={(e) => setBillingPostalCode(e.target.value)}
                      />
                      <FormField
                        className='grid w-1/2 items-center'
                        id='shipping-phoneNumber'
                        name='billingAddress[phoneNumber]'
                        label='Telefonszám'
                        type='number'
                        value={billingPhoneNumber}
                        onChange={(e) => setBillingPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </SectionContent>
            </Section>
          ) : (
            <Section className='gap-12 p-0'>
              <div className='absolute left-7 h-full'>
                <div
                  className={`h-full w-[2px] ${!isPaymentSectionFilled ? "bg-primary opacity-0" : "bg-green-700 opacity-100"}`}
                ></div>
              </div>
              <SectionHeader>
                <div className='flex items-center gap-4'>
                  {!isPaymentSectionFilled ? (
                    <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                      3
                    </Avatar>
                  ) : (
                    <Avatar className='h-14 w-14 items-center justify-center bg-green-700 text-xl font-bold text-color-primary-foreground'>
                      <Check />
                    </Avatar>
                  )}
                  <SectionTitle level='h3' title='Fizetés' className='text-xl' />
                  <div className='ml-auto'>
                    {!isPaymentSectionFilled ? (
                      <Button
                        className='flex gap-2 px-0'
                        variant={"link"}
                        onClick={() => setIsPaymentSectionFilled(true)}
                      >
                        <Check className='h-4 w-4'></Check>
                        Mentés
                      </Button>
                    ) : (
                      <Button
                        className='flex gap-2 px-0'
                        variant={"link"}
                        onClick={() => setIsPaymentSectionFilled(false)}
                      >
                        <Pencil className='h-4 w-4'></Pencil>
                        Szerkesztés
                      </Button>
                    )}
                  </div>
                </div>
                <SectionDescription className='pl-[4.5rem]'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique quisquam iusto quas voluptatibus fuga earum, corporis
                  esse? Esse quos omnis et autem nemo porro. Modi molestiae minus
                  assumenda facilis! Odio!
                </SectionDescription>
              </SectionHeader>
            </Section>
          )}
          {isAccountSectionFilled && isShippingSectionFilled ? (
            <SectionFooter className='relative pl-[4.5rem]'>
              {/* Progress */}
              {isAccountSectionFilled &&
              isShippingSectionFilled &&
              isPaymentSectionFilled ? (
                <div className='absolute left-7 top-0 z-[-1] h-[calc(100%_-_2rem)]'>
                  <div
                    className={`h-full w-[3rem] rounded-bl-2xl border-b-2 border-l-2 ${!isPaymentSectionFilled ? "border-primary opacity-0" : "border-green-700 opacity-100"}`}
                  ></div>
                </div>
              ) : null}
              <a className='mt-16 w-full' href='/confirmation'>
                <Button className='h-16 w-full text-xl'
                onClick={ handleFormSubmit }>
                  Rendelés elküldése
                </Button>
              </a>
            </SectionFooter>
          ) : null}
        </SectionContent>
      </Section>
    </Form>
  );
};

export default CheckoutForm;
