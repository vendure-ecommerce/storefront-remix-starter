import { Chrome, Facebook } from 'lucide-react';
import { Button } from '../ui-custom/MyButton';
import { Input } from '../ui-custom/MyInput';
import { Switch } from '../ui-custom/MySwitch';
import { Label } from '../ui/label';
import { Form, useActionData, useFetcher, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { fbLogin, getFacebookLoginStatus, initFacebookSdk } from '~/utils/fb-sdk';
import { action } from '~/routes/api/user/sign-in';
import { action as actionWithFacebook } from '~/routes/api/user/sign-in-with-facebook';
import { action as actionWithGoogle } from '~/routes/api/user/sign-in-with-google';
import { useCustomer } from '~/providers/customer';
import { initGoogleSdk, renderGoogleButton } from '~/utils/google-sdk';

interface ISignInFormProps {
  onSuccess: () => void;
}

const SignInForm = ({ onSuccess }: ISignInFormProps) => {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const fbFetcher = useFetcher<typeof actionWithFacebook>();
  const gFetcher = useFetcher<typeof actionWithGoogle>();
  const { setActiveCustomer } = useCustomer();

  const onFacebookLogin = () => {
    fbLogin().then(async (response: any) => {
      if (response.status === "connected") {
        if (response.status === "connected") {
          try {
            const formData = new FormData();
            formData.append("token", response.authResponse.accessToken);
            fbFetcher.submit(formData, {
              method: "post",
              action: "api/user/sign-in-with-facebook",
              navigate: false,
            });
            
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        // something
      }
    });
  };

  const onGoogleLogin = async () => {
    try {
      const gLoginBtn = document
        .getElementById("googleOneTapButton")
        ?.querySelector('div[role="button"][aria-labelledby="button-label"]');
      if (gLoginBtn) {
        (gLoginBtn as any).click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleLoginResponse = (response: any) => {
    if (response &&response.credential) {
      const formData = new FormData();
      formData.append("token", response.credential);
      gFetcher.submit(formData, {
        method: "post",
        action: "api/user/sign-in-with-google",
        navigate: false,
      });
    }
  };

  useEffect(() => {
    if (actionData && "success" in actionData) {
      onSuccess();
      navigate("/account");
    }
  }, [actionData]);

  useEffect(() => {
    if (fbFetcher.data && "success" in fbFetcher.data) {
      onSuccess();
      navigate("/account");
    }
  }, [fbFetcher.data]);

  useEffect(() => {
    if (gFetcher.data && "success" in gFetcher.data) {
      onSuccess();
      navigate("/account");
    }
  }, [gFetcher.data]);

  useEffect(() => {
    initFacebookSdk()
      .then(() => {
        getFacebookLoginStatus().then(async (response: any) => {
          if (response == null) {
            console.log("No login status for the person");
          } else {
            // 
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    initGoogleSdk(onGoogleLoginResponse);
  }, []);

  useEffect(() => {
    renderGoogleButton();
  }, []);


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
        <Button type="button" variant={'outline'} onClick={onGoogleLogin}>
          <Chrome className="mr-2 h-4 w-4" />
          Folytatás Google fiókkal
        </Button>
        <Button type="button" variant={'outline'} onClick={onFacebookLogin}>
          <Facebook className="mr-2 h-4 w-4" />
          Folytatás Facebook fiókkal
        </Button>
        <div id="googleOneTapButton" style={{ display: "none" }} />
      </div>
    </Form>
  );
};

export default SignInForm;
