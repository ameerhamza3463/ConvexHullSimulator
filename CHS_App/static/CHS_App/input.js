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

    loadCoordinates();

    const tbody = document.querySelector('#tbody');
    tbody.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            removeCoordinate(event.target);
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
        const coordinates = JSON.parse(localStorage.getItem("coordinates")) || [];

        // Check if the coordinates already exist
        if (coordinates.some(coord => coord.x === x && coord.y === y)) {
            alert("Coordinates already exist! ...(*￣０￣)ノ");
            return;
        }

        coordinates.push({ x, y });
        localStorage.setItem("coordinates", JSON.stringify(coordinates));

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
                            <td><i class="bi bi-x-lg remove-btn"></i></td>
                        `;
        tbody.appendChild(newRow);
        // Clear the input fields
        xInput.value = "";
        yInput.value = "";
    } else {
        alert("Please enter valid coordinates (っ °Д °;)っ");
    }
}

function removeCoordinate(button) {
    const row = button.parentNode.parentNode;
    const tbody = document.querySelector('#tbody');
    const rowIndex = Array.from(tbody.children).indexOf(row);
    const coordinates = JSON.parse(localStorage.getItem("coordinates")) || [];

    if (rowIndex >= 0) {
        tbody.removeChild(row);
        coordinates.splice(rowIndex, 1);
        localStorage.setItem("coordinates", JSON.stringify(coordinates));

        // Update the row numbers after removal
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.children[0].textContent = index + 1;
        });
    }
}

function loadCoordinates() {
    const tbody = document.querySelector('#tbody');
    tbody.innerHTML = '';
    const coordinates = JSON.parse(localStorage.getItem("coordinates")) || [];

    for (const coord of coordinates) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${tbody.childElementCount + 1}</th>
            <td>${coord.x}</td>
            <td>${coord.y}</td>
            <td><i class="bi bi-x-lg remove-btn"></i></td>
        `;
        tbody.appendChild(newRow);
    }
}
function clearDataset() {
    const coordinates = JSON.parse(localStorage.getItem("coordinates")) || [];
    if (coordinates.length !== 0) {
        localStorage.removeItem("coordinates");
        // Reload the page to update the dataset
        location.reload();
    } else {
        alert("Can't you see there is no data here ( ￣へ￣) Baka ja neo");
    }
}