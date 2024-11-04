import { Block } from "@src/model/model.interface";

export const fetchEthRewards = async (
  url: string,
  apiKey: string,
  since: string,
  till: string
): Promise<Block[] | void> => {
  const query = `
    query ($network: EthereumNetwork, $since: ISO8601DateTime, $till: ISO8601DateTime) {  
      ethereum(network: $network) {
        blocks(date: {since: $since, till: $till}) {
          reward: reward(in:USD)
          date {
            date
          }
        }
      }
    }`;

  const variables = {
    network: "ethereum",
    since,
    till,
    dateFormat: "%Y-%m-%d",
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("X-API-KEY", apiKey);

  const body = JSON.stringify({
    query,
    variables,
  });

  const fetchOptions = {
    method: "POST",
    headers,
    body,
  };

  return fetch(url, fetchOptions)
    .then((res) => {
      if (!res.ok) {
        handleOpError("We couldn't fetch the data");
      }
      return res.json();
    })
    .then((data) => {
      if (!data?.data?.ethereum?.blocks) {
        throw new Error("Data structure unexpected");
      }
      return data.data.ethereum.blocks as Block[];
    })
    .catch((e) => {
      handleOpError(e);
    });
};

const handleOpError = (e?: string) => {
  throw new Error(e ? e : "We couldn't fetch the data");
};
