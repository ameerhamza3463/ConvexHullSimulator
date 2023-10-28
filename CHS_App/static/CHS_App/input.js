document.addEventListener("DOMContentLoaded", () => {
    // Get references to the input fields and the button
    const xInput = document.getElementById("x-coordinate");
    const yInput = document.getElementById("y-coordinate");

    // Add event listeners for the Enter key press and button click
    xInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addCoordinates();
        }
    });

    yInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addCoordinates();
        }
    });

    const addPointBtn = document.querySelector("#addCoordiantes");
    addPointBtn.addEventListener("click", () => { addCoordinates() })




    const tbody = document.querySelector('#tbody');
    // Add a click event listener to the table body to handle "x" button clicks
    tbody.addEventListener("click", (event) => {
        if (event.target.classList.contains("bi-x-lg")) {
            // Find the closest row and remove it
            const row = event.target.closest("tr");
            if (row) {
                row.remove();
                FixCoordinateNumbering()
            }
        }
    });
})

function addCoordinates() {
    const xInput = document.getElementById("x-coordinate");
    const yInput = document.getElementById("y-coordinate");

    const x = parseFloat(xInput.value);
    const y = parseFloat(yInput.value);

    // Check if the inputs are valid numbers
    if (!isNaN(x) && !isNaN(y)) {
        // You can use x and y here as needed
        console.log("X: " + x + ", Y: " + y);

        // Get the table body then make a new row with 
        // data. Finally add the new row to the table body.
        const tbody = document.querySelector('#tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                            <th scope="row">${tbody.childElementCount + 1}</th>
                            <td >${x}</td>
                            <td>${y}</td>
                            <td><i class="bi bi-x-lg"></i></td>
                        `;
        tbody.appendChild(newRow);
        // Clear the input fields
        xInput.value = "";
        yInput.value = "";
    } else {
        alert("Please enter valid coordinates (っ °Д °;)っ");
    }
}

function FixCoordinateNumbering() {
    const tbody = document.querySelector("#tbody");
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row, index) => {
        // Update the row number
        const rowNumber = index + 1;
        row.querySelector("th").textContent = rowNumber;
    });
}