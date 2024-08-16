

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui-custom/MyButton";
import { Input } from "../ui-custom/MyInput";
import { Label } from "../ui/label";

const PasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSent = () => {
    setEmailSent(true);
  };

  return (
    <form className='flex flex-col gap-6'>
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='email-address'>
          Email cím
        </Label>
        <Input type='text' id='email-address' />
      </div>
      <Button onClick={handleEmailSent}>Új jelszó kérése</Button>
      <div className='mt-6 text-center'>
        <Link href='/auth/signup'>
          <Button className='text-base' variant={"link"} size={"default"}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Vissza a bejelentkezésehez
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default PasswordForm;
