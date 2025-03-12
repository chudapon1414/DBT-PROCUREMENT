// URL ของ JSON ที่ดึงจาก Google Apps Script API
const apiUrl = "https://script.google.com/macros/s/AKfycbyymK2M1YOyhF1sq7i49r00C6g8VpUsEBjhrL1TAcOFu9qnufml1FmSysBbUF1lsHJu/exec"; // แก้ไข URL ตามที่คุณสร้างไว้

// ฟังก์ชันดึงข้อมูลจาก Google Sheet
async function fetchData() {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// ฟังก์ชันแสดงข้อมูลในตาราง
function displayData(data) {
    let tableBody = document.getElementById("dataBody");
    tableBody.innerHTML = "";
    data.forEach(item => {
        let row = `<tr>
            <td>${item["ชื่อครุภัณฑ์"]}</td>
            <td>${item["หมายเลขครุภัณฑ์"]}</td>
            <td>${item["ประเภท"]}</td>
            <td>${item["สถานที่จัดเก็บ"]}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// ฟังก์ชันกรองข้อมูลจากช่องค้นหา
function filterTable() {
    let searchValue = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#dataBody tr");
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchValue) ? "" : "none";
    });
}

// เรียกใช้งานฟังก์ชันดึงข้อมูลเมื่อโหลดหน้าเว็บ
fetchData();
