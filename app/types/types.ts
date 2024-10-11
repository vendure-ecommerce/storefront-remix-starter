import { Dispatch, SetStateAction } from 'react';
import { OutletContext } from '~/types';

export type TGlobalOutletContext = OutletContext & {
  setLayoutData: Dispatch<SetStateAction<IGlobalLayoutData>>;
};

export interface IGlobalLayoutData {
  showFooterMenu: boolean;
  showFooterImage: boolean;
}

export type TArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
