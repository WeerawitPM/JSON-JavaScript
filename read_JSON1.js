//กรณีที่มีข้อมูล JSON ในไฟล์ JavaScript อยู่แล้ว แต่ต้องการแปลงเป็น Object ใน JavaScript สามารถใช้ JSON.parse() ได้เลย
//และกรณีที่ใช้ api หรือ ข้อมูลจากฝั่ง server มา สามารถใช้ JSON.parse() ได้เช่นกัน
//แต่ต้องแปลงเป็น String ก่อน

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