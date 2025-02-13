document.addEventListener("DOMContentLoaded", function() {
    // Adicionar produtos à tabela
    const produtos = [
        "CRESPA C/36",
        "ALFACE LISA C/36",
        "AMERICANA Duzia",
        "CHICORIA C/36",
        "ROXA C/36",
        "ESPINAFRE",
        "HIDROPONICA",
        "ACELGA",
        "AGRIÃO COMUM",
        "AGRIAO HIDRO",
        "COUVE M",
        "COENTRO",
        "BROCOLIS C",
        "RABANETE",
        "RUCULA",
        "AIPO DZ",
        "ALHO PORO",
        "SALSA G",
        "SALSINHA",
        "RUCULA HIDRO",
        "ROXA HIDRO",
        "HORTELÃ",
        "MOSTARDA",
        "LISA HIDRO",
        "MISTA HIDRO",
        "ALECRIM",
        "CEBOLINHA",
        "CEBOLA G",
        "BETERRABA",
        "CENOURA",
        "BROCOLIS NINJA",
        "MANGERICÃO",
        "FRISER",
        "ROMANA",
        "TOMATE BDJ",
        "SALVIA",
        "TOMILHO",
        "SERRALHA",
        "RADICHO",
        "TAIOBA",
        "ALMEIRÃO ROXO",
        "CEBOLETE",
        "CAPIM LIMÃO",
        "REPOLHO VERDE",
        "REPOLHO ROXO",
        "ERVA DOCE",
        "MANJERONA",
        "LOURO"
    ];

    const produtosTable = document.getElementById("produtos-table");
    const tbody = produtosTable.tBodies[0];

    produtos.forEach(produto => {
        const row = document.createElement("tr");
        const produtoCell = document.createElement("td");
        const quantidadeCell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.min = 0;
        input.value = 0;
        produtoCell.textContent = produto;
        quantidadeCell.appendChild(input);
        row.appendChild(produtoCell);
        row.appendChild(quantidadeCell);
        tbody.appendChild(row);
    });

    // Gerar planilha
    document.getElementById("gerar-planilha-btn").addEventListener("click", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        
        if (!nome) {
            alert("Por favor, insira seu nome.");
            return;
        }

        const dados = [["NOME", nome], ["Produto", "Quantidade"]];
        const tbody = document.getElementById("produtos-table").tBodies[0];
        produtos.forEach((produto, index) => {
            const row = tbody.rows[index];
            const quantidade = row.cells[1].querySelector("input").value;
            dados.push([produto, quantidade]);
        });

        const csvContent = "data:text/csv;charset=utf-8," + dados.map(e => e.join(";")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pedido_produtos.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const mensagem = `Pedido de ${nome}: ${dados.slice(2).map(e => `${e[0]}: ${e[1]}`).join(", ")}`;
        const whatsappLink = `https://wa.me/5521968132839?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappLink, "_blank");

        alert("Seu pedido foi enviado com sucesso!");
    });
});
