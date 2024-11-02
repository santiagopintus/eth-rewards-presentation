import { fetchEthRewards } from "@src/hooks/useFetch";

/**
 * Calculates the date that was a specified number of days before the current date.
 * @param days - The number of days to go back from today.
 * @returns The calculated Date object
 */
export const getDateDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

/**
 * Automatically fetches the blocks data from the API. Since it runs on the server side, it reads env vars directly from the process.env object.
 * @param since - The date in ISO format to start fetching from
 * @param till - The date in ISO format to stop fetching at
 * @returns The time ago in a readable format
 */
export const getServerSideBlocks = async (since: string, till: string) => {
  const { NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_KEY } = process.env;

  if (!NEXT_PUBLIC_API_BASE_URL || !NEXT_PUBLIC_API_KEY) {
    throw new Error("We couldn't fetch the data");
  }

  return fetchEthRewards(
    NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_KEY,
    since,
    till
  );
};

export const currencyFormatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const isWindowLessThan = (width: number) => window.innerWidth < width;
