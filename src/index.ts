import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { GraphQLError } from "graphql/error";
import { ObjectId } from "mongodb";

export function isValidMongoDBObjectID(id: string): boolean {
    /// https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    id = id + "";
    const len = id.length;
    let valid = false;
    if (len === 12 || len === 24) {
        valid = /^[0-9a-fA-F]+$/.test(id);
    }
    return valid;
}

export const GraphQLObjectId = new GraphQLScalarType({
    name: "GraphQLObjectId",
    description: "GraphQLObjectId is a mongodb ObjectId. String of 12 or 24 hex chars",

    // from database towards client
    serialize(value: any): string {
        let result: string;
        if (value instanceof ObjectId) {
            result = value.toString();
        } else if (typeof value === "string" || value instanceof String) {
            result = value.toString();
        } else {
            throw new GraphQLError("serialize: value: " + value.toString() + " is not valid ObjectId");
        }
        if (!isValidMongoDBObjectID(result)) {
            throw new GraphQLError("serialize: value: " + result + " is not valid ObjectId");
        }

        return result;
    },

    // json from client towards database
    parseValue(value): ObjectId {
        if (!isValidMongoDBObjectID(value as string)) {
            throw new GraphQLError("parseValue: not a valid ObjectId string, require a string with 12 or 24 hex chars, found: " + value);
        }

        return new ObjectId(value as string);
    },

    // AST from client towards database
    parseLiteral(ast): ObjectId {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                "parseLiteral: not a valid ObjectId string, require a string with 12 or 24 hex chars, found: " + ast.kind,
                [ast]
            );
        }

        const value = ast.value.toString();
        return new ObjectId(value);
    },
});

export default GraphQLObjectId;
