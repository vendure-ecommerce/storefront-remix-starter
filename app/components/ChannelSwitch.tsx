import { BanIcon } from '@heroicons/react/outline';
import { useLoaderData } from '@remix-run/react';
import { RootLoaderData } from '~/root';
import { useActiveOrder } from '~/utils/use-active-order';

export function ChannelSwitcher({
    activeChannelToken,
    switchChannel,
}: {
    activeChannelToken: string;
    switchChannel: (channel: string) => void;
}) {
    return (
        <div className="flex items-center">
            <select
                name="channel"
                value={activeChannelToken}
                onChange={(x) => switchChannel(x.target.value)}
                className="max-w-full rounded-md border border-gray-300 py-1 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
                <option value={'row'}>Global $</option>
                <option value={'eu'}>European Union €</option>
            </select>
        </div>
    );
}
