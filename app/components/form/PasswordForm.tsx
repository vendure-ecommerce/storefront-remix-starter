import { useState } from "react";
import { Button } from "../ui-custom/MyButton";
import { Input } from "../ui-custom/MyInput";
import { Label } from "../ui/label";
import { Form } from "@remix-run/react";

const PasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSent = () => {
    setEmailSent(true);
  };

  return (
    <Form method='post' action='api/user/forgot-password' className='flex flex-col gap-6'>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='email-address'>
          Email cím
        </Label>
        <Input name='email' type='text' id='email-address' />
      </div>
      <Button onClick={handleEmailSent}>Új jelszó kérése</Button>
    </Form>
  );
};

export default PasswordForm;
