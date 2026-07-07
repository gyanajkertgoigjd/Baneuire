if (localStorage.getItem("adminLoggedIn") !== "true") {

    window.location.href = "admin.html";

}
const table = document.getElementById("reservationTable");

const todayReservations = document.getElementById("todayReservations");
const pendingReservations = document.getElementById("pendingReservations");
const confirmedReservations = document.getElementById("confirmedReservations");
const cancelledReservations = document.getElementById("cancelledReservations");

const searchInput = document.getElementById("searchInput");

let reservations = [];

// ===============================
// LOAD RESERVATIONS
// ===============================

async function loadReservations() {

    try {

        const response = await fetch("http://localhost:5000/reservations");

        reservations = await response.json();

        displayReservations(reservations);

    } catch (error) {

        console.error(error);

        alert("Unable to load reservations.");

    }

}

// ===============================
// DISPLAY TABLE
// ===============================

function displayReservations(data) {

    table.innerHTML = "";

    data.forEach((reservation) => {

        table.innerHTML += `
<tr>

    <td>${reservation.full_name}</td>

    <td>${reservation.phone}</td>

    <td>${reservation.guests}</td>

    <td>${new Date(reservation.reservation_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })}</td>

    <td>${reservation.reservation_time}</td>

<td>

    ${reservation.table_number ? `Table ${reservation.table_number}` : "-"}

</td>

<td>${reservation.status}</td>

<td>

    <button
        class="action-btn view"
        onclick="viewReservation(${reservation.reservation_id})">

        View

    </button>

    ${reservation.status === "Pending" ? `

        <button
            class="action-btn confirm"
            onclick="confirmReservation(${reservation.reservation_id})">

            Confirm

        </button>

    ` : ""}

    <button
        class="action-btn cancel"
        onclick="deleteReservation(${reservation.reservation_id})">

        Delete

    </button>

</td>

</tr>
`;
    });

    updateCards();

}

// ===============================
// UPDATE DASHBOARD CARDS
// ===============================

function updateCards() {

    todayReservations.textContent = reservations.length;

    pendingReservations.textContent =
        reservations.filter(r => r.status === "Pending").length;

    confirmedReservations.textContent =
        reservations.filter(r => r.status === "Confirmed").length;

    cancelledReservations.textContent =
        reservations.filter(r => r.status === "Cancelled").length;

}

// ===============================
// CONFIRM RESERVATION
// ===============================

async function confirmReservation(id) {

    try {

        await fetch(`http://localhost:5000/reservations/${id}`, {

            method: "PUT"

        });

        loadReservations();

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// DELETE RESERVATION
// ===============================

async function deleteReservation(id) {

    if (!confirm("Delete this reservation?")) return;

    try {

        await fetch(`http://localhost:5000/reservations/${id}`, {

            method: "DELETE"

        });

        loadReservations();

    } catch (error) {

        console.error(error);

    }

}


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = reservations.filter(r =>

        r.full_name.toLowerCase().includes(value) ||

        r.phone.includes(value)

    );

    displayReservations(filtered);

});

// ===============================
// INITIAL LOAD
// ===============================

loadReservations();

function viewReservation(id) {

    const reservation = reservations.find(r => r.reservation_id === id);

    document.getElementById("reservationDetails").innerHTML = `

        <div class="detail">
            <strong>Name</strong>
            <span>${reservation.full_name}</span>
        </div>

        <div class="detail">
            <strong>Email</strong>
            <span>${reservation.email}</span>
        </div>

        <div class="detail">
            <strong>Phone</strong>
            <span>${reservation.phone}</span>
        </div>

        <div class="detail">
            <strong>Guests</strong>
            <span>${reservation.guests}</span>
        </div>

        <div class="detail">
            <strong>Date</strong>
            <span>${new Date(reservation.reservation_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })}</span>
        </div>

        <div class="detail">
            <strong>Time</strong>
            <span>${reservation.reservation_time}</span>
        </div>

        <div class="detail">
            <strong>Status</strong>
            <span>${reservation.status}</span>
        </div>

    `;

    document.getElementById("viewModal").style.display = "flex";

}
function closeModal(){

    document.getElementById("viewModal").style.display = "none";

}

window.onclick = function(event){

    const modal = document.getElementById("viewModal");

    if(event.target === modal){

        modal.style.display = "none";

    }

}