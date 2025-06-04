import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../Heading'; // Using the custom Heading component

interface FooterLinkItem {
  label: string;
  to: string;
  external?: boolean;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLinkItem[];
}

interface FooterLinksProps {
  linkGroups: FooterLinkGroup[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ linkGroups }) => {
  console.log("Rendering FooterLinks with groups:", linkGroups.length);

  if (!linkGroups || linkGroups.length === 0) {
    return null;
  }

  return (
    <div className="py-8 md:py-12 bg-muted/40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <Heading level={6} as="h3" className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">
                {group.title}
              </Heading>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Optional: Copyright and social links can be added here or in a separate Footer component */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} YourCompany, Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;