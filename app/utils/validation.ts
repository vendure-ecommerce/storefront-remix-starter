import { ShippingFormData } from '~/types';

export function shippingFormDataIsValid(formData: FormData): boolean {
    const shippingFormData = Object.fromEntries<any>(
        formData.entries(),
    ) as ShippingFormData;
    return !!(
        shippingFormData.streetLine1 &&
        shippingFormData.city &&
        shippingFormData.countryCode &&
        shippingFormData.postalCode
    );
}
