import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { NavTabItemProps } from '@/components/layout/NavTabItem';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/layout/Sidebar';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AccommodationCard from '@/components/AccommodationCard';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import FooterLinks from '@/components/layout/FooterLinks';
import Heading from '@/components/Heading';
import { ListFilter, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // For mobile filters

const navItems: NavTabItemProps[] = [
  { to: "/homes", label: "Homes" },
  { to: "/experiences", label: "Experiences", isNew: true },
  { to: "/services", label: "Services" },
];

const placeholderResults = [
  // Using a subset of Homepage's accommodations for simplicity
  { id: 'sr1', name: 'Downtown Studio with Balcony', imageUrl: 'https://source.unsplash.com/random/400x250?studio,downtown', pricePerNight: 110, rating: 4.6, reviewCount: 95, detailsLink: '/property-detail-page', location: 'Austin, TX' },
  { id: 'sr2', name: 'Spacious Family House with Garden', imageUrl: 'https://source.unsplash.com/random/400x250?house,garden', pricePerNight: 220, rating: 4.8, reviewCount: 130, tags: ['Guest favourite'], detailsLink: '/property-detail-page', location: 'London, UK' },
  { id: 'sr3', name: 'Secluded Beach Bungalow', imageUrl: 'https://source.unsplash.com/random/400x250?bungalow,beach', pricePerNight: 180, rating: 4.9, detailsLink: '/property-detail-page', location: 'Maui, HI' },
  { id: 'sr4', name: 'Mountain View Chalet', imageUrl: 'https://source.unsplash.com/random/400x250?chalet,mountains', pricePerNight: 150, rating: 4.7, detailsLink: '/property-detail-page', location: 'Alps, Switzerland' },
];

const footerLinkGroups = [
  { title: 'Support', links: [{ label: 'Help Center', to: '/help' }, { label: 'Contact Us', to: '/contact' }] },
  { title: 'Company', links: [{ label: 'About Us', to: '/about' }, { label: 'Careers', to: '/careers' }] },
];


const FilterContent: React.FC = () => (
  <div className="space-y-6">
    <Accordion type="multiple" defaultValue={['price', 'amenities']} className="w-full">
      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent className="space-y-3 px-1">
          <p className="text-sm text-muted-foreground">Adjust price per night.</p>
          <Slider defaultValue={[50, 500]} max={1000} step={10} />
          <div className="flex justify-between text-sm">
            <span>$50</span>
            <span>$1000+</span>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="amenities">
        <AccordionTrigger>Amenities</AccordionTrigger>
        <AccordionContent className="space-y-2 px-1">
          {['WiFi', 'Pool', 'Kitchen', 'Air Conditioning', 'Parking'].map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={`amenity-${amenity.toLowerCase()}`} />
              <label htmlFor={`amenity-${amenity.toLowerCase()}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {amenity}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="property-type">
        <AccordionTrigger>Property Type</AccordionTrigger>
        <AccordionContent className="space-y-2 px-1">
           {['Apartment', 'House', 'Condo', 'Villa'].map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type.toLowerCase()}`} />
              <label htmlFor={`type-${type.toLowerCase()}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {type}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Button className="w-full">Apply Filters</Button>
  </div>
);

const SearchResultsPage: React.FC = () => {
  console.log('SearchResultsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  // Add state for filters, sorting, pagination
  const currentPage = 1;
  const totalPages = 5; // Example

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu navItems={navItems} />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Heading level={1} as="h1" className="text-2xl md:text-3xl font-semibold">
              Search Results
            </Heading>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Refine search..." 
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort By</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Rating</DropdownMenuItem>
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <ListFilter className="h-4 w-4" />
                    <span className="sr-only">Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <div className="flex gap-8">
          <Sidebar title="Filters" className="hidden md:block sticky top-[calc(theme(spacing.16)+1px)] h-[calc(100vh-theme(spacing.16)-1px-theme(spacing.8))]"> {/* Adjust top based on nav height */}
            <FilterContent />
          </Sidebar>

          <main className="flex-1">
            {placeholderResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {placeholderResults.map(item => (
                    <AccommodationCard key={item.id} {...item} onToggleFavourite={(id) => console.log('Toggled favourite on search page:', id)} />
                  ))}
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" isDisabled={currentPage === 1} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={currentPage === i + 1}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {totalPages > 5 && <PaginationEllipsis />}
                    <PaginationItem>
                      <PaginationNext href="#" isDisabled={currentPage === totalPages} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            ) : (
              <div className="text-center py-12">
                <Heading level={3} as="h3">No Results Found</Heading>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <FooterLinks linkGroups={footerLinkGroups} />
    </div>
  );
};

export default SearchResultsPage;