export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        appId: '1543495476258116',
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      });

      (window as any).FB.AppEvents.logPageView();
      // Resolve the promise when the SDK is loaded
      resolve(true);
    };
    (window as any).fbAsyncInit();
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    (window as any).FB.getLoginStatus((response: any) => {
      resolve(response);
    });
  });
};

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    (window as any).FB.login((response: any) => {
      resolve(response)        
    }, { scope: 'email' })
  })
};
