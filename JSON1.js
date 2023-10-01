// ประกาศตัวแปรเก็บข้อมูล JSON ในรูปแบบของ String
const jsonData = `[
    {
        "sid": "63030079",
        "firstname": "Weerawit",
        "lastname": "Phumphuang",
        "nickname": "Mew",
        "age": 22,
        "email": "weerawit.p@tnk.ac.th",
        "phone": "0971989613",
        "img": "https://d23.com/app/uploads/2020/01/1180w-600h_011020-the-owl-house-780x440.jpg"
    },
    {
        "sid": 63000000,
        "firstname": "Hello",
        "lastname": "World",
        "nickname": "Max",
        "age": 99,
        "email": "max@gmail.com",
        "phone": "999999999",
        "img": "https://cdn.discordapp.com/attachments/931434345611296808/1157357958221541426/hooty_vector_by_ftvs_cm45_dendhl4-fullview.png?ex=6518f9d7&is=6517a857&hm=a0e499a26798f9698744122a081b9c7a028df44fef358d03e311cfd1bf974138&"
    }
]`;
const data = JSON.parse(jsonData);

//ฟังก์ชันสำหรับดึงข้อมูลจาก JSON มาแสดงผล
function getData() {
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
getData();

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
            var sid = document.getElementById("sid").value;
            var firstname = document.getElementById("firstname").value;
            var lastname = document.getElementById("lastname").value;
            var nickname = document.getElementById("nickname").value;
            var age = document.getElementById("age").value;
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone").value;
            var img = document.getElementById("img").value;

            for (var i = 0; i < data.length; i++) {
                if (data[i].sid == sid) {
                    data[i].firstname = firstname;
                    data[i].lastname = lastname;
                    data[i].nickname = nickname;
                    data[i].age = age;
                    data[i].email = email;
                    data[i].phone = phone;
                    data[i].img = img;
                }
            }

            Swal.fire({
                title: 'Saved!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })

            //แสดงข้อมูลใหม่
            document.getElementById("data").innerHTML = "";
            getData();

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
            for (var i = 0; i < data.length; i++) {
                if (data[i].sid == sid) {
                    data.splice(i, 1);
                }
            }

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                showConfirmButton: false,
                timer: 1500
            })

            //แสดงข้อมูลใหม่
            document.getElementById("data").innerHTML = "";
            getData();

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
                    <input type="text" class="form-control" id="sid" required>
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
    var sid = document.getElementById("sid").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var nickname = document.getElementById("nickname").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var img = document.getElementById("img").value;

    for (var i = 0; i < data.length; i++) {
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

    data.push({
        sid: sid,
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        age: age,
        email: email,
        phone: phone,
        img: img
    });

    Swal.fire({
        title: 'Saved!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    })

    //แสดงข้อมูลใหม่
    document.getElementById("data").innerHTML = "";
    getData();
    Swal.close();
}

function denyAddData() {
    Swal.close();
}

//ฟังก์ชันสำหรับค้นหาข้อมูลนักเรียน
function searchData() {
    var input = document.getElementById("searchInput").value;
    var mainData = document.getElementById("data");
    mainData.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].sid == input) {
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
            return;
        }
    }
}