import { fetchEthRewards } from "@src/hooks/useFetch";

export const getISODate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const getTimeAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const getServerSideBlocks = async () => {
  const { NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_KEY } = process.env;

  if (!NEXT_PUBLIC_API_BASE_URL || !NEXT_PUBLIC_API_KEY) {
    throw new Error("We couldn't fetch the data");
  }

  return fetchEthRewards(
    NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_KEY,
    getTimeAgo(30),
    new Date().toISOString()
  );
};
