def all_combinations(string):
  """
  Генерирует все возможные комбинации букв из заданной строки без использования библиотек.

  Args:
    string: Исходная строка.

  Returns:
    Список всех возможных комбинаций.
  """

  result = []
  if len(string) == 0:
    return [""]

  first_char = string[0]
  rest = string[1:]
  words = all_combinations(rest)

  for word in words:
    for i in range(len(word)+1):
      result.append(word[:i] + first_char + word[i:])

  return result

if __name__ == "__main__":

    string = "112"
    result = all_combinations(string)
    print(result)