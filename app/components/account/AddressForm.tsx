import * as React from 'react';
import { AvailableCountriesQuery, OrderAddress } from '~/generated/graphql';

export function AddressForm({
    defaultFirstName,
    defaultLastName,
    address,
    customerAddress,
    prefix,
    availableCountries,
}: {
    defaultFirstName?: string;
    defaultLastName?: string;
    address?: OrderAddress | null;
    customerAddress?: any | null;
    prefix: string;
    availableCountries?: AvailableCountriesQuery['availableCountries'];
}) {
    return (
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div className="">
                <label
                    htmlFor={prefix+"firstName"}
                    className="block text-sm font-medium text-gray-700 required"
                >
                    First name
                </label>
                <div className="mt-1">
                    <input
                        type="text" required
                        id={prefix+"firstName"}
                        name={prefix+"firstName"}
                        defaultValue={address?.fullName?.split(" ")[0] ?? defaultFirstName ?? ""}
                        autoComplete="given-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="">
                <label
                    htmlFor={prefix+"lastName"}
                    className="block text-sm font-medium text-gray-700 required"
                >
                    Last name
                </label>
                <div className="mt-1">
                    <input
                        type="text" required
                        id={prefix+"lastName"}
                        name={prefix+"lastName"}
                        defaultValue={address?.fullName?.split(" ")[1] ?? defaultLastName ?? ""}
                        autoComplete="family-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label
                    htmlFor={prefix+"company"}
                    className="block text-sm font-medium text-gray-700"
                >
                    Company (optional)
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name={prefix+"company"}
                        id={prefix+"company"}
                        defaultValue={address?.company ?? customerAddress?.company ?? ''}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label
                    htmlFor={prefix+"streetLine1"}
                    className="block text-sm font-medium text-gray-700 required"
                >
                    Street address
                </label>
                <div className="mt-1">
                    <input
                        type="text" required
                        name={prefix+"streetLine1"}
                        id={prefix+"streetLine1"}
                        defaultValue={address?.streetLine1 ?? customerAddress?.streetLine1 ?? ''}
                        autoComplete="street-address"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label
                    htmlFor={prefix+"streetLine2"}
                    className="block text-sm font-medium text-gray-700"
                >
                    Apartment, suite, etc. (optional)
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name={prefix+"streetLine2"}
                        id={prefix+"streetLine2"}
                        defaultValue={address?.streetLine2 ?? customerAddress?.streetLine2 ?? ''}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor={prefix+"city"}
                    className="block text-sm font-medium text-gray-700 required"
                >
                    City
                </label>
                <div className="mt-1">
                    <input
                        type="text" required
                        name={prefix+"city"}
                        id={prefix+"city"}
                        autoComplete="address-level2"
                        defaultValue={address?.city ?? customerAddress?.city ?? ''}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor={prefix+"countryCode"}
                    className="block text-sm font-medium text-gray-700 required"
                >
                    Country
                </label>
                <div className="mt-1">
                    {availableCountries && (
                        <select
                            id={prefix+"countryCode"}
                            name={prefix+"countryCode"}
                            defaultValue={address?.countryCode ?? customerAddress?.country?.code ?? "DE"}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                            {availableCountries.map((item) => (
                                <option key={item.id} value={item.code}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <div>
                <label
                    htmlFor={prefix+"province"}
                    className="block text-sm font-medium text-gray-700"
                >
                    State / Province (optional)
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name={prefix+"province"}
                        id={prefix+"province"}
                        defaultValue={address?.province ?? customerAddress?.province ?? ''}
                        autoComplete="address-level1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor={prefix+"postalCode"}
                    className="block text-sm font-medium text-gray-700 required"
                >
                    Postal code
                </label>
                <div className="mt-1">
                    <input
                        type="text" required
                        name={prefix+"postalCode"}
                        id={prefix+"postalCode"}
                        defaultValue={address?.postalCode ?? customerAddress?.postalCode ?? ''}
                        autoComplete="postal-code"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>
        </div>
    );
}
