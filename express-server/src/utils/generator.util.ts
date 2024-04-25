export class SGMockDataGeneratorUtil {
    public static generateUuid(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static generateArray(count: number, generationFunction: (i: number, ...args) => void): any[] {
        return [...new Array(count).keys()].map(i => generationFunction(i));
    }

    public static generateInt(min: number, max: number): number {
        return Math.floor(SGMockDataGeneratorUtil.generateDouble(min, max));
    }

    public static generateDouble(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static generateBoolean(): boolean {
        return SGMockDataGeneratorUtil.generateInt(0, 100) % 2 === 0;
    }

    public static generateValueOrNull<T>(value: T): T | null {
        return SGMockDataGeneratorUtil.generateInt(0, 100) % 2 === 0 ? value : null;
    }

    public static generateValueOrAnotherValue<T>(value: T, anotherValue: T): T | null {
        return SGMockDataGeneratorUtil.generateInt(0, 100) % 2 === 0 ? value : anotherValue;
    }

    public static getRandomFromArray<T>(array: T[]): T {
        return array[SGMockDataGeneratorUtil.generateInt(0, array.length)];
    }

    public static getRandomEntriesFromArray<T>(array: T[]): T[] {
        const startIndex: number = SGMockDataGeneratorUtil.generateInt(0, array.length);
        const countEntries: number = SGMockDataGeneratorUtil.generateInt(startIndex, array.length);
        return array.slice(startIndex, countEntries);
    }

    public static getFirstNEntriesFromArray<T>(array: T[], count: number): T[] {
        return array.slice(0, count > array.length ? array.length : count);
    }

    public static generateRandomString(): string {
        return Math.random().toString(36)
            .replace(/[^a-z]+/g, "");
    }

    public static getTimezoneOffset(timezone: string, defaultValue?: number): number {
        timezone = timezone.replace(/:/g, "");
        const requestedTimezoneOffset: number = Date.parse("Jan 01, 1970 00:00:00 " + timezone);
        return isNaN(requestedTimezoneOffset)
            ? defaultValue
            : requestedTimezoneOffset;
    }
}
