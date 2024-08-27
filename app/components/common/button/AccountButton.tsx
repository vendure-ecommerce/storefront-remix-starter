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
import { ChevronDown, User } from 'lucide-react';
import SignInForm from '~/components/form/SignInForm';
import SignUpForm from '~/components/form/SignUpForm';

const AccountButton = () => {
  // State to manage form switching
  const [showSignUp, setShowSignUp] = useState(false);

  // Handler to toggle between SignIn and SignUp forms
  const toggleForm = () => setShowSignUp((prevState) => !prevState);

  return (
    <>
      <Sheet>
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
                {showSignUp ? 'Regisztráció' : 'Belépés'}
              </SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-8 px-4 pb-4 pt-8'>
              <div className='rounded-lg bg-primary/5 p-4'>
                {showSignUp ? (
                  <SignUpForm />
                ) : (
                  <SignInForm />
                )}
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
                </p>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AccountButton;
