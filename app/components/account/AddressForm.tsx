import { AvailableCountriesQuery, OrderAddress } from '~/generated/graphql';

export function AddressForm({
  address,
  defaultFullName,
  availableCountries,
}: {
  address?: OrderAddress | null;
  defaultFullName?: string;
  availableCountries?: AvailableCountriesQuery['availableCountries'];
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="fullName"
            name="fullName"
            defaultValue={defaultFullName}
            autoComplete="given-name"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            defaultValue={address?.company ?? ''}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="streetLine1"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="streetLine1"
            id="streetLine1"
            defaultValue={address?.streetLine1 ?? ''}
            autoComplete="street-address"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="streetLine2"
          className="block text-sm font-medium text-gray-700"
        >
          Apartment, suite, etc.
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="streetLine2"
            id="streetLine2"
            defaultValue={address?.streetLine2 ?? ''}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            defaultValue={address?.city ?? ''}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="countryCode"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <div className="mt-1">
          {availableCountries && (
            <select
              id="countryCode"
              name="countryCode"
              defaultValue={address?.countryCode ?? 'US'}
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
          htmlFor="province"
          className="block text-sm font-medium text-gray-700"
        >
          State / Province
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="province"
            id="province"
            defaultValue={address?.province ?? ''}
            autoComplete="address-level1"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Postal code
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            defaultValue={address?.postalCode ?? ''}
            autoComplete="postal-code"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={address?.phoneNumber ?? ''}
            autoComplete="tel"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
