function cantidadResultados(results) {
  const totalResultados = document.querySelector(".title_resultados");
  const cantidadResultadosEl = document.querySelector(".result_count");
  cantidadResultadosEl.textContent = results;
  totalResultados.appendChild(cantidadResultadosEl);
}

function renderResultados(results) {
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#result_item_template");
  contenedor.innerHTML = "";

  for (const item of results) {
    const titleEl = template.content.querySelector(
      ".result_item_content_title"
    );
    titleEl.textContent = item.title;

    const conditionEl = template.content.querySelector(
      ".result_item_content_condition"
    );
    conditionEl.textContent = item.condition;

    const imagenLinkEl = template.content.querySelector(".result_item_link");
    imagenLinkEl.href = item.permalink;

    const imagenEl = template.content.querySelector(".result_item_img");
    imagenEl.src = item.thumbnail;

    const cantidadVendidosEl = template.content.querySelector(
      ".result_item_content_sell_count_number"
    );
    cantidadVendidosEl.textContent = item.sold_quantity;

    const precioEl = template.content.querySelector(
      ".result_item_price_number"
    );
    precioEl.textContent = item.price;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".form_search");
  formEl.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const palabra = evento.target.search.value;
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${palabra}`)
      .then((response) => response.json())
      .then((jsonData) => {
        renderResultados(jsonData.results);
        cantidadResultados(jsonData.paging.total);
      });
  });
}

main();
