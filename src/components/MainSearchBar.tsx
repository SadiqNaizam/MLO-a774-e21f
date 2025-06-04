import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // For guests
import { CalendarIcon, Search, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface MainSearchBarProps {
  onSearch: (params: { destination: string; dates?: DateRange; guests: string }) => void;
}

const MainSearchBar: React.FC<MainSearchBarProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState('1'); // Default to 1 guest

  console.log("Rendering MainSearchBar");

  const handleSearch = () => {
    console.log("Search initiated with:", { destination, dates, guests });
    onSearch({ destination, dates, guests });
  };

  return (
    <div className="bg-background p-4 md:p-6 rounded-xl shadow-lg border max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-2 md:gap-0 items-center">
        {/* Destination Input */}
        <div className="relative group">
          <label htmlFor="destination" className="text-xs font-semibold text-muted-foreground px-3">Where</label>
          <div className="flex items-center">
             <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none md:hidden" />
            <Input
              id="destination"
              type="text"
              placeholder="Search destinations"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full !pl-3 !pr-3 py-2 text-sm border-0 focus-visible:ring-0 md:rounded-r-none md:border-r"
            />
          </div>
        </div>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal h-auto py-0 px-3 group md:rounded-none md:border-r"
            >
              <div>
                <div className="text-xs font-semibold text-muted-foreground">Check in / Check out</div>
                <div className="text-sm">
                  {dates?.from ? (
                    dates.to ? (
                      <>
                        {format(dates.from, "LLL dd, y")} - {format(dates.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dates.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Add dates</span>
                  )}
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dates?.from}
              selected={dates}
              onSelect={setDates}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Guests Select */}
         <div className="relative group md:rounded-none md:border-r">
           <label htmlFor="guests" className="text-xs font-semibold text-muted-foreground px-3">Who</label>
           <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full justify-start text-left font-normal h-auto py-[7px] px-3 text-sm border-0 focus:ring-0 focus:ring-offset-0">
               <SelectValue placeholder="Add guests" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(8)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1} guest{i + 1 > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        {/* Search Button */}
        <Button onClick={handleSearch} size="lg" className="w-full md:w-auto md:rounded-l-none aspect-square md:aspect-auto md:px-6">
          <Search className="h-5 w-5 md:mr-2" />
          <span className="hidden md:inline">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default MainSearchBar;