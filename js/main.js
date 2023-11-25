
function playGame() {

  window.location.href = "game.html";
}

document.getElementById("create-room").addEventListener("click", () => {
  nick = document.getElementById("nickname").value;
  if (nick === "") {
    // Выводим предупреждение
    alert("Пожалуйста, введите никнейм");
    return false;
  }

  console.log(nick)
});

document.getElementById("join-room").addEventListener("click", () => {
  nick = document.getElementById("nickname").value;
  if (nick === "") {
    // Выводим предупреждение
    alert("Пожалуйста, введите никнейм");
    return false;
  }

  console.log(nick)
});

document.getElementById("button_create_room").addEventListener("click", () => {
  var hidden_modal = document.getElementById("show_hidd_modal1");
  var name_room = document.getElementById("name_room").value
  var room_key = document.getElementById("room_key").value
  var quy_players = document.getElementById("quy_players").value

  var fail = "Пожалуйста заполните все поля";

  console.log(name_room)
  console.log(room_key)
  console.log(quy_players)

  if (name_room == "" || room_key == "" || quy_players == "")
   alert(fail);

  else if(hidden_modal.classList.contains('modal-all'))
    hidden_modal.style.display = "none";
});

document.getElementById("button_join_room").addEventListener("click", () => {
  var hidden_modal = document.getElementById("show_hidd_modal2");
  var key_join = document.getElementById("key_join").value;

  console.log(key_join)

  if (key_join == "")
    alert("Заполни поле ввода")

  else if (hidden_modal.classList.contains('modal-all')) {
    hidden_modal.style.display = "none";
  }
});

function ShowModal(elId) {
  var modalAll = document.getElementById(elId);
  modalAll.style.display = "flex";
}

function onSignIn() {
  const idToken = googleUser.getAuthResponse().idToken;
  const accessToken = googleUser.getAuthResponse().accessToken;
  const refreshToken = googleUser.getAuthResponse().refreshToken;

  console.log(idToken)
  console.log(accessToken)
  console.log(refreshToken)
}

document.getElementById("button_create_room").addEventListener("click", playGame);