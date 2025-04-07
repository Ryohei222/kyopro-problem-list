"use client";

import React from "react";
import { SWRConfig } from "swr";
import { useCacheProvider } from "@piotr-cz/swr-idb-cache";

import { timestampStorageHandler } from "@piotr-cz/swr-idb-cache";

// https://github.com/piotr-cz/swr-idb-cache

const maxAge = 24 * 60 * 60 * 1000;

const gcStorageHandler = {
    ...timestampStorageHandler,
    revive: (key: string, storeObject: any) =>
        storeObject.ts > Date.now() - maxAge
            ? timestampStorageHandler.revive(key, storeObject)
            : undefined,
    replace: (key: string, value: any) =>
        !key.startsWith("/api/problemset/")
            ? timestampStorageHandler.replace(key, value)
            : undefined,
};

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
    const cacheProvider = useCacheProvider({
        dbName: "cp-problem-set",
        storeName: "swr-cache",
        storageHandler: gcStorageHandler,
    });

    if (!cacheProvider) {
        return <>{children}</>;
    }

    return (
        <SWRConfig
            value={{
                provider: cacheProvider,
                refreshInterval: 0,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                revalidateIfStale: false,
                dedupingInterval: 1000 * 60 * 5,
            }}
        >
            {children}
        </SWRConfig>
    );
};
