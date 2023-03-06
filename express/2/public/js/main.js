let products;
 

function getData() {
    $.ajax({
        type: "get",
        url: "/products-page/getProducts",
        success(data) {
            console.log(data);
            products = data
            renderTable(products)
        },
        error(err) {
            console.log(err);
        },
        async: false
    });

}

getData()
// const newProduct = {
//     "name": "q",
//     "date": "1401",
//     "id": 7822
// };

function renderTable(products) {
    const thead = $('thead');
    const tbody = $('tbody');
    tbody.html('');
    thead.html('');

    let data = [...Object.keys(products[0])]
    let tableColumns = $.map(data, function (column) {

        if (column === 'row') return `<th>${column}</th>`;

        return `<th>${column}</th>`;

    }).join('')

    thead.html(`<tr>${tableColumns}</tr>`);

    let tableBody

    for (const item of products) {
        tableBody += `
        <tr onclick="renderReadProduct(${item.id})">
          <td>${item.id}</td>
          <td>${item.title?item.title:'--'}</td>
          <td>${item.price?item.price.toLocaleString():'--'}</td>
          <td>${item.rating?item.rating:'--'}</td>
          <td>${item.stock?item.stock:'--'}</td>
          <td>${item.brand?item.brand:'--'}</td>
          <td>${item.category?item.category:'--'}</td>
        </tr>`;
    }

    tbody.html(`${tableBody}`)
}

// function renderReadProduct(productId) {
//     window.open(`productPage?id=${productId}`);

// }

function renderReadProduct(productId) {
    resetModal();
    const product = products.find(item => item.id === productId);
    console.log(product, productId, products)
    modalHeader.text('Product info');
    modalBody.html(Object.keys(product).map(property => `<p><strong>${property}:</strong> ${product[property]}</p>`)
        .join(''))

    modalFooter.html(`
      <button class="button addData" onclick="renderUpdateProduct(${productId})">update</button>
      <button class="button" onclick="deleteProduct(${productId})">delete</button>`);

    modalOpen();

}

function deleteProduct(productId) {

    $.ajax({
        type: "delete",
        url: `products-page/remove-product/${productId}`,
        success(data) {
            console.log('msg is==>', data);
        },
        error(err) {
            console.log('msg is==>', err);
        },
        async: false
    });

    modalClose();
    location.reload()
    // getData();
    // modalClose();
}

function renderUpdateProduct(productId) {
    resetModal();

    const product = products.find(item => item.id === productId);
    modalHeader.text('Update product');

    modalBody.html(Object.keys(product)
        .map(property => {
            if (property === 'id') {
                return `<input type="text" id="${property}" class="updateInputs" value="${product[property]}" placeholder="${property}" disabled/>`;
            }

            return `<input type="text" id="${property}" class="updateInputs" value="${product[property]}" placeholder="${property}"/>`;
        })
        .join(''))

    modalFooter.html(`
          <button class="button addData" onclick="updateProduct(${productId})">save</button>
          <button class="button" onclick="renderReadProduct(${productId})">cancel</button>`);
}

function updateProduct(productId) {
    let product = products.find(user => user.id === productId);
    const updateInputs = $("input[class='updateInputs']");
    console.log(updateInputs)

    for (const input of updateInputs) {
        if (input.value.trim() === '') return alert('invalid input');

        if (input.id === 'id') {
            product[input.id] = Number(input.value);
            continue;
        }

        product[input.id] = input.value;
    }

    console.log(product)
    $.ajax({
        type: "put",
        url: `products-page/update-product/${productId}`,
        data: product,
        success(response) {
            console.log('msg is==>', response);
        },
        error(err) {
            console.log('msg is==>', err);
        },
        async: false
    });

    modalClose();
    location.reload()
    // getData();
}

function addNewProduct() {
    resetModal();

    modalHeader.text('Add new Product');
    let properties = [
        "id",
        "title",
        "price",
        "rating",
        "stock",
        "brand",
        "category"
    ];


    modalBody.html(properties.map(property => {
            if (property === 'id') {
                return `<input type="number" min="0" id="${property}" class="createInputs" value="" placeholder="${property}"/>`;
            }

            return `<input type="text" id="${property}" class="createInputs" value="" placeholder="${property}"/>`;
        })
        .join(''));

    modalFooter.html(`<button class="button addData" onclick="saveNewProduct()">save</button>`);

    modalOpen();
}


function saveNewProduct() {
    const createInputs = $("input[class='createInputs']");
    let newProduct = {};

    for (const input of createInputs) {
        if (input.value.trim() === '') return alert('invalid input');

        if (input.id === 'id' && !!products.find(item => item.id === Number(input.value))) {
            return alert('duplicated user !');
        }

        if (input.id === 'id') {
            newProduct[input.id] = Number(input.value);
            continue;
        }

        newProduct[input.id] = input.value;
    }

    console.log(newProduct)

    $.ajax({
        type: "post",
        url: `products-page/newProduct`,
        data: newProduct,
        success(response) {
            console.log('msg is==>', response);
        },
        error(err) {
            console.log('msg is==>', err);
        },
        async: false
    });

    modalClose();
    location.reload()

}
