import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

export function ChannelSwitcher({
    activeChannelToken,
    switchChannel,
}: {
    activeChannelToken: string;
    switchChannel: (channel: string) => void;
}) {
    const location = useLocation();
    const [active, setActive] = useState<boolean>();

    useEffect(() => {
        setActive(location.pathname.toLowerCase().startsWith("/checkout"));
    }, [location]);

    return (
        <div className="flex items-center space-x-2">
            <span className="hidden">Calculate Tax: </span>
            <select
                name="channel" disabled={active}
                value={activeChannelToken}
                onChange={(x) => switchChannel(x.target.value)}
                className="max-w-full rounded-md border border-gray-300 py-1 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
                <option value={'row'}>Global €</option>
                <option value={'eu'}>European Union €</option>
            </select>
        </div>
    );
}
