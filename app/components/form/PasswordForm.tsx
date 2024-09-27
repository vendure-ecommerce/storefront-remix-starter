import { useEffect } from "react";
import { Button } from "../ui-custom/MyButton";
import { Input } from "../ui-custom/MyInput";
import { Label } from "../ui/label";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { action } from "~/routes/api/user/forgot-password";

interface IPasswordFormProps {
  onSuccess: () => void;
}

const PasswordForm = ({ onSuccess }: IPasswordFormProps) => {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData && "success" in actionData) {
      onSuccess();
      navigate("/success");
    }
  }, [actionData]);

  return (
    <Form
      method='post'
      action='api/user/forgot-password'
      className='flex flex-col gap-6'
    >
      <div className='grid w-full items-center'>
        <Label className='mb-1.5' htmlFor='email-address'>
          Email cím
        </Label>
        <Input name='email' type='text' id='email-address' />
      </div>
      <div className='flex flex-col gap-4'>
        <Button type="submit">Új jelszó kérése</Button>
      </div>
    </Form>
  );
};

export default PasswordForm;
