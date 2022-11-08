import { Link, Links, Meta, Scripts } from '@remix-run/react';

export default function TaxesShippingInformationPage() {
    return (
        <main className="flex-grow mx-auto max-w-4xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 my-auto py-16 sm:py-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    We ship worldwide!
                </h1>
                <p className="mt-10 text-base text-gray-500">
                    Taxes are calculated depending on your billing information.
                    To see what it will cost to ship your Order, simply add
                    items to your cart and select your country at checkout.
                    We can ship your order to anywhere in the
                    world. Local taxes and customs duties usually apply and are
                    added once your shipment reaches its destination. Please see
                    your local authorities for more information.
                    <h2 className="text-2xl py-3">Taxes</h2>
                    
                    Because our turnover currently does not exceed a certain allowance, we have permission to pay our taxes for orders inside the European Union entirely in Germany (19%).
                    <span className='font-bold'> We don't calculate any taxes for orders outside of the European Union.</span> That means that your order might be held in your countries customs department.

                    <h2 className="text-2xl py-3">Shipping Methods</h2>
                    <table className="mt-2 mb-5 table-auto">
                        <thead>
                            <tr>
                                <th>
                                    Region
                                </th>
                                <th>
                                    Costs
                                </th>
                                <th>
                                    Delievery Time (Estimate)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Germany
                                </td>
                                <td>
                                    2.99 €
                                </td>
                                <td>
                                    1-3 Days
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    European Union
                                </td>
                                <td>
                                    5.99 €
                                </td>
                                <td>
                                    3-14 Days
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Rest of the world
                                </td>
                                <td>
                                    6.99 €
                                </td>
                                <td>
                                    7-30 Days
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    
                    Our delivery charges are based on DHL business prices. The price is
                    calculated according to the size, weight and destination of
                    the consignment. 
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="text-base font-medium text-primary-600 hover:text-primary-500"
                    >
                        Go back home<span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
