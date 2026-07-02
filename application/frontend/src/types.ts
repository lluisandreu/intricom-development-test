export interface Hotel {
  id: number;
  name: string;
  address: string;
  createdDate: string;
}

export interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  createdDate: string;
}

export interface HotelBooking {
  id: number;
  hotelId: number;
  clientId: number;
  name: string;
  address: string;
  createdDate: string;
}
