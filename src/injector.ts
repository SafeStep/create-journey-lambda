import Container from "typedi"
import { DocumentClient } from "aws-sdk/clients/dynamodb"

export default abstract class Injector {
    static async init() {
        try {
            const envVariables = await import(`./env/${process.env.NODE_ENV}`);
            for (const [key, value] of Object.entries(envVariables.default)) {
                Container.set(key, value);
            }
        }
        catch (e) {
            console.error(e);
            throw "Could not initialise env depedencies"
        }

        Container.set(DocumentClient, new DocumentClient({region: Container.get("aws_region")}));
    }
}
