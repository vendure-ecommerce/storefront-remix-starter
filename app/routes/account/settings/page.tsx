"use client";

import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import PageTitle from "~/components/pages/PageTitle";
import { Button } from "~/components/ui-custom/MyButton";
import { Input } from "~/components/ui-custom/MyInput";
import { Label } from "~/components/ui/label";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function Settings() {
  const [inputId, setInputId] = useState<string>();

  useEffect(() => {
    setInputId(`${v4()}_settings`);
  }, []);

  return (
    <>
      <PageTitle title={"Személyes adatok"} />

      <Section>
        <SectionHeader className='hidden'>
          <SectionTitle
            className='text-xl'
            level='h2'
            title='Email értesítések'
            srOnly
          />
        </SectionHeader>
        <SectionContent>
          <form className='flex max-w-xl flex-col gap-6'>
            <div className='grid w-full items-center'>
              <Label className='mb-1.5' htmlFor='last-name'>
                Vezetéknév
              </Label>
              <Input type='text' id='last-name' />
            </div>
            <div className='grid w-full items-center'>
              <Label className='mb-1.5' htmlFor='first-name'>
                Keresztnév
              </Label>
              <Input type='text' id='first-name' />
            </div>
            <div className='grid w-full items-center'>
              <Label className='mb-1.5' htmlFor='email-address'>
                Email cím
              </Label>
              <Input type='text' id='email-address' />
            </div>
            <div className='grid w-full items-center'>
              <Label className='mb-1.5' htmlFor='password'>
                Jelszó
              </Label>
              <Input type='password' id='password' />
            </div>
            <Button>változtatások mentése</Button>
          </form>
        </SectionContent>
      </Section>
    </>
  );
}
