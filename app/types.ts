import { FetcherWithComponents } from "@remix-run/react";

export type OutletContext = {
    activeOrderFetcher: FetcherWithComponents<any>;
    activeOrder: any;
    adjustOrderLine: any;
    removeItem: any;
    switchChannel: any;
    setActiveChannelToken: React.Dispatch<React.SetStateAction<string>>;
};
