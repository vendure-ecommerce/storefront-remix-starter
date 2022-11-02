import { BanIcon } from '@heroicons/react/outline';
import { useFetcher, useLoaderData, useMatches, useSubmit } from '@remix-run/react';
import { RootLoaderData } from '~/root';

export function ChannelSwitcher() {
    const submit = useSubmit();
    const { activeChannel } = useLoaderData<RootLoaderData>();
    const fetcher = useFetcher();

    return (
        <div className="flex items-center">
            <form method="post" action="/api/change-channel" onChange={x => fetcher.submit(x.currentTarget)}>
                <select
                    name="channel" defaultValue={activeChannel.id == "1" ? "" : "eu"}
                    className="max-w-full rounded-md border border-gray-300 py-1 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                    <option value={""}>Global $</option>
                    <option value={"eu"}>European Union €</option> 
                </select>
            </form>
        </div>
    );
}
