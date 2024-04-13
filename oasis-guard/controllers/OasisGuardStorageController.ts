import type { User } from "~store";

export const OasisGuardStorageKeys = {
    USER_STORE: "userStore",
};

export class OasisGuardStorageController {
    static async setUserStore(userStore: User) {
        localStorage.setItem(
            OasisGuardStorageKeys.USER_STORE,
            JSON.stringify(userStore),
        );
    }

    static async getUserStore() {
        const userStore = localStorage.getItem(
            OasisGuardStorageKeys.USER_STORE,
        );
        if (userStore) {
            return JSON.parse(userStore);
        }
        return null;
    }

    static async clearUserStore() {
        localStorage.removeItem(OasisGuardStorageKeys.USER_STORE);
    }
}
