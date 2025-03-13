const apiUrl = "https://script.google.com/macros/s/AKfycbzUkHVmVunjuSRX5bJvSvfgpmxCYqtvAVUqOfy2ZudxSi8-G_FwnmsW2L8Y6n6gDvNzEQ/exec"; // เปลี่ยนเป็น URL ของคุณ

async function fetchData() {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

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

function filterTable() {
    let searchValue = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#dataBody tr");
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchValue) ? "" : "none";
    });
}

function printTable() {
    let printContents = document.getElementById("dataTable").outerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

fetchData();
