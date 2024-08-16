

import Link from "next/link";
import { Button } from "../ui-custom/MyButton";
import { Input } from "../ui-custom/MyInput";
import { Switch } from "../ui-custom/MySwitch";
import { Label } from "../ui/label";
import { Chrome, Facebook } from "lucide-react";

const SignInForm = () => {
  return (
    <form className='flex flex-col gap-6'>
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
      <div className='flex flex-wrap items-center justify-between gap-8'>
        <Label
          className='flex flex-none items-center gap-4 font-normal'
          htmlFor='remember-me'
        >
          <Switch id='remember-me' name='Megjegyzés 30 napig' />
          Megjegyzés 30 napig
        </Label>
        <Link
          className='font-bold text-secondary-foreground underline'
          href='/auth/password'
        >
          Elfelejtett jelszó
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        <Button>Fiók létrehozása</Button>
        <Button variant={"outline"}>
          <Chrome className='mr-2 h-4 w-4' />
          Folytatás Google fiókkal
        </Button>
        <Button variant={"outline"}>
          <Facebook className='mr-2 h-4 w-4' />
          Folytatás Facebook fiókkal
        </Button>
      </div>
      <p className='mt-6 text-center'>
        Már van fiókod?{" "}
        <Link
          className='font-bold text-secondary-foreground underline'
          href='/auth/signup'
        >
          Kattints ide a belépéshez.
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
