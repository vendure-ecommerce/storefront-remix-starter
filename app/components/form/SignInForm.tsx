import { Chrome, Facebook } from 'lucide-react';
import { Button } from '../ui-custom/MyButton';
import { Input } from '../ui-custom/MyInput';
import { Switch } from '../ui-custom/MySwitch';
import { Label } from '../ui/label';
import { Form } from '@remix-run/react';

const SignInForm = () => {
  return (
    <Form method="post" action="api/user/sign-in" className="flex flex-col gap-6">
      <div className="grid w-full items-center">
        <Label className="mb-1.5" htmlFor="email-address">
          Email cím
        </Label>
        <Input name="email" type="text" id="email-address" />
      </div>
      <div className="grid w-full items-center">
        <Label className="mb-1.5" htmlFor="password">
          Jelszó
        </Label>
        <Input type="password" id="password" name="password" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-8">
        <Label
          className="flex flex-none items-center gap-4 font-normal"
          htmlFor="remember-me"
        >
          <Switch id="remember-me" name="rememberMe" />
          Megjegyzés 30 napig
        </Label>
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit">Belépés</Button>
        <Button variant={'outline'}>
          <Chrome className="mr-2 h-4 w-4" />
          Folytatás Google fiókkal
        </Button>
        <Button variant={'outline'}>
          <Facebook className="mr-2 h-4 w-4" />
          Folytatás Facebook fiókkal
        </Button>
      </div>
    </Form>
  );
};

export default SignInForm;
