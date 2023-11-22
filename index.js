async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId());
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());

    // save account details in mongoDb;
    const loginUrl = 'http://localhost:8080/api/v1/auth/login';
    const res = await axios.post(loginUrl, { email: profile.getEmail(), name: profile.getName(), image: profile.getImageUrl() });

    if (!res.data.success) window.alert(res.data.message);
    else {
      localStorage.setItem('auth', JSON.stringify(res.data));
    }
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    // remove token from local storage
    localStorage.removeItem('auth');
}