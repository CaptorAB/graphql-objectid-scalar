import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";
import { ObjectId } from "mongodb";
import { GraphQLObjectId } from "../src";

const { serialize, parseValue, parseLiteral } = GraphQLObjectId;

describe("graphql-objectid-scalar", () => {
    test("Should serialize an ObjectId object", () => {
        const id = new ObjectId();
        const value = serialize(id);

        expect(value).toEqual(id.toString());
    });

    test("Serialize should reject non ObjectId value", async () => {
        await expect(() => serialize("garbage").toThrow(new GraphQLError()));
    });

    test("parseValue should reject garbage", async () => {
        await expect(() => parseValue("garbage").toThrow(new GraphQLError()));
    });

    test("parseLiteral should reject garbage", async () => {
        await expect(() => parseLiteral({ value: "garbage", kind: Kind.STRING }, {}).toThrow(new GraphQLError()));
    });

    test("parseValue should return an ObjectId object", () => {
        const id = new ObjectId();
        const result = parseValue(id.toString());

        expect(result.toString()).toEqual(id.toString());
        expect(result.constructor).toEqual(ObjectId);
    });

    test("parseLiteral should return an ObjectId object", () => {
        const id = new ObjectId();
        const result = parseLiteral({ value: id.toString(), kind: Kind.STRING }, {});

        expect(result.toString()).toEqual(id.toString());
        expect(result.constructor).toEqual(ObjectId);
    });
});
