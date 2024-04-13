import type { User } from "~store";

export const OasisGuardStorageKeys = {
    USER_STORE: "userStore",
};

export class OasisGuardStorageController {
    static setUserStore(userStore: User): boolean {
        if (userStore == null) {
            return false;
        }
        localStorage.setItem(
            OasisGuardStorageKeys.USER_STORE,
            JSON.stringify(userStore),
        );
        return true;
    }

    static getUserStore(): User | null {
        const userStore = localStorage.getItem(
            OasisGuardStorageKeys.USER_STORE,
        );
        if (userStore) {
            return JSON.parse(userStore);
        }
        return null;
    }

    static clearUserStore(): void {
        localStorage.removeItem(OasisGuardStorageKeys.USER_STORE);
    }
}
