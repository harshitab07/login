async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId());
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());

    // save account details in mongoDb;
  const loginUrl = 'http://localhost:8080/api/v1/auth/login';
  try {
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: profile.getEmail(),
        name: profile.getName(),
        image: profile.getImageUrl(),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      window.alert(data.message);
    } else {
      const data = await res.json();
      localStorage.setItem('auth', JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error:', error);
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
