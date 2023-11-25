import os

def get_rooms():
  """Возвращает список всех доступных комнат."""
  rooms = []
  with open("rooms.txt", "r") as f:
    for line in f:
      room = line.split("|")
      rooms.append({
        "id": room[0],
        "name": room[1],
        "password": room[2],
      })
  return rooms

def login(username):
  """Регистрирует пользователя и устанавливает его имя в сессию."""
  with open("users.txt", "a") as f:
    f.write("{}\n".format(username))
  os.environ["username"] = username

def main():
  """Основная функция."""
  if "username" in os.environ:
    # Пользователь уже вошел в систему
    rooms = get_rooms()
    if rooms:
      # Список доступных комнат
      for room in rooms:
        print("<a href='join_room.py?room_id={}'>{}</a>".format(room["id"], room["name"]))
    else:
      # Нет доступных комнат
      print("Нет доступных комнат")
  else:
    # Пользователь не вошел в систему
    print("<form action='login.py' method='post'>")
    print("<input type='text' name='username' placeholder='Имя пользователя'>")
    print("<input type='submit' value='Войти'>")
    print("</form>")

if __name__ == "__main__":
  main()
