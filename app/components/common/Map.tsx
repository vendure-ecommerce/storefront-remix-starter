

import React from "react";

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  return (
    <div className='relative h-0 w-full pb-[100%]'>
      <iframe
        className='absolute left-0 top-0 h-full w-full rounded-lg'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.5421969124513!2d19.132215077462217!3d47.479349996754685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c33153cd388d%3A0x73610b215049743b!2sBudapest%2C%20Ih%C3%A1sz%20u.%2013%2C%201103!5e0!3m2!1shu!2shu!4v1710841976384!5m2!1shu!2shu'
        width='400'
        height='400'
        style={{ border: 0 }}
        allowFullScreen={true}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};

export default Map;
