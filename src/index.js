import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { GraphQLError } from "graphql/error";
import { ObjectId } from "mongodb";

export function isValidMongoDBObjectID(id) {
    /// https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    id = id + "";
    var len = id.length,
        valid = false;
    if (len === 12 || len === 24) {
        valid = /^[0-9a-fA-F]+$/.test(id);
    }
    return valid;
}

export const GraphQLObjectId = new GraphQLScalarType({
    name: "GraphQLObjectId",
    description: "GraphQLObjectId is a mongodb ObjectId. String of 12 or 24 hex chars",

    // from database towards client
    serialize(value) {
        if (value.constructor !== ObjectId) {
            throw new GraphQLError("serialize: value: " + value.toString() + " is not valid ObjectId");
        }

        let result = value.toString();
        if (!isValidMongoDBObjectID(result)) {
            throw new GraphQLError("serialize: value: " + value.toString() + " is not valid ObjectId");
        }

        return result;
    },

    // json from client towards database
    parseValue(value) {
        if (!isValidMongoDBObjectID(value)) {
            throw new GraphQLError("serialize: not a valid ObjectId, require a string with 12 or 24 hex chars, found: " + value);
        }

        return new ObjectId(value);
    },

    // AST from client towards database
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError("parseLiteral: not a valid ObjectId, require a string with 12 or 24 hex chars, found: " + ast.kind, [
                ast
            ]);
        }

        const value = ast.value.toString();
        return new ObjectId(value);
    }
});

export default GraphQLObjectId;
