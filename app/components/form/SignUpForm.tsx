import { Chrome, Facebook } from 'lucide-react';
import { Button } from '../ui-custom/MyButton';
import { Input } from '../ui-custom/MyInput';
import { Switch } from '../ui-custom/MySwitch';
import { Label } from '../ui/label';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { action as signUpAction } from '~/routes/api/user/sign-up';
import {
  initFacebookSdk,
  fbLogin,
  getFacebookLoginStatus,
} from '~/utils/fb-sdk';
import { initGoogleSdk, renderGoogleButton } from '~/utils/google-sdk';
import { action as actionWithFacebook } from '~/routes/api/user/sign-in-with-facebook';
import { action as actionWithGoogle } from '~/routes/api/user/sign-in-with-google';

interface ISignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: ISignUpFormProps) => {
  const navigate = useNavigate();
  const signUpFetcher = useFetcher<typeof signUpAction>();
  const fbFetcher = useFetcher<typeof actionWithFacebook>();
  const gFetcher = useFetcher<typeof actionWithGoogle>();

  const onSignUp = async () => {
    const formData = new FormData();
    formData.append(
      'lastName',
      (document.getElementById('last-name') as HTMLInputElement)?.value,
    );
    formData.append(
      'firstName',
      (document.getElementById('first-name') as HTMLInputElement)?.value,
    );
    formData.append(
      'email',
      (document.getElementById('email-address') as HTMLInputElement)?.value,
    );
    formData.append(
      'password',
      (document.getElementById('password') as HTMLInputElement)?.value,
    );
    formData.append(
      'repeatPassword',
      (document.getElementById('repeatPassword') as HTMLInputElement)?.value,
    );
    formData.append('rememberMe', 'true');

    signUpFetcher.submit(formData, {
      method: 'post',
      action: 'api/user/sign-up',
      navigate: false,
    });
  };

  const onFacebookLogin = () => {
    fbLogin().then(async (response: any) => {
      if (response.status === 'connected') {
        const formData = new FormData();
        formData.append('token', response.authResponse.accessToken);
        fbFetcher.submit(formData, {
          method: 'post',
          action: 'api/user/sign-in-with-facebook',
          navigate: false,
        });
      } else {
        console.log('Facebook login failed');
      }
    });
  };

  const onGoogleLogin = async () => {
    try {
      const gLoginBtn = document
        .getElementById('googleOneTapButton')
        ?.querySelector('div[role="button"][aria-labelledby="button-label"]');
      if (gLoginBtn) {
        (gLoginBtn as any).click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleLoginResponse = (response: any) => {
    if (response && response.credential) {
      const formData = new FormData();
      formData.append('token', response.credential);
      gFetcher.submit(formData, {
        method: 'post',
        action: 'api/user/sign-in-with-google',
        navigate: false,
      });
    }
  };

  useEffect(() => {
    if (signUpFetcher.data) {
      onSuccess();
      navigate('/success');
    }
  }, [signUpFetcher.data]);

  useEffect(() => {
    if (fbFetcher.data) {
      onSuccess();
      navigate('/account');
    }
  }, [fbFetcher.data]);

  useEffect(() => {
    if (gFetcher.data) {
      onSuccess();
      navigate('/account');
    }
  }, [gFetcher.data]);

  useEffect(() => {
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response: any) => {
        if (!response) {
          console.log('No Facebook login status available');
        }
      });
    });
    initGoogleSdk(onGoogleLoginResponse);
  }, []);

  useEffect(() => {
    renderGoogleButton();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full items-center">
        <Label className="mb-1.5" htmlFor="last-name">
          Vezetéknév
        </Label>
        <Input name="lastName" type="text" id="last-name" />
      </div>
      <div className="grid w-full items-center">
        <Label className="mb-1.5" htmlFor="first-name">
          Keresztnév
        </Label>
        <Input name="firstName" type="text" id="first-name" />
      </div>
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
        <Input name="password" type="password" id="password" />
      </div>
      <div className="grid w-full items-center">
        <Label className="mb-1.5" htmlFor="repeatPassword">
          Jelszó újra
        </Label>
        <Input name="repeatPassword" type="password" id="repeatPassword" />
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
        <Button type="button" onClick={onSignUp}>
          Fiók létrehozása
        </Button>
        <Button type="button" variant="outline" onClick={onGoogleLogin}>
          <Chrome className="mr-2 h-4 w-4" />
          Folytatás Google fiókkal
        </Button>
        <Button type="button" variant="outline" onClick={onFacebookLogin}>
          <Facebook className="mr-2 h-4 w-4" />
          Folytatás Facebook fiókkal
        </Button>
        <div id="googleOneTapButton" style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default SignUpForm;
