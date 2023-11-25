<?php

// Проверяем, что пользователь отправил файл
if ($_FILES["image"]["error"] !== UPLOAD_ERR_OK) {
  echo "Ошибка при загрузке файла";
  exit;
}

// Получаем путь к загруженному файлу
$image_path = $_FILES["image"]["tmp_name"];

// Сохраняем файл на сервере
move_uploaded_file($image_path, "uploads/" . $_FILES["image"]["name"]);

// Выводим сообщение об успешной загрузке
echo "Файл успешно загружен";

?>