import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { NavTabItemProps } from '@/components/layout/NavTabItem';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'; // For NavMenu
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Carousel from '@/components/Carousel'; // Custom Carousel
import Heading from '@/components/Heading';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FooterLinks from '@/components/layout/FooterLinks';
import { Star, MapPin, Users, Bed, Bath, Wifi, ParkingCircle, Utensils } from 'lucide-react';

const navItems: NavTabItemProps[] = [
  { to: "/homes", label: "Homes" },
  { to: "/experiences", label: "Experiences", isNew: true },
];

const propertyImages = [
  <img src="https://source.unsplash.com/random/800x500?luxury,interior" alt="Living Room" className="w-full h-full object-cover" />,
  <img src="https://source.unsplash.com/random/800x500?bedroom,modern" alt="Bedroom" className="w-full h-full object-cover" />,
  <img src="https://source.unsplash.com/random/800x500?kitchen,bright" alt="Kitchen" className="w-full h-full object-cover" />,
  <img src="https://source.unsplash.com/random/800x500?bathroom,clean" alt="Bathroom" className="w-full h-full object-cover" />,
  <img src="https://source.unsplash.com/random/800x500?patio,view" alt="Patio View" className="w-full h-full object-cover" />,
];

const amenities = [
  { icon: <Wifi size={18} />, text: 'Fast WiFi' },
  { icon: <ParkingCircle size={18} />, text: 'Free Parking' },
  { icon: <Utensils size={18} />, text: 'Full Kitchen' },
  { icon: <Bed size={18} />, text: '3 Bedrooms' },
  { icon: <Bath size={18} />, text: '2 Bathrooms' },
];

const footerLinkGroups = [
  { title: 'Explore', links: [{ label: 'Homes near me', to: '/search?location=current' }, { label: 'Top destinations', to: '/destinations' }] },
  { title: 'Support', links: [{ label: 'Help Center', to: '/help' }, { label: 'Contact property manager', to: '/contact-host' }] },
];

const PropertyDetailPage: React.FC = () => {
  console.log('PropertyDetailPage loaded');
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState('2');

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu navItems={navItems} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/search-results">Search Results</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Luxury Villa with Ocean View</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8">
          <Heading level={1} as="h1" className="text-3xl font-bold mb-1">Luxury Villa with Ocean View</Heading>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-400" /> 4.92 (125 reviews)
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} /> Malibu, California
            </div>
             <Badge variant="secondary">Superhost</Badge>
          </div>
          <Carousel slides={propertyImages} options={{ loop: true }} slideClassName="aspect-[16/10]" />
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <Heading level={2} as="h2" className="text-2xl font-semibold mb-2">Hosted by John Doe</Heading>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>4 guests</span> <Separator orientation="vertical" className="h-4" />
                <span>3 bedrooms</span> <Separator orientation="vertical" className="h-4" />
                <span>3 beds</span> <Separator orientation="vertical" className="h-4" />
                <span>2 baths</span>
              </div>
            </section>
            
            <Separator />

            <section>
                <Heading level={3} as="h3" className="text-xl font-semibold mb-4">Property Description</Heading>
                <p className="text-muted-foreground leading-relaxed">
                    Escape to this stunning villa offering breathtaking ocean views and luxurious amenities. Perfect for families or groups seeking a memorable getaway.
                    The space features an open-concept living area, a gourmet kitchen, and spacious bedrooms each with an en-suite bathroom.
                    Enjoy the private pool, sundeck, and outdoor dining area.
                </p>
            </section>

            <Separator />

            <section>
              <Heading level={3} as="h3" className="text-xl font-semibold mb-4">What this place offers (Amenities)</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map(amenity => (
                  <div key={amenity.text} className="flex items-center gap-3">
                    {amenity.icon}
                    <span>{amenity.text}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <Separator />

            <section>
              <Heading level={3} as="h3" className="text-xl font-semibold mb-4">Guest Reviews</Heading>
              {/* Placeholder for reviews section - could be a list of Card components */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-2">
                    <Star size={16} className="text-yellow-500 fill-yellow-400 mr-1" />
                    <Star size={16} className="text-yellow-500 fill-yellow-400 mr-1" />
                    <Star size={16} className="text-yellow-500 fill-yellow-400 mr-1" />
                    <Star size={16} className="text-yellow-500 fill-yellow-400 mr-1" />
                    <Star size={16} className="text-yellow-500 fill-yellow-400 mr-2" />
                    <span className="font-semibold">5.0</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">"Absolutely amazing stay! The views were incredible and the host was very accommodating." - Jane S.</p>
                </CardContent>
              </Card>
            </section>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="rules">
                <AccordionTrigger>House Rules</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>No smoking</li>
                    <li>No pets allowed</li>
                    <li>Check-in time is 3 PM - 9 PM</li>
                    <li>Check out by 11 AM</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cancellation">
                <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                <AccordionContent>
                  Free cancellation for 48 hours. After that, cancel up to 5 days before check-in and get a 50% refund, minus the service fee.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <aside className="md:col-span-1">
            <Card className="sticky top-24 shadow-lg"> {/* Adjust top based on nav height */}
              <CardHeader>
                <CardTitle className="text-xl">
                  <span className="font-bold text-2xl">$350</span> / night
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="checkin-checkout">Check-in / Check-out</Label>
                  {/* Simplified: Real app would use two calendars or a range picker */}
                   <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input id="guests" type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="Number of guests" />
                </div>
                <Button size="lg" className="w-full">Reserve</Button>
                <p className="text-xs text-muted-foreground text-center">You won't be charged yet</p>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <span>$350 x 5 nights</span>
                <span>$1750</span>
              </CardFooter>
              <Separator />
               <CardFooter className="flex justify-between text-sm font-semibold pt-4">
                <span>Total before taxes</span>
                <span>$1750</span>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>
      <FooterLinks linkGroups={footerLinkGroups} />
    </div>
  );
};

export default PropertyDetailPage;