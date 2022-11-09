export function shippingFormDataIsValid(
    data: FormData | Record<string, string>,
): boolean {
    const formData =
        data instanceof FormData
            ? Object.fromEntries<any>(data.entries())
            : data;
    return !!(
        formData.emailAddress &&
        formData.billing_firstName &&
        formData.billing_lastName &&
        formData.billing_streetLine1 &&
        formData.billing_city &&
        formData.billing_countryCode &&
        formData.billing_postalCode &&
        (!formData.useDifferentShippingAdress ||
            (formData.shipping_streetLine1 &&
                formData.shipping_city &&
                formData.shipping_countryCode &&
                formData.shipping_postalCode))
    );
}
