import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'; // Allow overriding the tag
}

const Heading: React.FC<HeadingProps> = ({ level = 2, children, className, as }) => {
  const Tag = as || (`h${level}` as keyof JSX.IntrinsicElements);
  console.log(`Rendering Heading as ${Tag}:`, children);

  const sizeClasses = {
    h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
    h5: "text-lg font-semibold",
    h6: "text-base font-semibold",
    p: "", // Default p styling or can be customized
    span: "",
    div: ""
  };

  return (
    <Tag className={cn(sizeClasses[Tag as keyof typeof sizeClasses], className)}>
      {children}
    </Tag>
  );
};

export default Heading;