'use client';

import Logo from '../Logo';
import CopyrightInfo from './Copyright';
import FooterMenu from './FooterMenu';

interface FooterProps {
  showFooterMenu?: boolean;
  showFooterImage?: boolean;
  showCopyrightInfo?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  showFooterMenu = true,
  showFooterImage = true,
  showCopyrightInfo = true,
}) => {
  const footerMenuOptions: any[] = []; // TODO

  return (
    <footer
      className={`mt-auto border-t bg-white ${
        showFooterMenu && showFooterImage ? 'pt-12' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-screen-2xl px-6">
        <div className="flex flex-col gap-16">
          {showFooterMenu && (
            <div className="grid w-full grid-cols-1 gap-item md:grid-cols-2 xl:grid-cols-4">
              {footerMenuOptions.map((option, index) => (
                <FooterMenu
                  key={index}
                  title={option.title}
                  items={option.items}
                />
              ))}
            </div>
          )}
          {showFooterImage && (
            <div className="mx-auto flex flex-col items-center gap-16">
              <Logo />
            </div>
          )}
          {showCopyrightInfo && (
            <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-4 py-4">
              <CopyrightInfo />
              <img
                className="object-contain"
                src="/payment.png"
                alt="Bankkártáys fizetés"
                width={298}
                height={32}
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
