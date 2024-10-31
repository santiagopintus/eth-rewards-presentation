import { useEnvContext } from "next-runtime-env";

export const useRuntimeEnv = () => {
  const env = useEnvContext();
  return { ...env };
};
