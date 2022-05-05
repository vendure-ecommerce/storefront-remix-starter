import * as React from "react"
import { SyntheticEvent, useState } from "react"
import { Form } from '@remix-run/react';

export function SearchBar() {
    let initialQuery = '';
    if (typeof window === "undefined") {
      // running in a server environment
    } else {
      // running in a browser environment
        initialQuery = new URL(window.location.href).searchParams.get("q") ?? '';
    }

    return (
        <Form method="get" action="/search">
            <input type='search'
                   name="q"
                   defaultValue={initialQuery}
                   placeholder='Search'
                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
        </Form>
    )
}
