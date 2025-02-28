"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export interface ReservationWidgetProps {
  title?: string;
  subtitle?: string;
  minGuests?: number;
  maxGuests?: number;
  availableTimes?: string[];
  onSubmit?: (reservationData: ReservationData) => void;
  darkMode?: boolean;
  isLoading?: boolean;
  reservationUrl?: string;
}

export interface ReservationData {
  date: Date;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export function ReservationWidget({
  title = "Make a Reservation",
  subtitle = "Book your table online",
  minGuests = 1,
  maxGuests = 12,
  availableTimes = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ],
  onSubmit,
  darkMode = false,
  isLoading = false,
  reservationUrl,
}: ReservationWidgetProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("");
  const [guests, setGuests] = React.useState<number>(2);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [specialRequests, setSpecialRequests] = React.useState<string>("");

  // Generate guests options from min to max
  const guestsOptions = Array.from(
    { length: maxGuests - minGuests + 1 },
    (_, i) => minGuests + i
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !guests || !name || !email || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    const reservationData: ReservationData = {
      date,
      time,
      guests,
      name,
      email,
      phone,
      specialRequests,
    };

    if (onSubmit) {
      onSubmit(reservationData);
    } else if (reservationUrl) {
      // Handle external reservation URL
      window.open(
        `${reservationUrl}?date=${format(
          date,
          "yyyy-MM-dd"
        )}&time=${time}&guests=${guests}&name=${encodeURIComponent(
          name
        )}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(
          phone
        )}&special_requests=${encodeURIComponent(specialRequests)}`,
        "_blank"
      );
    }
  };

  return (
    <Card className={darkMode ? "bg-slate-900 text-white" : ""}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
        {subtitle && (
          <p
            className={`text-center text-sm ${
              darkMode ? "text-slate-300" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !date ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time select */}
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Guests select */}
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Select
                value={guests.toString()}
                onValueChange={(value) => setGuests(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {guestsOptions.map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name input */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>

            {/* Phone input */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                required
              />
            </div>
          </div>

          {/* Special requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (optional)</Label>
            <Input
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Allergies, special occasions, etc."
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Book Table"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Example of Prismic integration
export const PrismicReservationExample = `
import { createClient } from '@prismicio/client';
import { ReservationWidget } from '@/components/restaurant/reservation-widget';

export async function RestaurantReservation() {
  const client = createClient('your-repository-name');
  
  // Fetch reservation settings from Prismic
  const settings = await client.getSingle('reservation_settings');
  
  // Handle reservation submission
  const handleReservation = async (data) => {
    // Send to your reservation system API
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      alert('Reservation submitted successfully!');
    } else {
      alert('There was an error submitting your reservation. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <ReservationWidget
          title={settings.data.reservation_title}
          subtitle={settings.data.reservation_subtitle}
          minGuests={settings.data.min_guests || 1}
          maxGuests={settings.data.max_guests || 12}
          availableTimes={settings.data.available_times}
          onSubmit={handleReservation}
          darkMode={settings.data.dark_mode}
          reservationUrl={settings.data.external_reservation_url}
        />
      </div>
    </div>
  );
}
`;
