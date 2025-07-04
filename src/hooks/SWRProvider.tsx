"use client";

import { useCacheProvider } from "@piotr-cz/swr-idb-cache";
import type React from "react";
import { SWRConfig } from "swr";

import { timestampStorageHandler } from "@piotr-cz/swr-idb-cache";

// https://github.com/piotr-cz/swr-idb-cache

const apiRequestMaxAgems = 3 * 60 * 1000;

const gcStorageHandler = {
	...timestampStorageHandler,
	// biome-ignore lint: library code
	revive: (key: string, storeObject: any) => {
		const timeFromPreviousRequest = Date.now() - storeObject.ts;
		return timeFromPreviousRequest < apiRequestMaxAgems
			? timestampStorageHandler.revive(key, storeObject)
			: undefined;
	},
};

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	const cacheProvider = useCacheProvider({
		dbName: "kyopro-problem-list",
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
