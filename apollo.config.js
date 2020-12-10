module.exports = {
    client: {
        includes: ['./components/*.tsx'],
        service: {
            name: 'AnilistAPI',
            localSchemaFile: './schema.graphql'
        }
    }
};
