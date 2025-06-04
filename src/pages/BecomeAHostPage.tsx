import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { NavTabItemProps } from '@/components/layout/NavTabItem';
// Button, DropdownMenu are part of NavigationMenu
import Heading from '@/components/Heading';
// Form is HTML form tag, Input, Textarea, Checkbox are shadcn
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FooterLinks from '@/components/layout/FooterLinks';
import { Label } from '@/components/ui/label'; // Missing from layout-info, but essential for forms
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const navItems: NavTabItemProps[] = [
  { to: "/why-host", label: "Why Host?" },
  { to: "/host-resources", label: "Resources" },
  { to: "/host-forum", label: "Community Forum" },
];

const footerLinkGroups = [
  { title: 'Hosting', links: [{ label: 'Responsible hosting', to: '/responsible-hosting' }, { label: 'Host guarantees', to: '/host-guarantee' }] },
  { title: 'Support', links: [{ label: 'Help for hosts', to: '/host-help' }] },
];

const totalSteps = 4;

const BecomeAHostPage: React.FC = () => {
  console.log('BecomeAHostPage loaded');
  const [currentStep, setCurrentStep] = useState(1);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(`Step ${currentStep} form submitted:`, data);
    // In a real app, save data for this step and move to next
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final submission!');
      // API call to create listing
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu navItems={navItems} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
                 <Heading level={1} as="h1" className="text-3xl font-bold mb-2">Become a Host</Heading>
                 <CardDescription>Join our community and start earning by sharing your space.</CardDescription>
                 <Progress value={progressValue} className="w-full mt-4" />
                 <p className="text-sm text-muted-foreground mt-2">Step {currentStep} of {totalSteps}</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {currentStep === 1 && (
                    <section className="space-y-6">
                      <Heading level={2} as="h2" className="text-xl font-semibold border-b pb-2">Property Details</Heading>
                      <div className="space-y-2">
                        <Label htmlFor="propertyName">Property Name / Title</Label>
                        <Input id="propertyName" name="propertyName" placeholder="e.g., Cozy Beachfront Cottage" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Input id="propertyType" name="propertyType" placeholder="e.g., Apartment, House, Cabin" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" placeholder="123 Main St, Anytown, USA" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Tell guests about your space..." rows={5} required />
                      </div>
                    </section>
                  )}

                  {currentStep === 2 && (
                    <section className="space-y-6">
                      <Heading level={2} as="h2" className="text-xl font-semibold border-b pb-2">Amenities & Guests</Heading>
                      <div className="space-y-2">
                        <Label htmlFor="guests">Max Guests</Label>
                        <Input id="guests" name="guests" type="number" min="1" placeholder="e.g., 4" required />
                      </div>
                       <div className="space-y-1">
                        <Label>Key Amenities</Label>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                            {['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning', 'Heating', 'TV', 'Free Parking'].map(amenity => (
                                <div key={amenity} className="flex items-center space-x-2">
                                <Checkbox id={`amenity-${amenity.toLowerCase().replace(' ', '-')}`} name="amenities" value={amenity} />
                                <Label htmlFor={`amenity-${amenity.toLowerCase().replace(' ', '-')}`} className="font-normal">{amenity}</Label>
                                </div>
                            ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 3 && (
                    <section className="space-y-6">
                      <Heading level={2} as="h2" className="text-xl font-semibold border-b pb-2">Upload Photos</Heading>
                      <div className="space-y-2">
                        <Label htmlFor="photos">Property Photos</Label>
                        <Input id="photos" name="photos" type="file" multiple accept="image/*" />
                        <p className="text-xs text-muted-foreground">Upload at least 5 high-quality photos.</p>
                      </div>
                      {/* Placeholder for image previews */}
                      <div className="border border-dashed rounded-md p-8 text-center text-muted-foreground">
                        Photo preview area
                      </div>
                    </section>
                  )}

                  {currentStep === 4 && (
                    <section className="space-y-6">
                      <Heading level={2} as="h2" className="text-xl font-semibold border-b pb-2">Pricing & Availability</Heading>
                       <div className="space-y-2">
                        <Label htmlFor="pricePerNight">Price per Night ($)</Label>
                        <Input id="pricePerNight" name="pricePerNight" type="number" min="1" placeholder="e.g., 100" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Availability</Label>
                        {/* Placeholder for a calendar or date range picker component for availability */}
                        <div className="border rounded-md p-4 text-muted-foreground">
                          Calendar component for setting available dates would go here. For now, assume continuous availability.
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox id="instantBook" name="instantBook" />
                            <Label htmlFor="instantBook" className="font-normal">Enable Instant Booking</Label>
                        </div>
                      </div>
                    </section>
                  )}

                  <Separator />
                  <div className="flex justify-between items-center pt-4">
                    <Button type="button" variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
                      Previous
                    </Button>
                    <Button type="submit">
                      {currentStep < totalSteps ? 'Next Step' : 'Submit Listing'}
                    </Button>
                  </div>
                </form>
            </CardContent>
        </Card>
      </main>
      <FooterLinks linkGroups={footerLinkGroups} />
    </div>
  );
};

export default BecomeAHostPage;