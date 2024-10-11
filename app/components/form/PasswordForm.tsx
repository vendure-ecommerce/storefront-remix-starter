import { useEffect } from 'react';
import { Button } from '../ui-custom/MyButton';
import { Input } from '../ui-custom/MyInput';
import { Label } from '../ui/label';
import { useFetcher, useNavigate } from '@remix-run/react';
import { action as forgotPasswordAction } from '~/routes/api/user/forgot-password';

interface IPasswordFormProps {
  onSuccess: () => void;
}

const PasswordForm = ({ onSuccess }: IPasswordFormProps) => {
  const navigate = useNavigate();
  const forgotPasswordFetcher = useFetcher<typeof forgotPasswordAction>();

  useEffect(() => {
    if (forgotPasswordFetcher.data) {
      onSuccess();
      navigate('/success');
    }
  }, [forgotPasswordFetcher.data]);

  const onForgotPassword = () => {
    const formData = new FormData();
    formData.append(
      'email',
      (document.getElementById('email-address') as HTMLInputElement)?.value,
    );

    forgotPasswordFetcher.submit(formData, {
      method: 'post',
      action: 'api/user/forgot-password',
      navigate: false,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full items-center">
        <Label className="mb-1.5" htmlFor="email-address">
          Email cím
        </Label>
        <Input name="email" type="text" id="email-address" />
      </div>
      <div className="flex flex-col gap-4">
        <Button type="button" onClick={onForgotPassword}>
          Új jelszó kérése
        </Button>
      </div>
    </div>
  );
};

export default PasswordForm;
