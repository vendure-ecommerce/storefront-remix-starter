

import { Label } from "../ui/label";
import { Clock, Mail, Phone, Search } from "lucide-react";
import { Input } from "../ui-custom/MyInput";
import { Button } from "../ui-custom/MyButton";
import SelectChip from "../common/chips/SelectChip";
import Section from "../common/section/Section";
import SectionHeader from "../common/section/SectionHeader";
import SectionTitle from "../common/section/SectionTitle";
import SectionContent from "../common/section/SectionContent";
import ShippingAddressCard from "../cards/ShippingAddressCard";
import { ScrollArea } from "../ui-custom/MyScrollArea";

const PointSearchDesktop = () => {
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-[30rem_1fr]'>
      <aside className='relative z-20 order-2 flex h-4/6 flex-col overflow-x-hidden bg-white lg:order-1 lg:h-full'>
        {/* CÍMVÁLASZTÓ */}
        <ScrollArea className='w-full whitespace-nowrap'>
          <Section className='pb-28 pr-2'>
            {/* FEJLÉC */}
            <SectionHeader className='hidden gap-4 p-4 lg:flex'>
              <SectionTitle
                className='order-last text-3xl font-bold'
                level='h2'
                title='Átvétel és szállítás'
              />
              {/* <button className='flex h-16 w-16 items-center justify-center rounded-full border'>
                <span className='sr-only'>Bezárás</span>
                <i>
                  <svg xmlns='http://www.w3.org/2000/svg' height='40' width='40'>
                    <path d='M20 33.333 6.667 20 20 6.667 21.958 8.625 11.958 18.625H33.333V21.375H11.958L21.958 31.375Z' />
                  </svg>
                </i>
              </button> */}
            </SectionHeader>

            {/* KERESŐ */}
            <div className='static z-10 flex w-full items-center gap-4 bg-transparent p-4 lg:sticky lg:bg-white'>
              {/* BEZÁRÁS */}
              {/* <button className='flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white lg:hidden'>
                <span className='sr-only'>Bezárás</span>
                <i>
                  <svg xmlns='http://www.w3.org/2000/svg' height='40' width='40'>
                    <path d='M20 33.333 6.667 20 20 6.667 21.958 8.625 11.958 18.625H33.333V21.375H11.958L21.958 31.375Z' />
                  </svg>
                </i>
              </button> */}

              <div className='w-full'>
                {/* INPUT */}
                <div>
                  <Label className='sr-only' htmlFor='category-filter-serach'>
                    Cím keresése
                  </Label>
                  <div className='relative flex-grow'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <Search className='h-6 w-6' />
                    </div>
                    <Input
                      className='h-[3.25rem] rounded-full pl-[3rem]'
                      id='category-filter-serach'
                      type='text'
                      placeholder='Cím keresése'
                      name='Cím keresése'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* HELYEK LISTÁJA */}
            <div className='space-y-4 pt-4'>
              {/* MENTETT CÍMEK */}
              <Section className='flex flex-col gap-4'>
                <SectionHeader>
                  <SectionTitle
                    className='px-4 font-medium text-color-tertiary'
                    level='h3'
                    title='Mentett címek'
                  />
                </SectionHeader>
                <SectionContent className='grid grid-cols-1 border-b'>
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <ShippingAddressCard
                        title='Házhozszállítás'
                        description='address.address'
                        isFreeShipping
                      />
                    </div>
                  ))}
                </SectionContent>
              </Section>

              {/* BOLTI ÁTVÉTEL */}
              <Section className='flex flex-col gap-4'>
                <SectionHeader>
                  <SectionTitle
                    className='px-4 font-medium text-color-tertiary'
                    level='h3'
                    title='Bolti átvétel'
                  />
                </SectionHeader>
                <SectionContent className='grid grid-cols-1 border-b'>
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <ShippingAddressCard
                        title='address.name'
                        description='address.address'
                        isFreeShipping
                      />
                    </div>
                  ))}
                </SectionContent>
              </Section>

              {/* ÁTVÉTELI HELYEK */}
              <Section className='flex flex-col gap-4'>
                <SectionHeader>
                  <SectionTitle
                    className='px-4 font-medium text-color-tertiary'
                    level='h3'
                    title='Átvételi helyek'
                  />
                </SectionHeader>
                <SectionContent className='grid grid-cols-1 border-b'>
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <ShippingAddressCard
                        title='address.name'
                        description='address.address'
                        price='1 000 Ft'
                      />
                    </div>
                  ))}
                </SectionContent>
              </Section>
            </div>
          </Section>
        </ScrollArea>

        {/* PROFIL */}
        <section
          className='absolute z-10 h-full w-full flex-grow translate-x-full overflow-y-scroll bg-white px-4 pb-28 transition duration-300 ease-in-out'
          id='profile'
        >
          <div className='flex flex-col gap-4 px-4 pt-4'>
            {/* BEZÁRÁS */}
            <button
              className='absolute right-4 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white'
              id='close-profile'
            >
              <span className='sr-only'>Bezárás</span>
              <i>
                <svg xmlns='http://www.w3.org/2000/svg' height='40' width='40'>
                  <path d='M10.458 31.458 8.542 29.542 18.042 20 8.542 10.458 10.458 8.542 20 18.042 29.542 8.542 31.458 10.458 21.958 20 31.458 29.542 29.542 31.458 20 21.958Z' />
                </svg>
              </i>
            </button>
            {/* KIEMELT KÉP */}
            <picture className='-mx-4 -mb-12 flex-none'>
              <img
                className='aspect-video w-full bg-black bg-opacity-10 object-cover object-center'
                src={""}
                alt={""}
              />
            </picture>
            {/* ALAPADATOK */}
            <div className='relative flex flex-col gap-2'>
              <picture className='flex-none'>
                <img
                  className='h-16 w-16 rounded-lg border border-black border-opacity-5 bg-black bg-opacity-10 object-cover object-center'
                  src=''
                  alt={""}
                  id='profile-parcel-image'
                />
              </picture>
              <div className='flex gap-4'>
                <div className='flex-auto'>
                  <h3 className='font-medium' id='profile-parcel-name'></h3>
                  <div
                    className='text-sm font-medium text-black text-opacity-50'
                    id='profile-parcel-address'
                  ></div>
                  <div
                    className='text-green-700'
                    id='profile-parcel-time'
                  ></div>
                </div>
                <div className='flex w-20 flex-none flex-col text-right'>
                  <div className='font-medium' id='profile-parcel-price'></div>
                  <div
                    className='text-sm opacity-50'
                    id='profile-parcel-distance'
                  ></div>
                </div>
              </div>
            </div>
            {/* TELEFONSZÁM */}
            <div className='flex items-start gap-8'>
              <span className='sr-only'>Telefonszám</span>
              <Phone className='h-5 w-5' />
              <a
                className='dark:text-on-dark no-underline hover:underline focus:underline'
                id='phone'
              ></a>
            </div>
            {/* EMAIL CÍM */}
            <div className='flex items-start gap-8'>
              <span className='sr-only'>Email</span>
              <Mail className='h-5 w-5' />
              <a
                className='dark:text-on-dark no-underline hover:underline focus:underline'
                id='email'
              ></a>
            </div>
            {/* NYITVA TARTÁS */}
            <div className='mt-auto flex items-start gap-8' id='open'>
              <span className='sr-only'>Nyitvatartás</span>
              <Clock className='h-5 w-5' />
              <div>
                <div className='flex'>
                  <div className='w-24'>Hétfő</div>
                  <div className='w-24' id='monday'></div>
                </div>
                <div className='flex'>
                  <div className='w-24'>Kedd</div>
                  <div className='w-24' id='tuesday'></div>
                </div>
                <div className='flex'>
                  <div className='w-24'>Szerda</div>
                  <div className='w-24' id='wednesday'></div>
                </div>
                <div className='flex'>
                  <div className='w-24'>Csütörtök</div>
                  <div className='w-24' id='thursday'></div>
                </div>
                <div className='flex'>
                  <div className='w-24'>Péntek</div>
                  <div className='w-24' id='friday'></div>
                </div>
                <div className='flex'>
                  <div className='w-24'>Szombat</div>
                  <div className='w-24' id='saturday'></div>
                </div>
                <div className='flex'>
                  <div className='w-24'>Vasárnap</div>
                  <div className='w-24' id='sunday'></div>
                </div>
              </div>
            </div>
            {/* SZOLGÁLTATÁSOK */}
            <div className='flex items-center'>
              <div className='flex h-8 items-center rounded-full border border-black border-opacity-20 px-3'>
                <div className='block text-sm font-medium text-black text-opacity-70'>
                  Bankkártyás fizetés
                </div>
              </div>
            </div>
            {/* AKCIÓGOMBOK */}
            {/* <footer className='flex justify-end gap-4 border-t border-dashed border-opacity-20 pt-4'>
              <button className='flex h-10 flex-none cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white px-3'>
                <svg
                  className='h-6 w-6 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  width='24'
                >
                  <path d='M7 17.95 12 15.8 17 17.95V5Q17 5 17 5Q17 5 17 5H7Q7 5 7 5Q7 5 7 5ZM5 21V5Q5 4.175 5.588 3.587Q6.175 3 7 3H17Q17.825 3 18.413 3.587Q19 4.175 19 5V21L12 18ZM17 5H12H7Q7 5 7 5Q7 5 7 5H17Q17 5 17 5Q17 5 17 5Z' />
                </svg>
                <span>Hely mentése</span>
              </button>
              <a
                target='_parent'
                className='flex h-10 flex-auto cursor-pointer items-center justify-center rounded-md border bg-white px-3'
                id='direction'
              >
                Útvonaltervezés
              </a>
            </footer> */}
          </div>
        </section>

        {/* GLOBÁLIS MŰVELET */}
        <div className='absolute bottom-0 z-20 my-6 flex w-full items-center justify-center px-6'>
          <Button className='mx-auto h-16 w-full rounded-full bg-brand font-bold uppercase text-white shadow-md transition ease-in-out hover:bg-brand hover:shadow-xl'>
            Átvétel itt
          </Button>
        </div>
      </aside>

      {/* VIZUALIZÁCIÓ */}
      <div className='relative z-0 order-1 h-96 lg:order-2 lg:grid lg:h-screen lg:grid-rows-[auto_1fr]'>
        {/* BEÁLLÍTÁSOK DESKTOP */}
        <div className='absolute bottom-0 z-20 col-span-full row-auto block h-auto w-full space-y-4 lg:relative lg:top-0 lg:-mb-[6rem]'>
          <div className='flex h-[4rem] items-center gap-8 overflow-auto bg-white px-4'>
            {/* SZŰRŐ */}
            <ScrollArea className='w-full whitespace-nowrap'>
              <div className='flex flex-none gap-2 overflow-auto'>
                <SelectChip label='Postapont'></SelectChip>
                <SelectChip label='Foxpost'></SelectChip>
                <SelectChip label='Pick Pack Pont'></SelectChip>
                <SelectChip label='Express One'></SelectChip>
                <SelectChip label='GLS'></SelectChip>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* TÉRKÉP */}
        <div className='relative z-0 row-span-1 flex h-full items-center justify-center bg-black bg-opacity-10'>
          <iframe
            className='absolute inset-0 h-full w-full'
            src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21580.111544927568!2d19.098700800000003!3d47.46041345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1shu!2shu!4v1715099963750!5m2!1shu!2shu'
            width='600'
            height='450'
            /* style='border:0;' */
            /* allowfullscreen='' */
            loading='lazy'
            /* referrerpolicy='no-referrer-when-downgrade' */
          ></iframe>
          <div className='relative z-0 h-full w-full' id='map'></div>
        </div>

        {/* NÉZETVÁLASZTÓ */}
        {/* <div className='absolute bottom-10 left-0 right-0 z-20 mx-auto hidden items-center justify-center'>
          <button className='flex h-14 cursor-pointer items-center gap-2 rounded-full border bg-white px-3 shadow-lg transition duration-150 ease-in-out hover:shadow-2xl'>
            <svg
              className='h-6 w-6 fill-current text-blue-400'
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              width='24'
            >
              <path d='M15 21 9 18.9 4.35 20.7Q3.85 20.9 3.425 20.587Q3 20.275 3 19.75V5.75Q3 5.425 3.188 5.175Q3.375 4.925 3.7 4.8L9 3L15 5.1L19.65 3.3Q20.15 3.1 20.575 3.412Q21 3.725 21 4.25V18.25Q21 18.575 20.812 18.825Q20.625 19.075 20.3 19.2ZM14 18.55V6.85L10 5.45V17.15Z' />
            </svg>
            <span>Térképes nézet</span>
          </button>

          <button className='flex h-14 cursor-pointer items-center gap-2 rounded-full border bg-white px-3 shadow-lg transition duration-150 ease-in-out hover:shadow-2xl'>
            <svg
              className='h-6 w-6 fill-current text-blue-400'
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              width='24'
            >
              <path d='M3 9V5H7V9ZM8 9V5H21V9ZM8 14V10H21V14ZM8 19V15H21V19ZM3 19V15H7V19ZM3 14V10H7V14Z' />
            </svg>
            <span>Listanézet</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PointSearchDesktop;
