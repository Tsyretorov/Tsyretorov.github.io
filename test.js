document.getElementById("join-room").addEventListener("click", () => {
  var nick = document.getElementById("nickname").value
  console.log(nick)
  const roomNameOrKey = document.getElementById("join-room-modal").value;
  if (roomNameOrKey === "") {
    alert("Введите название или ключ комнаты");
    return;
    }
});