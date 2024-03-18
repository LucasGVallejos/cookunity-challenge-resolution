import { GraphQLError } from "graphql/error";

export const handleGraphQLErrors = (errors: readonly GraphQLError[] ) => {
    errors.forEach((e) => {
        console.error(`GraphQL Error - Name: ${e.name}, Message: ${e.message}`);
    });
};
