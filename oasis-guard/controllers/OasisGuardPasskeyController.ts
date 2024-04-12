import { register } from "~utils";

export class OasisGuardPasskeyController {
    static getDisplayName(): string {
        const readableDate = this.getCurrentDateReadable();
        return "Wallet Created at " + readableDate;
    }

    static getCurrentDateReadable(): string {
        const currentDate = new Date();

        const day =
            currentDate.getDate() < 10
                ? `0${currentDate.getDate()}`
                : currentDate.getDate().toString();
        const month = this.getMonthFromIndex(currentDate.getMonth());
        const year = currentDate.getFullYear().toString();
        return `${month} ${day}, ${year} - ${
            currentDate.getHours().toString().length > 1
                ? currentDate.getHours()
                : "0" + currentDate.getHours().toString()
        }:${
            currentDate.getMinutes().toString().length > 1
                ? currentDate.getMinutes()
                : "0" + currentDate.getMinutes().toString()
        }`;
    }

    static getMonthFromIndex(index: number) {
        const indexToMonth: Record<number, string> = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
        return indexToMonth[index];
    }

    // public static authenticate() {}

    static async register() {
        const CHALLENGE = "frhdfrhdfrhdfrhd";
        return await register(
            OasisGuardPasskeyController.getCurrentDateReadable(),
            "OasisGuard",
            CHALLENGE,
        );
    }
}
