import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { NavTabItemProps } from '@/components/layout/NavTabItem'; // Import type for navItems
import MainSearchBar from '@/components/MainSearchBar';
import Heading from '@/components/Heading';
import Carousel from '@/components/Carousel'; // Custom Carousel
import AccommodationCard from '@/components/AccommodationCard';
import { Separator } from '@/components/ui/separator';
import FooterLinks from '@/components/layout/FooterLinks';
import { DateRange } from 'react-day-picker';

const navItems: NavTabItemProps[] = [
  { to: "/homes", label: "Homes" },
  { to: "/experiences", label: "Experiences", isNew: true },
  { to: "/services", label: "Services" },
];

const placeholderAccommodations = [
  {
    id: '1',
    name: 'Charming Apartment in City Center',
    imageUrl: 'https://source.unsplash.com/random/400x250?apartment,city',
    pricePerNight: 120,
    rating: 4.8,
    reviewCount: 150,
    tags: ['Guest favourite'],
    detailsLink: '/property-detail-page', // Simplified link
    location: 'Paris, France',
  },
  {
    id: '2',
    name: 'Cozy Cabin by the Lake',
    imageUrl: 'https://source.unsplash.com/random/400x250?cabin,lake',
    pricePerNight: 95,
    rating: 4.5,
    reviewCount: 88,
    detailsLink: '/property-detail-page',
    location: 'Lake Tahoe, USA',
  },
  {
    id: '3',
    name: 'Modern Loft with Skyline View',
    imageUrl: 'https://source.unsplash.com/random/400x250?loft,skyline',
    pricePerNight: 200,
    rating: 4.9,
    reviewCount: 210,
    tags: ['Guest favourite', 'New'],
    detailsLink: '/property-detail-page',
    location: 'New York, USA',
  },
   {
    id: '4',
    name: 'Beachfront Villa with Private Pool',
    imageUrl: 'https://source.unsplash.com/random/400x250?villa,beach',
    pricePerNight: 350,
    rating: 4.7,
    reviewCount: 120,
    detailsLink: '/property-detail-page',
    location: 'Bali, Indonesia',
  },
];

const footerLinkGroups = [
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/help' },
      { label: 'Safety information', to: '/safety' },
      { label: 'Cancellation options', to: '/cancellation' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Forum', to: '/community' },
      { label: 'Support disability', to: '/disability-support' },
    ],
  },
  {
    title: 'Hosting',
    links: [
      { label: 'Become a host', to: '/become-a-host' },
      { label: 'Hosting resources', to: '/hosting-resources' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Newsroom', to: '/news' },
      { label: 'Careers', to: '/careers' },
      { label: 'Investors', to: '/investors' },
    ],
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  const navigate = useNavigate();

  const handleSearch = (params: { destination: string; dates?: DateRange; guests: string }) => {
    console.log('Search initiated on Homepage:', params);
    // In a real app, you'd construct a query string and navigate
    navigate(`/search-results?destination=${encodeURIComponent(params.destination)}&guests=${params.guests}`);
  };

  const accommodationSlides = placeholderAccommodations.map(acc => (
    <AccommodationCard key={acc.id} {...acc} onToggleFavourite={(id) => console.log('Toggled favourite:', id)} />
  ));

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu navItems={navItems} />
      <main className="flex-grow">
        <section className="py-8 md:py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <MainSearchBar onSearch={handleSearch} />
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Heading level={2} as="h2" className="mb-6 text-2xl font-semibold">
              Popular Homes
            </Heading>
            <Carousel slides={accommodationSlides} options={{ loop: true }} slideClassName="p-2" />
          </div>
        </section>

        <Separator className="my-8" />

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Heading level={2} as="h2" className="mb-6 text-2xl font-semibold">
              Unique Stays
            </Heading>
            {/* You might want different data for this carousel */}
            <Carousel slides={accommodationSlides.slice(0,2).reverse()} options={{ loop: true }} slideClassName="p-2" />
          </div>
        </section>
      </main>
      <FooterLinks linkGroups={footerLinkGroups} />
    </div>
  );
};

export default Homepage;