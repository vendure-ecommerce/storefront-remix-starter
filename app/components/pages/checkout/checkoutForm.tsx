import AddressCard from "~/components/cards/AddressCard";
import SelectCard from "~/components/cards/SelectCard";
import UserCard from "~/components/cards/user/UserCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionDescription from "~/components/common/section/SectionDescription";
import SectionFooter from "~/components/common/section/SectionFooter";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import PointSearchDesktop from "~/components/point-search/PointSearchDesktop";
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

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  // const addressOptions = dummy.addressOptions;

  const [isAccountSectionFilled, setIsAccountSectionFilled] = useState(false);
  const [isShippingSectionFilled, setIsShippingSectionFilled] = useState(false);
  const [isPaymentSectionFilled, setIsPaymentSectionFilled] = useState(false);
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
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
                    onClick={() => setIsAccountSectionFilled(true)}
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
                <Input type='email' id='email' />
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
                />
                Iratkozzon fel híreinkért értékesítéseinkről és újdonságainkról
              </Label>
              <Button
                className='mt-8'
                onClick={() => setIsAccountSectionFilled(true)}
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
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='full-name'>
                        Teljes név
                      </Label>
                      <Input type='text' id='full-name' />
                    </div>
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='address'>
                        Cím
                      </Label>
                      <Input type='text' id='address' />
                    </div>
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='company'>
                        Cégnév
                      </Label>
                      <Input type='text' id='company' />
                    </div>
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='tax-number'>
                        Adószám
                      </Label>
                      <Input type='number' id='tax-number' />
                    </div>
                    <div className='flex gap-6'>
                      <div className='grid w-1/2 items-center'>
                        <Label className='mb-1.5' htmlFor='post-code'>
                          Irányítószám
                        </Label>
                        <Input type='number' id='post-code' />
                      </div>
                      <div className='grid w-1/2 items-center'>
                        <Label className='mb-1.5' htmlFor='county'>
                          Vármegye
                        </Label>
                        <Input type='text' id='county' />
                      </div>
                    </div>
                    <div className='flex gap-6'>
                      <div className='grid w-full items-center'>
                        <Label className='mb-1.5' htmlFor='city'>
                          Város
                        </Label>
                        <Input type='text' id='city' />
                      </div>
                      <div className='grid w-full items-center'>
                        <Label className='mb-1.5' htmlFor='country'>
                          Ország
                        </Label>
                        <Input type='text' id='country' />
                      </div>
                    </div>
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='phone-number'>
                        Telefonszám
                      </Label>
                      <Input type='number' id='phone-number' />
                      <p className='text-[0.8rem] text-muted-foreground'>
                        Csak a rendeléshez kapcsolatos kérdések esetén
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='mb-8 text-lg font-bold'>Szállítási mód</h4>
                  <div className='flex flex-col gap-4'>
                    {/* {isMobile ? null : ( */}
                    <Dialog>
                      <DialogTrigger>
                        <SelectCard
                          title={`Átvételi helyek`}
                          description='Nincs átvételi hely kiválasztva'
                        />
                      </DialogTrigger>
                      <DialogContent className='max-w-screen max-h-screen !rounded-none p-0'>
                        <PointSearchDesktop />
                      </DialogContent>
                    </Dialog>
                    {/* )} */}
                    {[...Array(7)].map((_, index) => (
                      <SelectCard
                        key={index}
                        title={`Postai kiszállítás`}
                        description='Várható kézbesítés: aug. 9. - aug. 15'
                        price='2 000 Ft'
                      />
                    ))}
                  </div>
                </div>
                <Button
                  className='mt-8'
                  onClick={() => setIsShippingSectionFilled(true)}
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
                  {[...Array(3)].map((_, index) => (
                    <SelectCard key={index} title={`Bankkártyás fizetés`} />
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
                  <div className='grid w-full items-center'>
                    <Label className='mb-1.5' htmlFor='billing-full-name'>
                      Teljes név
                    </Label>
                    <Input type='text' id='billing-full-name' />
                  </div>
                  <div className='grid w-full items-center'>
                    <Label className='mb-1.5' htmlFor='billing-address'>
                      Cím
                    </Label>
                    <Input type='text' id='billing-address' />
                  </div>
                  <div className='grid w-full items-center'>
                    <Label className='mb-1.5' htmlFor='billing-company'>
                      Cégnév
                    </Label>
                    <Input type='text' id='billing-company' />
                  </div>
                  <div className='grid w-full items-center'>
                    <Label className='mb-1.5' htmlFor='billing-tax-number'>
                      Adószám
                    </Label>
                    <Input type='number' id='billing-tax-number' />
                  </div>
                  <div className='flex gap-6'>
                    <div className='grid w-1/2 items-center'>
                      <Label className='mb-1.5' htmlFor='billing-post-code'>
                        Irányítószám
                      </Label>
                      <Input type='number' id='billing-post-code' />
                    </div>
                    <div className='grid w-1/2 items-center'>
                      <Label className='mb-1.5' htmlFor='billing-county'>
                        Vármegye
                      </Label>
                      <Input type='text' id='billing-county' />
                    </div>
                  </div>
                  <div className='flex gap-6'>
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='billing-city'>
                        Város
                      </Label>
                      <Input type='text' id='billing-city' />
                    </div>
                    <div className='grid w-full items-center'>
                      <Label className='mb-1.5' htmlFor='billing-country'>
                        Ország
                      </Label>
                      <Input
                        type='text'
                        id='billing-country'
                        onClick={() => setIsPaymentSectionFilled(true)}
                      />
                    </div>
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
              <Button className='h-16 w-full text-xl'>
                Rendelés elküldése
              </Button>
            </a>
          </SectionFooter>
        ) : null}
      </SectionContent>
    </Section>
  );
};
export default CheckoutForm;
