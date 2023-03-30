document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const resultado = document.querySelector("#resultado");
  const tabelaProduto = document.querySelector("#tabela-produto");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    resultado.textContent = "Buscando informações...";

    const inputProduto = document.querySelector("#produto");
    const produto = inputProduto.value;

    const url = `https://cors-anywhere.herokuapp.com/https://www.agalerianerd.com.br/?view=ecom/item&tcg=1&card=${produto}`;
    const response = await fetch(url, { mode: "cors" });

    if (response.ok) {
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const nomeElement = doc.querySelector(".nome_pt_cards");
      const nome = nomeElement ? nomeElement.textContent.trim() : null;

      const priceElement = doc.querySelector(
        ".table-cards-body-cell.card-preco"
      );
      const price = priceElement
        ? priceElement.lastChild.textContent.trim()
        : null;

      const stockElement = doc.querySelector(
        ".table-cards-row .table-cards-body-cell:nth-child(5)"
      );
      const stock = stockElement ? stockElement.textContent.trim() : null;

      const imgElement = doc.querySelector(".card-foto img");
      const img = imgElement ? imgElement.getAttribute("src") : null;

      if (nome || price || stock || img) {
        const table = document.createElement("table");
        table.classList.add("tabela-produto");

        const rowNome = document.createElement("tr");
        const cellNome = document.createElement("td");
        cellNome.textContent = "Nome:";
        const valueNome = document.createElement("td");
        valueNome.textContent = nome;
        rowNome.appendChild(cellNome);
        rowNome.appendChild(valueNome);

        const rowPrice = document.createElement("tr");
        const cellPrice = document.createElement("td");
        cellPrice.textContent = "Preço:";
        const valuePrice = document.createElement("td");
        valuePrice.textContent = price;
        rowPrice.appendChild(cellPrice);
        rowPrice.appendChild(valuePrice);

        const rowStock = document.createElement("tr");
        const cellStock = document.createElement("td");
        cellStock.textContent = "Estoque:";
        const valueStock = document.createElement("td");
        valueStock.textContent = stock;
        rowStock.appendChild(cellStock);
        rowStock.appendChild(valueStock);

        const rowImg = document.createElement("tr");
        const cellImg = document.createElement("td");
        cellImg.textContent = "Imagem:";
        const valueImg = document.createElement("td");
        const imgTag = document.createElement("img");
        imgTag.src = img;
        valueImg.appendChild(imgTag);
        rowImg.appendChild(cellImg);
        rowImg.appendChild(valueImg);

        table.appendChild(rowNome);
        table.appendChild(rowPrice);
        table.appendChild(rowStock);
        table.appendChild(rowImg);

        tabelaProduto.innerHTML = "";
        tabelaProduto.appendChild(table);

        resultado.textContent = "";
      } else {
        resultado.textContent = "Produto não encontrado.";
      }
    } else {
      resultado.textContent =
        "Erro ao buscar informações: " +
        response.status +
        " " +
        response.statusText;
    }
  });
});
