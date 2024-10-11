export const initGoogleSdk = (callback: (response: any) => void) => {
  (window as any).google.accounts.id.initialize({
    client_id: '512253564474-6e13qu1sb2oj3mjnjlpbfashmk1ehh40.apps.googleusercontent.com',
    callback: callback,
    use_fedcm_for_prompt: true,
  });
};

export const renderGoogleButton = () => {
  (window as any).google.accounts.id.renderButton(
    document.getElementById('googleOneTapButton'),
    { theme: 'outline', size: 'large' }
  )
};