let userList;
let serviceUrl = '/admin/get-all-users'


async function getData() {
	try {
		const responseObject = await fetch(serviceUrl);
		const { headers, status, statusText } = responseObject;
		const response = await responseObject.json();

		console.log(headers);
		console.log(status);
		console.log(statusText);
		console.log(response);

		// render(userData);
        userList = response
        renderTable(userList)

	} catch (error) {
		console.log(error);
	}

}

getData()


function renderTable(users) {
    const thead = $('thead');
    const tbody = $('tbody');
    tbody.html('');
    thead.html('');

    let data = [...Object.keys(users[0])]
    let tableColumns = $.map(data, function (column) {

        if (column !== 'password') return `<th>${column}</th>`;

    }).join('')

    thead.html(`<tr>${tableColumns}</tr>`);

    let tableBody

    for (const item of users) {
        tableBody += `
        <tr onclick="renderReadProduct(${item.username})">
          <td>${item.firsname?item.firsname:'--'}</td>
          <td>${item.lastname?item.lastname:'--'}</td>
          <td>${item.username?item.username:'--'}</td>
          <td>${item.gender?item.gender:'--'}</td>
        </tr>`;
    }

    tbody.html(`${tableBody}`)
}