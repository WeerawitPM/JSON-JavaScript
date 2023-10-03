const jsonData = "https://rest-api-teaching-weerawitpm.vercel.app/student/get";
let data = []; //เก็บข้อมูลที่ดึงมาจาก JSON ในตัวแปรนี้

//ฟังก์ชันสำหรับดึงข้อมูลจาก JSON มาแสดงผล
async function getData() {
    //ระหว่างรอข้อมูลมา ให้แสดงข้อความ Loading...
    let mainData = document.getElementById("data");
    mainData.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </td>
        </tr>
    `
    //ดึงข้อมูลมาแสดงผล
    try {
        const response = await fetch(jsonData);
        data = await response.json();
        //clear data
        mainData.innerHTML = "";
        //append data
        appendData();
    } catch (err) {
        mainData.innerHTML = "";
        console.log(err);
    }
}
getData();

//ฟังก์ชันสำหรับแสดงผลข้อมูลที่ดึงมาจาก JSON
function appendData() {
    let mainData = document.getElementById("data");

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <tr>
            <th scope="row" id="${data[i].sid}">${data[i].sid}</th>
            <td><img src="${data[i].img}" class="rounded-circle"
                    style="width: 70px; height: 70px;" alt="Avatar" /></td>
            <td>${data[i].firstname}</td>
            <td>${data[i].lastname}</td>
            <td>${data[i].nickname}</td>
            <td style="height: 50px;">
                <div class="d-flex justify-content-center align-items-center flex-wrap" style="height: 100%;">
                    <button type="button" class="btn btn-outline-primary m-1" onclick="viewData('${data[i].sid}','${data[i].firstname}','${data[i].lastname}','${data[i].nickname}','${data[i].age}','${data[i].email}','${data[i].phone}','${data[i].img}','${data[i].createdAt}')">View</button>
                    <button type="button" class="btn btn-outline-warning m-1" onclick="updateData('${data[i].sid}','${data[i].firstname}','${data[i].lastname}','${data[i].nickname}','${data[i].age}','${data[i].email}','${data[i].phone}','${data[i].img}')">Edit</button>
                    <button type="button" class="btn btn-outline-danger m-1" onclick="deleteData(${data[i].sid})">Delete</button>
                </div>
            </td>
        </tr>
        `
        mainData.appendChild(tr);
    }
}

//ฟังก์ชันสำหรับแสดงข้อมูลรายละเอียดของนักเรียน
function viewData(sid, firstname, lastname, nickname, age, email, phone, img, createdAt) {
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
                    <p class="card-text mb-0 text-start">Created At : ${createdAt}</p>
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

//ฟังก์ชันสำหรับแก้ไขข้อมูลนักเรียน
function updateData(sid, firstname, lastname, nickname, age, email, phone, img) {
    Swal.fire({
        title: 'Update Student Data',
        html: `
            <form class="text-start">
                <div class="mb-3">
                    <label for="sid" class="form-label">Student ID</label>
                    <input type="number" class="form-control" id="sid" value="${sid}" disabled>
                </div>
                <div class="mb-3">
                    <label for="firstname" class="form-label">Firstname</label>
                    <input type="text" class="form-control" id="firstname" value="${firstname}" required>
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Lastname</label>
                    <input type="text" class="form-control" id="lastname" value="${lastname}" required>
                </div>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" class="form-control" id="nickname" value="${nickname}" required>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${age}" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" value="${email}" required>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone" value="${phone}" required>
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="img" value="${img}" required>
                </div>
            </form>
        `,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            let firstname = document.getElementById("firstname").value;
            let lastname = document.getElementById("lastname").value;
            let nickname = document.getElementById("nickname").value;
            let age = parseInt(document.getElementById("age").value);
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            let img = document.getElementById("img").value;

            let data = {
                "firstname": firstname,
                "lastname": lastname,
                "nickname": nickname,
                "age": age,
                "email": email,
                "phone": phone,
                "img": img
            }

            try {
                fetch('https://rest-api-teaching-weerawitpm.vercel.app/student/update?sid=' + sid, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    location.reload();
                })
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } else if (result.isDenied) {
            Swal.close();
        }
    })
}

//ฟังก์ชันสำหรับลบข้อมูลนักเรียน
function deleteData(sid) {
    Swal.fire({
        title: 'คุณแน่ใจนะ ว่าจะลบข้อมูล?',
        text: "การดำเนินการนี้จะไม่สามารถย้อนกลับได้!",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'ใช่, ฉันต้องการลบ!',
        denyButtonText: 'ไม่, ยกเลิก!',
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                fetch('https://rest-api-teaching-weerawitpm.vercel.app/student/delete?sid=' + sid, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    location.reload();
                })
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } else if (result.isDenied) {
            Swal.close();
        }
    })
}

//ฟังก์ชันสำหรับเพิ่มข้อมูลนักเรียน
function addData() {
    Swal.fire({
        title: 'Add Student Data',
        html: `
            <form class="text-start" action="javascript:acceptAddData()">
                <div class="mb-3">
                    <label for="sid" class="form-label">Student ID</label>
                    <input type="number" class="form-control" id="sid" required>
                </div>
                <div class="mb-3">
                    <label for="firstname" class="form-label">Firstname</label>
                    <input type="text" class="form-control" id="firstname" required>
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Lastname</label>
                    <input type="text" class="form-control" id="lastname" required>
                </div>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" class="form-control" id="nickname" required>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone" required>
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="img" required>
                </div>
                <div class="" role="alert" id="alert"></div>
                <div class="mb-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-lg btn-outline-primary mx-1">เพิ่มข้อมูล</button>
                    <button type="button" class="btn btn-lg btn-outline-danger mx-1" onclick="denyAddData()">ยกเลิก</button>
                </div>
            </form>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        showDenyButton: false,
    })
}

function acceptAddData() {
    let sid = parseInt(document.getElementById("sid").value);
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let nickname = document.getElementById("nickname").value;
    let age = parseInt(document.getElementById("age").value);
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let img = document.getElementById("img").value;

    for (let i = 0; i < data.length; i++) {
        if (data[i].sid == sid) {
            document.getElementById("alert").innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ขออภัย!</strong> ไม่สามารถเพิ่มข้อมูลได้ เนื่องจากมีรหัสนักเรียนนี้อยู่แล้ว
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
            return;
        }
    }

    let data2 = {
        sid: sid,
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        age: age,
        email: email,
        phone: phone,
        img: img
    }

    try {
        fetch('https://rest-api-teaching-weerawitpm.vercel.app/student/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data2)
        });
        Swal.fire({
            icon: 'success',
            title: 'Saved!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            location.reload();
        })
    } catch (err) {
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
}

function denyAddData() {
    Swal.close();
}

//ฟังก์ชันสำหรับค้นหาข้อมูลนักเรียน
function searchData() {
    let input = parseInt(document.getElementById("searchInput").value);

    let url = "https://rest-api-teaching-weerawitpm.vercel.app/student/find?sid=" + input;

    async function getData() {
        let mainData = document.getElementById("data");
        try {
            const response = await fetch(url);
            data = await response.json();
            //clear data
            mainData.innerHTML = "";
            //append data
            appendData(data);
        } catch (err) {
            mainData.innerHTML = "";
            console.log(err);
        }
    }
    getData();
}