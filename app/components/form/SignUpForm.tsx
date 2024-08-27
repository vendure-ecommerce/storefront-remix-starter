import { Chrome, Facebook } from 'lucide-react';
import { Button } from '../ui-custom/MyButton';
import { Input } from '../ui-custom/MyInput';
import { Switch } from '../ui-custom/MySwitch';
import { Label } from '../ui/label';
import { Form } from '@remix-run/react';

const SignUpForm = () => {
  return (
    <Form method="post" action="api/user/sign-up" className='flex flex-col gap-6'>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='last-name'>
          Vezetéknév
        </Label>
        <Input name='lastName' type='text' id='last-name' />
      </div>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='first-name'>
          Keresztnév
        </Label>
        <Input name='firstName' type='text' id='first-name' />
      </div>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='email-address'>
          Email cím
        </Label>
        <Input name='email' type='text' id='email-address' />
      </div>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='password'>
          Jelszó
        </Label>
        <Input name='password' type='password' id='password' />
      </div>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='repeatPassword'>
          Jelszú újra
        </Label>
        <Input name='repeatPassword' type='password' id='repeatPassword' />
      </div>
      <div className='flex flex-wrap items-center justify-between gap-8'>
        <Label
          className='flex flex-none items-center gap-4 font-normal'
          htmlFor='remember-me'
        >
          <Switch id='remember-me' name='remember-me' />
          Megjegyzés 30 napig
        </Label>
        <a
          className="font-bold text-secondary-foreground underline"
          href="/auth/password"
        >
          Elfelejtett jelszó
        </a>
      </div>
      <div className='flex flex-col gap-4'>
        <Button type="submit">Fiók létrehozása</Button>
        <Button variant={"outline"}>
          <Chrome className='mr-2 h-4 w-4' />
          Folytatás Google fiókkal
        </Button>
        <Button variant={"outline"}>
          <Facebook className='mr-2 h-4 w-4' />
          Folytatás Facebook fiókkal
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
