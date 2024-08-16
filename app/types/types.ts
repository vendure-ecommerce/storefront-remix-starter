import { Dispatch, SetStateAction } from 'react';

export interface IGlobalOutletContext {
  setLayoutData: Dispatch<SetStateAction<IGlobalLayoutData>>;
}

export interface IGlobalLayoutData {
  showFooterMenu: boolean;
  showFooterImage: boolean;
}
