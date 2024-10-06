export class ConversionUtils {
    static jsonToObject<T>(jsonString: string, type: { new(...args: any[]): T }): T | null {
        try {
            return JSON.parse(jsonString) as T;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }
}
