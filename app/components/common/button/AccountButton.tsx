import { useState } from 'react';
import { Button } from '~/components/ui-custom/MyButton';
import { ScrollArea } from '~/components/ui-custom/MyScrollArea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui-custom/MySheet';
import { ChevronDown, User, ArrowLeft } from 'lucide-react';
import SignInForm from '~/components/form/SignInForm';
import SignUpForm from '~/components/form/SignUpForm';
import PasswordForm from '~/components/form/PasswordForm';

const AccountButton = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setShowSignUp((prevState) => !prevState);

  const handleSheetChange = (open: boolean | ((prevState: boolean) => boolean)) => {
    setIsOpen(open);
    if (!open) {
      setShowSignUp(false);
      setShowPasswordForm(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowPasswordForm(true);
    setShowSignUp(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleSheetChange}>
        <SheetTrigger asChild>
          <Button className='flex items-center gap-2' variant={'ghost'}>
            <User className='h-4 w-4' />
            Fiókom
            <ChevronDown className='h-4 w-4' />
          </Button>
        </SheetTrigger>
        <SheetContent className='overflow-hidden' side={'right'}>
          <ScrollArea className='h-full w-full'>
            <SheetHeader className='sticky top-0 z-10 bg-white px-4 py-4'>
              <SheetTitle className='flex items-center gap-2'>
                {showPasswordForm ? 'Jelszó visszaállítás' : showSignUp ? 'Regisztráció' : 'Belépés'}
              </SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-8 px-4 pb-4 pt-8'>
              <div className='rounded-lg bg-primary/5 p-4'>
                {showPasswordForm ? (
                  <PasswordForm />
                ) : showSignUp ? (
                  <SignUpForm />
                ) : (
                  <SignInForm />
                )}
                {showPasswordForm ? (
                  <div className='mt-6 text-center'>
                    <Button className='text-base' variant={"link"} size={"default"} onClick={() => setShowPasswordForm(false)}>
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Vissza a bejelentkezéshez
                    </Button>
                  </div>
                ) : (
                  <p className='mt-6 text-center'>
                    {showSignUp ? (
                      <>
                        Már van fiókod?{' '}
                        <button
                          type='button'
                          onClick={toggleForm}
                          className='font-bold text-secondary-foreground underline'
                        >
                          Kattints ide a belépéshez.
                        </button>
                      </>
                    ) : (
                      <>
                        Nincs fiókod?{' '}
                        <button
                          type='button'
                          onClick={toggleForm}
                          className='font-bold text-secondary-foreground underline'
                        >
                          Kattints ide a regisztrációhoz.
                        </button>
                      </>
                    )}
                    {!showSignUp && !showPasswordForm && (
                      <div className='mt-6 text-center'>
                        <Button className='text-base' variant={"link"} size={"default"} onClick={handleForgotPasswordClick}>
                          Elfelejtett jelszó
                        </Button>
                      </div>
                    )}
                  </p>
                )}
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AccountButton;
