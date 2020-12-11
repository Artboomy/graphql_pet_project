module.exports = {
    client: {
        includes: ['./components/**/*.tsx', './pages/**/*.tsx'],
        service: {
            name: 'AnilistAPI',
            localSchemaFile: './schema.graphql'
        }
    }
};
