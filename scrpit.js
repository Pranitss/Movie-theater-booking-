const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let selectedSeats = [];
let numSeatsToSelect = 0;

document.addEventListener('DOMContentLoaded', () => {
    createSeats();
});

function createSeats() {
    const tbody = document.querySelector('#seats-table tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        tdLabel.textContent = row;
        tr.appendChild(tdLabel);
        for (let i = 1; i <= 12; i++) {
            if (i === 6) {
                const tdGap = document.createElement('td');
                tdGap.classList.add('seatGap');
                tr.appendChild(tdGap);
            }
            const td = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('seats');
            checkbox.value = `${row}${i}`;
            checkbox.addEventListener('change', () => selectSeat(checkbox));
            td.appendChild(checkbox);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
}

function startSelecting() {
    const name = document.getElementById('name').value;
    const numSeats = document.getElementById('numSeats').value;
    if (name === '' || numSeats === '') {
        alert('Please enter your name and the number of seats.');
        return;
    }
    numSeatsToSelect = parseInt(numSeats, 10);
    selectedSeats = [];
    document.getElementById('congrats-message').style.display = 'none';
    document.querySelectorAll('.seats').forEach(seat => seat.checked = false);
}

function selectSeat(checkbox) {
    if (selectedSeats.length >= numSeatsToSelect && checkbox.checked) {
        checkbox.checked = false;
        return;
    }
    if (checkbox.checked) {
        selectedSeats.push(checkbox.value);
    } else {
        selectedSeats = selectedSeats.filter(s => s !== checkbox.value);
    }
}

function confirmSelection() {
    const name = document.getElementById('name').value;
    if (selectedSeats.length !== numSeatsToSelect) {
        alert(`Please select ${numSeatsToSelect} seats.`);
        return;
    }
    const bookingDetails = document.getElementById('booking-details');
    const row = bookingDetails.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = numSeatsToSelect;
    row.insertCell(2).innerText = selectedSeats.join(', ');

    selectedSeats.forEach(seat => {
        const checkbox = document.querySelector(`input[value="${seat}"]`);
        checkbox.disabled = true;
        checkbox.checked = false;
    });

    selectedSeats = [];
    document.getElementById('congrats-message').style.display = 'block';
}
