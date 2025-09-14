"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Calendar24Props = {
  field: ControllerRenderProps<any, any>;
};

export function DateTimePicker({ field }: Calendar24Props) {
  const [open, setOpen] = React.useState(false);

  const value: string | undefined = field.value;
  const currentDate = value ? new Date(value) : undefined;
  const [time, setTime] = React.useState(
    currentDate ? currentDate.toTimeString().split(" ")[0] : "10:30:00"
  );

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    const [h, m, s] = time.split(":").map(Number);
    date.setHours(h, m, s, 0);

    field.onChange(date);
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (currentDate) {
      const newDate = new Date(currentDate);
      const [h, m, s] = newTime.split(":").map(Number);
      newDate.setHours(h, m, s, 0);

      field.onChange(newDate);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {currentDate ? currentDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={currentDate}
              captionLayout="dropdown"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
