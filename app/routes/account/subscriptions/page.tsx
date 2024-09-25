"use client";

import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import PageTitle from "~/components/pages/PageTitle";
import { Button } from "~/components/ui-custom/MyButton";
import { Switch } from "~/components/ui-custom/MySwitch";
import { Avatar } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import { Mail, Newspaper, Trash, UserRoundX } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function Subscriptions() {
  const [inputId, setInputId] = useState<string>();

  useEffect(() => {
    setInputId(`${v4()}_settings`);
  }, []);

  return (
    <>
      <PageTitle title={"Feliratkozások"} />

      <Section>
        <SectionHeader>
          <div className='flex items-center gap-4'>
            <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
              <Mail className='h-7 w-7 text-color-primary-foreground' />
            </Avatar>
            <SectionTitle
              className='text-xl'
              level='h2'
              title='Email értesítések'
            />
          </div>
        </SectionHeader>
        <SectionContent className='flex flex-col gap-8 pl-[4.5rem]'>
          <Label
            className='flex flex-none items-center gap-20 font-normal'
            htmlFor={inputId}
          >
            <Switch id={inputId} name='Értesítés 1' />
            Értesítés 1
          </Label>
          <Label
            className='flex flex-none items-center gap-20 font-normal'
            htmlFor={inputId}
          >
            <Switch id={inputId} name='Értesítés 2' />
            Értesítés 2
          </Label>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <div className='flex items-center gap-4'>
            <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
              <Newspaper className='h-7 w-7 text-color-primary-foreground' />
            </Avatar>
            <SectionTitle className='text-xl' level='h2' title='Hírlevél' />
          </div>
        </SectionHeader>
        <SectionContent className='flex flex-col gap-8 pl-[4.5rem]'>
          <Label
            className='flex flex-none items-center gap-20 font-normal'
            htmlFor={inputId}
          >
            <Switch id={inputId} name='Heti' />
            Heti
          </Label>
          <Label
            className='flex flex-none items-center gap-20 font-normal'
            htmlFor={inputId}
          >
            <Switch id={inputId} name='Havi' />
            Havi
          </Label>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className='text-xl' level='h2' title='' />
          <div className='flex items-center gap-4'>
            <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
              <UserRoundX className='h-7 w-7 text-color-primary-foreground' />
            </Avatar>
            <SectionTitle className='text-xl' level='h2' title='Fiók törlése' />
          </div>
        </SectionHeader>
        <SectionContent className='pl-[4.5rem]'>
          <Button variant={"destructive"}>
            <Trash className='mr-2 h-4 w-4' />
            Vásárlói fiók törlése
          </Button>
        </SectionContent>
      </Section>
    </>
  );
}
