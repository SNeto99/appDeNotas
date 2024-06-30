function fetchItems() {
    $.ajax({
        url: "/notas",
        type: "GET",
    })
        .done((response) => {
            updateItemList(response);
        })
        .fail(() => {
            Swal.fire("Erro", "Erro ao buscar itens.", "error");
        });
}

function updateItemList(items) {
    const converter = new showdown.Converter();
    const listElement = $("#markdownResult");
    listElement.empty();

    if (Array.isArray(items)){
        items.forEach((nota) => {
            const html = converter.makeHtml(nota.texto);
            listElement.append(
                `<li class="list-group-item">
                        <div>${html}</div>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="editItem('${nota.id}')">
                                <i class="fas fa-pencil"></i>
                            </button>
                            <button class="btn-icon" onclick="deleteItem('${nota.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>`
            );
        });
    }
}


function addItem() {
    const text = $("#texto").val();
    if (!text) {
        Swal.fire("Aviso", "Por favor, digite algum texto antes de adicionar.", "warning");
        return;
    }
    $.ajax({
        url: "/notas",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ texto: text })
    }).done(() => {
        $("#texto").val(''); // Limpa o campo de texto após a adição
        fetchItems(); // Atualiza a lista após adicionar
    }).fail(() => {
        Swal.fire("Erro", "Erro ao adicionar item.", "error");
    });
}

function editItem(id) {
    // Primeiro, busca o texto atual do item para preencher na textarea
    $.ajax({
        url: `/notas/${id}`,
        type: "GET"
    }).done((nota) => {
        Swal.fire({
            title: 'Editar item',
            input: 'textarea',
            inputValue: nota.texto, // Define o texto atual como valor inicial
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Você precisa escrever algo!';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/notas/${id}`,
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({ texto: result.value })
                }).done(() => {
                    fetchItems(); // Atualiza a lista após a edição
                }).fail(() => {
                    Swal.fire("Erro", "Erro ao editar item.", "error");
                });
            }
        });
    }).fail(() => {
        Swal.fire("Erro", "Erro ao buscar dados do item para edição.", "error");
    });
}


function deleteItem(id) {
    Swal.fire({
        title: "Você tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/notas/${id}`,
                type: "DELETE",
            })
                .done(() => {
                    fetchItems(); // Refresh list after deleting
                    Swal.fire("Deletado!", "O item foi deletado.", "success");
                })
                .fail(() => {
                    Swal.fire("Erro", "Erro ao deletar item.", "error");
                });
        }
    });
}

$(document).ready(function () {
    fetchItems();
});
