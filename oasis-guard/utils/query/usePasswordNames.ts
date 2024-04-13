import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "~store";
import { Queries } from "~utils/query";
import { getAccountContract } from "~web3";

export const usePasswordNames = () => {
    const userStore = useUserStore();

    return useQuery({
        queryKey: [Queries.NAMES],
        queryFn: async () => {
            try {
                const accountContract = getAccountContract(
                    userStore.publicAddress,
                );
                const names = await accountContract.getNames();
                return names;
            } catch (err) {
                console.log(err);

                return [];
            }
        },
    });
};
