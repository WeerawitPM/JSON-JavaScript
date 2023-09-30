const jsonData = "https://rest-api-teaching-weerawitpm.vercel.app/student/get";

//ฟังก์ชันสำหรับดึงข้อมูลจาก JSON มาแสดงผล
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

//ฟังก์ชันสำหรับแสดงผลข้อมูลที่ดึงมาจาก JSON
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

//ฟังก์ชันสำหรับแก้ไขข้อมูลนักเรียน
function updateData(sid, firstname, lastname, nickname, age, email, phone, img) {
    Swal.fire({
        title: 'Update Student Data',
        html: `
            <form class="text-start">
                <div class="mb-3">
                    <label for="sid" class="form-label">Student ID</label>
                    <input type="text" class="form-control" id="sid" value="${sid}" disabled>
                </div>
                <div class="mb-3">
                    <label for="firstname" class="form-label">Firstname</label>
                    <input type="text" class="form-control" id="firstname" value="${firstname}">
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Lastname</label>
                    <input type="text" class="form-control" id="lastname" value="${lastname}">
                </div>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" class="form-control" id="nickname" value="${nickname}">
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${age}">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" value="${email}">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone" value="${phone}">
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="img" value="${img}">
                </div>
            </form>
        `,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            var firstname = document.getElementById("firstname").value;
            var lastname = document.getElementById("lastname").value;
            var nickname = document.getElementById("nickname").value;
            var age = parseInt(document.getElementById("age").value);
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone").value;
            var img = document.getElementById("img").value;

            var data = {
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
                    method: "PUT",
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
            Swal.fire({
                icon: 'info',
                title: 'Not Saved!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

//ฟังก์ชันสำหรับลบข้อมูลนักเรียน
function deleteData(sid) {
    Swal.fire({
        title: 'คุณแน่ใจนะ ว่าจะลบข้อมูล?',
        text: "การดำเนินการนี้จะไม่สามารถย้อนกลับได้!",
        icon: 'warning',

        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ใช่, ฉันต้องการลบ!',
        cancelButtonText: 'ไม่, ยกเลิก!',
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
            Swal.fire({
                icon: 'info',
                title: 'Not Deleted!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

//ฟังก์ชันสำหรับเพิ่มข้อมูลนักเรียน
function addData() {
    Swal.fire({
        title: 'Add Student Data',
        html: `
            <form class="text-start">
                <div class="mb-3">
                    <label for="sid" class="form-label">Student ID</label>
                    <input type="text" class="form-control" id="sid">
                </div>
                <div class="mb-3">
                    <label for="firstname" class="form-label">Firstname</label>
                    <input type="text" class="form-control" id="firstname">
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Lastname</label>
                    <input type="text" class="form-control" id="lastname">
                </div>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" class="form-control" id="nickname">
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone">
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="img">
                </div>
            </form>
        `,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            var sid = document.getElementById("sid").value;
            var firstname = document.getElementById("firstname").value;
            var lastname = document.getElementById("lastname").value;
            var nickname = document.getElementById("nickname").value;
            var age = parseInt(document.getElementById("age").value);
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone").value;
            var img = document.getElementById("img").value;

            if (sid == "" || firstname == "" || lastname == "" || nickname == "" || age == "" || email == "" || phone == "" || img == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'กรุณากรอกข้อมูลให้ครบ!',
                })
            } else {
                var data = {
                    "sid": sid,
                    "firstname": firstname,
                    "lastname": lastname,
                    "nickname": nickname,
                    "age": age,
                    "email": email,
                    "phone": phone,
                    "img": img
                }

                try {
                    fetch('https://rest-api-teaching-weerawitpm.vercel.app/student/add', {
                        method: "POST",
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
            }
        } else if (result.isDenied) {
            Swal.fire({
                icon: 'info',
                title: 'Not Saved!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}