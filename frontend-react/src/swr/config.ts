import { SWRConfiguration } from "swr";

import { fetcher } from "./fetcher";

export const values: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  refreshInterval: 0,
  onError: (error, key) => {
    if (error.status !== 403 && error.status !== 404) {
      // We can send the error to Sentry or show a notification UI.
    }
  },
};
