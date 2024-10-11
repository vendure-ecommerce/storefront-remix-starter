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

import { useOutletContext } from '@remix-run/react';
import { OutletContext } from '~/types';

enum FormType {
  SignIn = 'signIn',
  SignUp = 'signUp',
  ForgotPassword = 'forgotPassword',
}

const AccountButton = () => {
  const { activeCustomer } = useOutletContext<OutletContext>();
  const [formType, setFormType] = useState<FormType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSheetChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFormType(null);
    }
  };

  const handleFormSuccess = () => {
    setIsOpen(false);
  };

  const renderForm = () => {
    if (activeCustomer) {
      return <>Hello customer</>;
    }

    switch (formType) {
      case FormType.SignUp:
        return <SignUpForm onSuccess={handleFormSuccess} />;
      case FormType.ForgotPassword:
        return <PasswordForm onSuccess={handleFormSuccess} />;
      default:
        return <SignInForm onSuccess={handleFormSuccess} />;
    }
  };

  const renderFormToggle = () => {
    if (formType === FormType.ForgotPassword) {
      return (
        <Button
          className="text-base"
          variant="link"
          size="default"
          onClick={() => setFormType(FormType.SignIn)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Vissza a bejelentkezéshez
        </Button>
      );
    } else if (formType === FormType.SignUp) {
      return (
        <p className="mt-6 text-center">
          Már van fiókod?{' '}
          <button
            type="button"
            onClick={() => setFormType(FormType.SignIn)}
            className="font-bold text-secondary-foreground underline"
          >
            Kattints ide a belépéshez.
          </button>
        </p>
      );
    } else {
      return (
        <p className="mt-6 text-center">
          Nincs fiókod?{' '}
          <button
            type="button"
            onClick={() => setFormType(FormType.SignUp)}
            className="font-bold text-secondary-foreground underline"
          >
            Kattints ide a regisztrációhoz.
          </button>
          <div className="mt-6 text-center">
            <Button
              className="text-base"
              variant="link"
              size="default"
              onClick={() => setFormType(FormType.ForgotPassword)}
            >
              Elfelejtett jelszó
            </Button>
          </div>
        </p>
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2" variant="ghost">
          <User className="h-4 w-4" />
          Fiókom
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-hidden" side="right">
        <ScrollArea className="h-full w-full">
          <SheetHeader className="sticky top-0 z-10 bg-white px-4 py-4">
            <SheetTitle>
              {activeCustomer
                ? 'Fiókom'
                : formType === FormType.ForgotPassword
                ? 'Jelszó visszaállítás'
                : formType === FormType.SignUp
                ? 'Regisztráció'
                : 'Belépés'}
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-8 px-4 pb-4 pt-8">
            <div className="rounded-lg bg-primary/5 p-4">
              {renderForm()}
              {renderFormToggle()}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default AccountButton;
