'use client';

import Section from '../section/Section';
import SectionTitle from '../section/SectionTitle';
import FooterMenuList from './FooterMenuList';
import FooterMenuListItem from './FooterMenuListItem';

interface FooterMenuSectionProps {
  title: string;
  items: string[];
}

const FooterMenu: React.FC<FooterMenuSectionProps> = ({ title, items }) => {
  return (
    <Section className="gap-6">
      <SectionTitle className="text-xl" level="h3" title={title} />
      <FooterMenuList>
        {items.map((item, index) => (
          <FooterMenuListItem key={index}>{item}</FooterMenuListItem>
        ))}
      </FooterMenuList>
    </Section>
  );
};

export default FooterMenu;
