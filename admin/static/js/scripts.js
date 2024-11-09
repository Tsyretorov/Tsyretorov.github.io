window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    $(document).ready(function() {

        $('.delete-btn').click(function() {
            if (confirm('Вы действительно хотите удалить эту строку?')) {
                const id_delete = $(this).data('id');
                // console.log(id_delete)
                $.ajax({
                    url: "/delete/",
                    method: "POST",
                    data: {
                        "id": id_delete
                    },

                success: function(response) {
                    console.log("Данные успешно отправлены:", response);
                    alert('Данные удалены!');
                    location.reload();

                },
                error: function(error) {
                    if (error.status == 500) {
                        alert("Я в вах, такого айди нету обратись разработчику, видимо утечька данных")

                    } else {
                        // console.log(error.status)
                        console.error("Ошибка при отправке данных:", error);
                        alert('Произошла ошибка при удалении данных. Пожалуйста, попробуйте позже.');
                            }
                        }
                    });
                }
            });

        $('.edit-btn').click(function() {
            const button = $(this);
            const row = button.closest('tr');
            const cells = row[0].querySelectorAll('td');

            // console.log(cells)

            const newRowForm = document.createElement('tr');
            newRowForm.innerHTML = `
                <form id="new_form_data">
                    <tr>
                        <td><input type="number" id="id" value="${cells[0].textContent}"></td>
                        <td><input type="text" id="excange_name" value="${cells[1].textContent}"></td>
                        <td><input type="text" id="currency_pair" value="${cells[2].textContent}"></td>
                        <td><input type="number" id="owner_curs" value="${cells[3].textContent}"></td>
                        <td>
                            <button class="save-btn" type="submit">Сохранить</button>
                            <button class="cansel-btn" type="button">Отмена</button>
                        </td>
                    <tr>
                </form>
            `;
            row.replaceWith(newRowForm);

        });

        $('.add-btn').click(function() {
            const tableBody = document.querySelector('#datatablesSimple tbody');

            const newRowForm = document.createElement('tr');
            newRowForm.innerHTML = `
                <form id="new_form_data">
                    <tr>
                      <td><input type="number" id="id" name="id"></td>
                      <td><input type="text" id="excange_name" name="excange_name"></td>
                      <td><input type="text" id="currency_pair" name="currency_pair"></td>
                      <td><input type="number" id="owner_curs" name="owner_curs"></td>
                      <td>
                        <button class="save-btn" type="submit">Сохранить</button>
                        <button class="cansel-btn" type="button">Отмена</button>
                      </td>
                    </tr>
                </form>
              `;

            tableBody.parentNode.insertBefore(newRowForm, tableBody)
        });


        $(document).on('click', '.cansel-btn', function() {
            $(this).closest('tr').remove();
          });

        $(document).on('click', '.save-btn', function() {

            const id = document.getElementById('id').value;
            const excange_name = document.getElementById('excange_name').value;
            const currency_pair = document.getElementById('currency_pair').value;
            const owner_curs = document.getElementById('owner_curs').value;

            $(this).prop('disabled', true).text('Отправка...');
            console.log(id, excange_name, currency_pair, owner_curs)
            $.ajax({
                url: "/add/",
                type: "POST", 
                data: {
                    "id": id,
                    "excange_name": excange_name,
                    "currency_pair": currency_pair,
                    "owner_curs": owner_curs
                },

                success: function(response) {
                    console.log("Данные успешно отправлены:", response);
                    alert('Данные сохранены!');
                    location.reload();

                },
                error: function(error) {
                    if (error.status == 400) {
                        alert("У тебя ошибка при вводе данных (надо в айди число и в курсах)")
                        $(this).closest('tr').remove();
                    } else {
                        // console.log(error.status)
                        console.error("Ошибка при отправке данных:", error);
                        alert('Произошла ошибка при сохранении данных. Пожалуйста, попробуйте позже.');
                        $(this).closest('tr').remove();
                    }
                }
            });
        });
    });
});

