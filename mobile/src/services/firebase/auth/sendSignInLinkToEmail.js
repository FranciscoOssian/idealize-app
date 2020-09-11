import fireApp from '../fireapp';

const auth = fireApp.auth();

console.log(auth);

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'idealize-app-5f4d2.web.app',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.idealize-app.ios'
    },
    android: {
      packageName: 'com.idealize-app.android',
      installApp: true,
      minimumVersion: '12'
    },
    //dynamicLinkDomain: 'idealize-app-5f4d2.web.app'
  };


const sendSignInLinkToEmail = async (email) => {
    await auth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        console.log(email);
    })
    .catch(function(error) {
        console.log(error);
    });
}

export default sendSignInLinkToEmail;