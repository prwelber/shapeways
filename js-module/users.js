
var sendData = function sendData (user, url) {
  var http = new XMLHttpRequest();
  http.open('POST', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send(user);
  http.onreadystatechange = function (res) {
    if (res.target.status === 201 && res.target.readyState === 4) {
      console.log('User added');
    }
  }
}

document.getElementById('submit-user').addEventListener('click', function (event) {
  var user = document.getElementById('user').value;
  var email = document.getElementById('email').value;
  var avatar = document.getElementById('avatar').value
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (! re.test(email)) { // email validation
    alert('Hey, do me a favor and enter a valid email!');
    return;
  }

  var user = { 
    user: user,
    email: email,
    avatar: avatar
  }
  user = JSON.stringify(user);
  var url = 'http://localhost:3000/users';
  sendData(user, url);
});
