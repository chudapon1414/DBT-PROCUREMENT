// URL ของ JSON ที่ดึงจาก Google Apps Script API
const apiUrl = "https://script.google.com/macros/s/xxxxx/exec"; // เปลี่ยนเป็น URL ของคุณ

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
            <td>${item["equipment_name"]}</td>
            <td>${item["equipment_id"]}</td>
            <td>${item["category"]}</td>
            <td>${item["location"]}</td>
            <td>${item["acquisition_date"]}</td>
            <td>${item["price"]}</td>
            <td>${item["status"]}</td>
            <td>${item["owner"]}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// ฟังก์ชันกรองข้อมูลจากช่องค้นหา โดยสามารถค้นหาทุกฟิลด์
function filterTable() {
    let searchValue = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#dataBody tr");
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchValue) ? "" : "none";
    });
}

// ฟังก์ชันพิมพ์ตารางข้อมูล
function printTable() {
    let printContents = document.getElementById("dataTable").outerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

// เรียกใช้งานฟังก์ชันดึงข้อมูลเมื่อโหลดหน้าเว็บ
fetchData();
