import { ShippingFormData } from '~/types';

export function shippingFormDataIsValid(
    data: FormData | Record<string, string>,
): boolean {
    const shippingFormData = (
        data instanceof FormData
            ? Object.fromEntries<any>(data.entries())
            : data
    ) as ShippingFormData;
    return !!(
        shippingFormData.streetLine1 &&
        shippingFormData.city &&
        shippingFormData.countryCode &&
        shippingFormData.postalCode
    );
}
