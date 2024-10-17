import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Total number of seats (80)
  totalSeats: number = 80;
  // Rows of seats: 7 seats per row and the last row has 3 seats
  rows: number[][] = [];
  // Track seat availability
  seats: { number: number, isBooked: boolean }[] = [];

  // Number of seats the user wants to book
  seatRequest: number = 0;
  // List of booked seat numbers
  bookedSeats: number[] = [];

  constructor() {
    this.initializeSeats();
  }

  // Initialize the seat structure
  initializeSeats() {
    // Fill seats 1 to 80, set all as available initially
    for (let i = 1; i <= this.totalSeats; i++) {
      this.seats.push({ number: i, isBooked: false });
    }

    // Group seats by rows (7 per row, last row has 3 seats)
    for (let i = 0; i < 12; i++) {
      if (i < 11) {
        this.rows.push([i * 7 + 1, i * 7 + 2, i * 7 + 3, i * 7 + 4, i * 7 + 5, i * 7 + 6, i * 7 + 7]);
      } else { 
        this.rows.push([78, 79, 80]); // Last row with 3 seats
      }
    }
  }

  // Book seats based on user input
  bookSeats() {
    if (this.seatRequest <= 0 || this.seatRequest > 7) {
      alert('Please enter a valid number of seats between 1 and 7');
      return;
    }

    let booked: number[] = [];
    let remainingSeats = this.seatRequest;

    // Try to book seats in a row
    for (let row of this.rows) {
      let availableSeatsInRow = row.filter(seatNumber => !this.seats[seatNumber - 1].isBooked);
      if (availableSeatsInRow.length >= remainingSeats) {
        // If enough seats are available in this row, book them
        for (let i = 0; i < remainingSeats; i++) {
          this.seats[availableSeatsInRow[i] - 1].isBooked = true;
          booked.push(availableSeatsInRow[i]);
        }
        remainingSeats = 0;
        break;
      }
    }

    // If remaining seats couldn't be booked in one row, book nearby seats
    if (remainingSeats > 0) {
      for (let seat of this.seats) {
        if (!seat.isBooked && remainingSeats > 0) {
          seat.isBooked = true;
          booked.push(seat.number);
          remainingSeats--;
        }
        if (remainingSeats === 0) break;
      }
    }

    if (booked.length > 0) {
      this.bookedSeats = booked;
    } else {
      alert('Not enough available seats.');
    }
  }
}
