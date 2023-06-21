import { Fragment } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from '@remix-run/react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';

export default function FacetFilterControls({
  facetFilterTracker,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: {
  facetFilterTracker: FacetFilterTracker;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (value: boolean) => void;
}) {
  const [searchParams] = useSearchParams();
  const q = searchParams.getAll('q');

  return (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 border-t border-gray-200">
                  <input type="hidden" name="q" value={q} />
                  {facetFilterTracker.facetsWithValues.map((facet) => (
                    <Disclosure
                      as="div"
                      key={facet.id}
                      defaultOpen={true}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900 uppercase">
                                {facet.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmallIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmallIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {facet.values.map((value, optionIdx) => (
                                <div
                                  key={value.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${facet.id}-${optionIdx}`}
                                    defaultValue={value.id}
                                    type="checkbox"
                                    checked={value.selected}
                                    onChange={(ev) => {
                                      // FIXME: ugly workaround because the dialog is in a portal not within the intended form
                                      (
                                        document.getElementById(
                                          `filter-${facet.id}-${optionIdx}`,
                                        ) as HTMLInputElement
                                      ).checked = ev.target.checked;
                                    }}
                                    className="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${facet.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {value.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:block">
        <input type="hidden" name="q" value={q} />
        {facetFilterTracker.facetsWithValues.map((facet) => (
          <Disclosure
            as="div"
            key={facet.id}
            defaultOpen={true}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900 uppercase">
                      {facet.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusSmallIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {facet.values.map((value, optionIdx) => (
                      <div key={value.id} className="flex items-center">
                        <input
                          id={`filter-${facet.id}-${optionIdx}`}
                          name={`fvid`}
                          defaultValue={value.id}
                          type="checkbox"
                          checked={value.selected}
                          onChange={() => {}}
                          className="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor={`filter-${facet.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {value.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </>
  );
}
