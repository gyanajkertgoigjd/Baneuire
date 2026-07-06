const tablesContainer = document.getElementById("tablesContainer");

async function loadTables() {

    try {

        const response = await fetch("http://localhost:5000/tables");

        const tables = await response.json();

        displayTables(tables);

    } catch (error) {

        console.error(error);

        alert("Unable to load restaurant tables.");

    }

}

function displayTables(tables) {

    tablesContainer.innerHTML = "";

    tables.forEach(table => {

        let statusClass = "";

        if (table.status === "Available") {

            statusClass = "available";

        }

        else if (table.status === "Reserved") {

            statusClass = "reserved";

        }

        else {

            statusClass = "occupied";

        }

        tablesContainer.innerHTML += `

            <div class="table-card">

                <h3>
                    <i class="fa-solid fa-chair"></i>
                    Table ${table.table_number}
                </h3>

                <p>
                    <strong>Seats :</strong> ${table.seats}
                </p>

                <p class="${statusClass}">
                    ${table.status}
                </p>

            </div>

        `;

    });

}

loadTables();