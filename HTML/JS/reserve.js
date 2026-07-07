// =============================
// GUEST SELECTOR
// =============================
console.log("Reserve JS Loaded");
let guests = 2;

const guestCount = document.getElementById("guestCount");
const summaryGuests = document.getElementById("summaryGuests");

document.getElementById("plus").onclick = () => {

    if (guests < 20) {

        guests++;

        guestCount.innerText = guests;

        summaryGuests.innerText = guests;

    }

};

document.getElementById("minus").onclick = () => {

    if (guests > 1) {

        guests--;

        guestCount.innerText = guests;

        summaryGuests.innerText = guests;

    }

};

// =============================
// TIME SLOT
// =============================

const timeButtons = document.querySelectorAll(".time-btn");

const summaryTime = document.getElementById("summaryTime");

timeButtons.forEach(button => {

    button.addEventListener("click", () => {

        timeButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        summaryTime.innerText = button.innerText;

    });

});

// =============================
// SEATING
// =============================

const seatCards = document.querySelectorAll(".seat-card");

const summarySeat = document.getElementById("summarySeat");

seatCards.forEach(card => {

    card.addEventListener("click", () => {

        seatCards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        summarySeat.innerText = card.innerText;

    });

});

// Default Seat

if (seatCards.length > 0) {

    seatCards[0].classList.add("active");

}

// =============================
// LIVE SUMMARY
// =============================

const nameInput = document.getElementById("name");

const dateInput = document.getElementById("date");

const occasionInput = document.getElementById("occasion");

const summaryName = document.getElementById("summaryName");

const summaryDate = document.getElementById("summaryDate");

const summaryOccasion = document.getElementById("summaryOccasion");

nameInput.addEventListener("input", () => {

    summaryName.innerText = nameInput.value || "-";

});

dateInput.addEventListener("change", () => {

    summaryDate.innerText = dateInput.value || "-";

});

occasionInput.addEventListener("change", () => {

    summaryOccasion.innerText = occasionInput.value;

});

// Default Occasion

summaryOccasion.innerText = occasionInput.value;

// =============================
// TODAY'S DATE MINIMUM
// =============================

const today = new Date().toISOString().split("T")[0];

dateInput.min = today;

// =============================
// POPUP
// =============================

const popup = document.getElementById("popup");

const closePopup = document.getElementById("closePopup");

const form = document.getElementById("reservationForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    if(nameInput.value.trim()===""){

        alert("Please enter your name.");

        return;

    }

    if(document.getElementById("phone").value.trim()===""){

        alert("Please enter your phone number.");

        return;

    }

    if(document.getElementById("email").value.trim()===""){

        alert("Please enter your email.");

        return;

    }

    if(dateInput.value===""){

        alert("Please select a reservation date.");

        return;

    }

    const reservationData = {
    full_name: nameInput.value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    reservation_date: dateInput.value,
    reservation_time: summaryTime.innerText,
    guests: guests,
    seating: summarySeat.innerText,
    occasion: occasionInput.value,
    special_request: document.getElementById("specialRequest").value
};

fetch("http://localhost:5000/reserve", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(reservationData)
})
.then(response => response.json())
.then(data => {
    console.log(data);
    popup.classList.add("active");
})
.catch(error => {
    console.error(error);
    alert("Failed to send reservation.");
});

});

closePopup.onclick = function(){

    popup.classList.remove("active");

};

// =============================
// ESC KEY CLOSE
// =============================

document.addEventListener("keydown", function(e){

    if(e.key==="Escape"){

        popup.classList.remove("active");

}
});

// =============================
// CLICK OUTSIDE CLOSE
// =============================

popup.addEventListener("click",function(e){

    if(e.target===popup){

        popup.classList.remove("active");

    }

});