const jsonData = "./data.json";

async function getData() {
    try {
        const response = await fetch(jsonData);
        const data = await response.json();
        appendData(data);
    } catch (err) {
        console.log(err);
    }
}
getData();

function appendData(data) {
    var mainData = document.getElementById("data");

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        tr.innerHTML = `
        <tr>
            <th scope="row">${data[i].sid}</th>
            <td><img src="${data[i].img}" class="rounded-circle"
                    style="width: 70px; height: 70px;" alt="Avatar" /></td>
            <td>${data[i].firstname}</td>
            <td>${data[i].lastname}</td>
            <td>${data[i].nickname}</td>
            <td style="height: 50px;">
                <div class="d-flex justify-content-center align-items-center flex-wrap" style="height: 100%;">
                    <button type="button" class="btn btn-outline-primary m-1" onclick="viewData('${data[i].sid}','${data[i].firstname}','${data[i].lastname}','${data[i].nickname}','${data[i].age}','${data[i].email}','${data[i].phone}','${data[i].img}')">View</button>
                    <button type="button" class="btn btn-outline-warning m-1">Edit</button>
                    <button type="button" class="btn btn-outline-danger m-1">Delete</button>
                </div>
            </td>
        </tr>
        `
        mainData.appendChild(tr);
    }
}

function viewData(sid, firstname, lastname, nickname, age, email, phone, img) {
    Swal.fire({
        title: 'Student ID: ' + sid,
        html: `
            
                <img src="${img}" class="" alt="..." style="width: 300px;">
                <div class="card-body">
                    <h4 class="card-title mt-2 mb-2">${firstname} ${lastname}</h4>
                    <p class="card-text mb-0 text-start">ชื่อเล่น : ${nickname}</p>
                    <p class="card-text mb-0 text-start">อายุ : ${age}</p>
                    <p class="card-text mb-0 text-start">Email : ${email}</p>
                    <p class="card-text mb-0 text-start">Phone : ${phone}</p>
                </div>
            
        `,
        showConfirmButton: false,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        focusCancel: false,
        cancelButtonText: 'Close',
    })
}