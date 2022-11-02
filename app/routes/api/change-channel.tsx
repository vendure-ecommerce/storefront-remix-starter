import { useOutletContext } from "@remix-run/react";
import { DataFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { sessionStorage } from '~/sessions';

export async function loader({ request }: DataFunctionArgs) {
    return {};
}

export async function action({ request }: DataFunctionArgs) {
    let body = await request.formData();
    const channel = body.get("channel");
    
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );

    let headers: ResponseInit['headers'] = {};
    session.flash('channel', channel);

    headers = {
        'Set-Cookie': await sessionStorage.commitSession(session),
    };

    return json ("", {headers: headers});
}

