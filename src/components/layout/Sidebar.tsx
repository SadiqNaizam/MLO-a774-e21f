import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Heading from '../Heading'; // Using the custom Heading component

interface SidebarProps {
  children?: React.ReactNode; // To allow custom filter components to be passed in
  title?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, title = "Filters", className }) => {
  console.log("Rendering Sidebar");

  return (
    <aside className={cn("w-full md:w-72 lg:w-80 space-y-6 p-4 border-r sticky top-16 h-[calc(100vh-4rem)] hidden md:block", className)}> {/* Adjust top based on nav height */}
       {title && <Heading level={4} as="h3" className="px-2">{title}</Heading>}
       {title && <Separator className="my-4" />}
       <ScrollArea className="h-[calc(100%-4rem)] pr-3"> {/* Adjust height as needed */}
            <div className="space-y-6">
                {children ? children : (
                    <>
                        {/* Placeholder Content - Replace with actual filter components */}
                        <div>
                            <Heading level={6} as="h4" className="mb-2 text-sm font-medium">Filter Group 1</Heading>
                            <p className="text-xs text-muted-foreground">Placeholder for filter options like checkboxes or sliders.</p>
                        </div>
                        <Separator />
                        <div>
                            <Heading level={6} as="h4" className="mb-2 text-sm font-medium">Filter Group 2</Heading>
                            <p className="text-xs text-muted-foreground">More filter options here.</p>
                        </div>
                    </>
                )}
            </div>
       </ScrollArea>
    </aside>
  );
};

export default Sidebar;