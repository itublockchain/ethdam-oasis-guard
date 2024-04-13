import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "~store";
import { Queries } from "~utils/query";
import { getAccountContract } from "~web3";

export const usePasswordNames = () => {
    const userStore = useUserStore();

    const { data, ...rest } = useQuery({
        queryKey: [Queries.NAMES],
        queryFn: async () => {
            try {
                const accountContract = getAccountContract(
                    userStore.publicAddress,
                );
                const names = await accountContract.getNames();
                return names as string[];
            } catch (err) {
                console.log(err);
                return [];
            }
        },
        refetchInterval: 5000,
    });

    return { data: data ?? [], ...rest };
};
