/**
 * Copyright Clave - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import {
    atom,
    useRecoilValue,
    useSetRecoilState,
    type SetterOrUpdater,
} from "recoil";

export type User = {
    credentialId: string;
    publicKey: [string, string];
    publicAddress: string;
    userId: string;
};

export const UserStore = atom<User | null>({
    default: null,
    key: "UserStore.Atom",
});

export const useUserStore = (): User => {
    return useRecoilValue(UserStore) as User;
};
export const useSetUserStore = (): SetterOrUpdater<User | null> => {
    return useSetRecoilState(UserStore);
};
