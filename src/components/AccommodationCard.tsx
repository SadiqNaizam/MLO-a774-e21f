import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // For a potential "View Details" button
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Star } from 'lucide-react'; // Icons
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom'; // Assuming navigation to detail page

interface AccommodationCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  pricePerNight: number;
  rating?: number; // e.g., 4.5
  reviewCount?: number;
  tags?: string[]; // e.g., ["Guest favourite", "Free cancellation"]
  isFavourite?: boolean;
  onToggleFavourite?: (id: string | number) => void;
  detailsLink: string; // Link to the property detail page
  location?: string; // e.g., "Paris, France"
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  id,
  name,
  imageUrl,
  pricePerNight,
  rating,
  reviewCount,
  tags,
  isFavourite: initialIsFavourite = false,
  onToggleFavourite,
  detailsLink,
  location,
}) => {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  console.log("Rendering AccommodationCard:", name);

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if card is wrapped in Link
    e.stopPropagation();
    const newFavState = !isFavourite;
    setIsFavourite(newFavState);
    if (onToggleFavourite) {
      onToggleFavourite(id);
    }
    console.log("Toggled favourite for:", name, "to:", newFavState);
  };

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg group">
      <Link to={detailsLink} className="block">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 10}>
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {onToggleFavourite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-background/70 hover:bg-background text-foreground h-8 w-8"
              onClick={handleToggleFavourite}
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart className={cn("h-4 w-4", isFavourite ? "fill-red-500 text-red-500" : "text-foreground")} />
            </Button>
          )}
          {tags && tags.includes("Guest favourite") && (
             <Badge variant="default" className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Guest favourite
             </Badge>
          )}
        </CardHeader>
        <CardContent className="p-3 space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-base line-clamp-2 leading-tight">{name}</h3>
            {rating && (
              <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          {location && <p className="text-xs text-muted-foreground line-clamp-1">{location}</p>}
           {/* Add other info like 'Entire home', '2 beds', etc. if needed */}
          <p className="text-sm">
            <span className="font-semibold">${pricePerNight.toFixed(0)}</span>
            <span className="text-muted-foreground"> / night</span>
          </p>
        </CardContent>
      </Link>
      {/* Optional: Footer for direct actions like "Book now" or more details */}
      {/* <CardFooter className="p-3 pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link to={detailsLink}>View Details</Link>
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default AccommodationCard;