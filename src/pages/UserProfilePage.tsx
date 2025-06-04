import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { NavTabItemProps } from '@/components/layout/NavTabItem';
// Button, DropdownMenu are part of NavigationMenu
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Form shadcn component is for context/hooks. We'll use html form tag and shadcn inputs.
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import FooterLinks from '@/components/layout/FooterLinks';
import Heading from '@/components/Heading';
import AccommodationCard from '@/components/AccommodationCard'; // For Favourites
import { Button } from '@/components/ui/button';

const navItems: NavTabItemProps[] = [
  { to: "/homes", label: "Homes" },
  { to: "/trips", label: "Trips" },
  { to: "/messages", label: "Messages" },
];

const placeholderBookings = [
  { id: 'b1', propertyName: 'Sunny Apartment in Barcelona', dates: 'Oct 10-15, 2023', total: '$650', status: 'Confirmed' },
  { id: 'b2', propertyName: 'Mountain Cabin Retreat', dates: 'Dec 20-27, 2023', total: '$1200', status: 'Past' },
  { id: 'b3', propertyName: 'Beach House Getaway', dates: 'Jan 5-10, 2024', total: '$950', status: 'Cancelled' },
];

const placeholderFavourites = [
  { id: 'fav1', name: 'Artistic Loft in Berlin', imageUrl: 'https://source.unsplash.com/random/400x250?loft,berlin', pricePerNight: 130, rating: 4.9, detailsLink: '/property-detail-page', location: 'Berlin, Germany' },
  { id: 'fav2', name: 'Riverside Cabin with Hot Tub', imageUrl: 'https://source.unsplash.com/random/400x250?cabin,river', pricePerNight: 180, rating: 4.7, detailsLink: '/property-detail-page', location: 'Oregon, USA' },
];

const footerLinkGroups = [
  { title: 'Account', links: [{ label: 'Manage Profile', to: '/user-profile' }, { label: 'Payment Methods', to: '/user-profile/payments' }] },
  { title: 'Support', links: [{ label: 'Help Center', to: '/help' }] },
];

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Profile form submitted:', data);
    // Add API call or state update logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu navItems={navItems} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Heading level={1} as="h1" className="text-3xl font-bold mb-8">My Account</Heading>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 md:w-1/2">
            <TabsTrigger value="profile">Personal Info</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" defaultValue="+1 123 456 7890" />
                  </div>
                  {/* Add more fields like address, bio etc. */}
                   <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View your past and upcoming bookings.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {placeholderBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.propertyName}</TableCell>
                        <TableCell>{booking.dates}</TableCell>
                        <TableCell>{booking.total}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'Confirmed' ? 'default' : (booking.status === 'Past' ? 'secondary' : 'destructive')}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {placeholderBookings.length === 0 && <p className="text-muted-foreground text-center py-4">No bookings yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>My Favorites</CardTitle>
                <CardDescription>Your saved accommodations.</CardDescription>
              </CardHeader>
              <CardContent>
                {placeholderFavourites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {placeholderFavourites.map(fav => (
                      <AccommodationCard key={fav.id} {...fav} isFavourite={true} onToggleFavourite={(id) => console.log("Removed from favs:", id)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">You haven't favorited any places yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <FooterLinks linkGroups={footerLinkGroups} />
    </div>
  );
};

export default UserProfilePage;