import { BanIcon } from '@heroicons/react/outline';
import { useLoaderData, useMatches, useSearchParams, useSubmit } from '@remix-run/react';
import { DataFunctionArgs, LoaderArgs } from '@remix-run/server-runtime';
import { sessionStorage } from '~/sessions';

export async function loader({ request, params }: DataFunctionArgs) {
    const [searchParams] = useSearchParams();
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );

    let channel = "eu";
    const sessionChannel = session.get('channel');
    const urlChannel = searchParams.get('channel');

    if(urlChannel != null && urlChannel.length > 0){
        session.flash('channel', urlChannel);
        channel = urlChannel;
    }else if(sessionChannel != null){
        channel = sessionChannel;
    }
    return {channel};
}

export function ChannelSwitcher() {
    const submit = useSubmit();
    const matches = useMatches();
    const { pathname } = matches[matches.length - 1];
    const { channel } = useLoaderData<typeof loader>();

    console.log("::" + channel);

    return (
        <div className="flex items-center">
            <form method="get" action={pathname} onChange={x => submit(x.currentTarget)}>
                <select 
                    name="channel" defaultValue={channel}
                    className="max-w-full rounded-md border border-gray-300 py-1 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                    <option value={"global"}>Global $</option>
                    <option value={"eu"}>European Union €</option> 
                </select>
            </form>
        </div>
    );
}
