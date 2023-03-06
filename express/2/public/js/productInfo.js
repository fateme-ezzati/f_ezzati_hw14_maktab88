// let url_str = window.location.href;
// let url = new URL(url_str);
// let search_params = url.searchParams;
// let id = Number(search_params.get('id'))

// let product;
// $.ajax({
//     type: "get",
//     url: "/product/getProducts",
//     success(data) {
//         console.log(data);
//         product = data.find(item => item.id === id)
//         renderTable(product)
//         console.log(product)
//     },
//     error(err) {
//         console.log(err);
//     },
//     async: false
// });

// function renderTable(product) {
//     const thead = $('thead');
//     const tbody = $('tbody');

//     let data = [...Object.keys(product), 'delete']
//     let tableColumns = $.map(data, function (column) {

//         if (column === 'row') return `<th>${column}</th>`;

//         return `<th>${column}</th>`;

//     }).join('')

//     console.log(tableColumns)

//     thead.html(`<tr>${tableColumns}</tr>`);

//     let tableBody

//     tableBody += `
//         <tr>
//           <td>${product.name}</td>
//           <td>${product.date}</td>
//           <td>${product.id}</td>
//           <td onClick='removeProduct(${product.id})'>d</td>
//         </tr>`;

//     tbody.html(`${tableBody}`)
// }


// function removeProduct(id) {

//     let products;
//     $.ajax({
//         type: "delete",
//         url: `product/removeProduct/${id}`,
//         success(data) {
//             console.log(data);
//             products = data
//             console.log(products)
//         },
//         error(err) {
//             console.log(err);
//         },
//         async: false
//     });

// }