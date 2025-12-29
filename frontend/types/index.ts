export interface User {
  userId: number;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  showtimes: Showtime[];
  seats?: Seat[];
}

export interface Showtime {
  id: number;
  startTime: string;
}

export interface Seat {
  id: number;
  seatNumber: number;
  isBooked: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}