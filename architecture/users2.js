
var username = document.getElementsByClassName('username')[0];
var actions = document.getElementsByClassName('actions');

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

var clickUsername = function clickUsername (element) {
  element.addEventListener('click', function(event) {
    appendButton();
  });
}

var clickImage = function clickImage () {
  appendButton();
  var avatar = document.getElementsByClassName('avatar')[0];
  var check = document.getElementById('input-avatar');
  // if the avatar input box doesn't exist
  if (check === null) {
    var input = document.createElement('input');
    input.placeholder = 'paste url and press enter';
    input.setAttribute('id', 'input-avatar');
    input.style.width = '15%';
    document.body.appendChild(input);
    input.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        // if enter key is pressed, change avatar div background image
        avatar.style.backgroundImage = "url("+input.value+")";
      }
    });
  }
}

var submitChanges = function submitChanges () {
  var username = document.getElementsByClassName('username')[0].textContent;
  var email = document.getElementById('contact').textContent;
  var follow = document.getElementById('follow').textContent;
  var twitter = document.getElementById('twitter').textContent;
  var avatar = document.getElementById('input-avatar');
  // ternary says if avatar is null (doesn't exist), use placeholder image
  avatar === null ? avatar = 'http://www.sut.org/wp-content/uploads/2014/06/avatar_placeholder.svg' : avatar = avatar.value;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (! re.test(email)) { // email validation
    alert('Hey, do me a favor and enter a valid email!');
    return;
  }

  var user = { 
    username: username,
    email: email,
    follow: follow,
    twitter: twitter,
    avatar: avatar
  }
  user = JSON.stringify(user); // convert user object to JSON to send to server
  var url = 'http://localhost:3000/users';
  console.log('user', user);
  sendData(user, url);
}

var appendButton = function appendButton () {
  var check = document.getElementById('submit-user-changes');
  if (check === null) {
    var button = document.createElement('button');
    button.textContent = 'Submit';
    button.setAttribute('id', 'submit-user-changes')
    var box = document.getElementsByClassName('box');
    box[0].appendChild(button);
    button.addEventListener('click', function(event) {
      submitChanges();
    });
  }
}

var addEventToActions = function addEventToActions (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function(event) {
      appendButton();
    });
  }
}

var changeAvatar = function changeAvatar () {
  var avatar = document.getElementsByClassName('avatar')[0];
  avatar.addEventListener('click', function (event) {
    clickImage();
  });
}

// invoke functions
clickUsername(username);
addEventToActions(actions);
changeAvatar();

