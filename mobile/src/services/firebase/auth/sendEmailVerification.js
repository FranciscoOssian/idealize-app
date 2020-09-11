import fireApp from '../fireapp';


const sendEmailVerification = async() => {
    fireApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        const actionCodeSettings = {
          url: 'idealize-app-5f4d2.web.app/?email=' + user.email,
          iOS: {
            bundleId: 'com.idealize-app.ios'
          },
          android: {
            packageName: 'com.idealize-app.android',
            installApp: true,
            minimumVersion: '12'
          },
          handleCodeInApp: true,
          dynamicLinkDomain: "com.idealize-app.android"
        };


        return user.sendEmailVerification(actionCodeSettings)
          .then(function() {
            console.log('email sent');
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        // No user is signed in.
      }
    });
}

export default sendEmailVerification;