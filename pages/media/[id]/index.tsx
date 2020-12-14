import { useRouter } from 'next/router';
import * as React from 'react';
import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    createMuiTheme,
    Link
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Fab } from '@material-ui/core';
import MediaView from '../../../components/media';
import styles from './index.module.scss';
import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../../apollo/client';
import { ViewMedia } from '../../../types/ViewMedia';
import ErrorView from '../../../components/error';

const theme = createMuiTheme();

const VIEW = gql`
    query ViewMedia($id: Int!) {
        Media(id: $id) {
            id
            title {
                english
                romaji
                native
            }
            siteUrl
            bannerImage
            coverImage {
                large
            }
            description(asHtml: true)
        }
    }
`;

interface IParams {
    id?: string;

    [key: string]: string | string[] | undefined;
}

/**
 * @see https://github.com/vercel/next.js/blob/8340e6d34562ad575293b5699023144fc47831d2/examples/api-routes-apollo-server-and-client/pages/index.js
 * @param context
 */
export const getServerSideProps: GetServerSideProps<
    Record<string, unknown>,
    IParams
> = async (context) => {
    const apolloClient = initializeApollo();
    const id = context.params?.id ? parseInt(context.params.id, 10) : null;
    if (id && !isNaN(id)) {
        await apolloClient.query({
            query: VIEW,
            variables: {
                id
            }
        });
    }
    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        }
    };
};

const loadingRender = () => (
    <Backdrop
        open={true}
        style={{ backgroundColor: theme.palette.background.default }}>
        <CircularProgress color={'secondary'} />
    </Backdrop>
);

const MediaPageView = (props: { id: number }): JSX.Element => {
    const { data, loading, error } = useQuery<ViewMedia>(VIEW, {
        variables: {
            id: props.id
        }
    });
    return (
        <Container disableGutters={true} maxWidth={false}>
            {loading ? (
                loadingRender()
            ) : data && data.Media ? (
                <MediaView media={data.Media} />
            ) : (
                <ErrorView errorMessage={error?.message || 'Unknown error'} />
            )}
        </Container>
    );
};

const MediaPage = (): JSX.Element => {
    const router = useRouter();
    const { id } = router.query;
    const intId = typeof id === 'string' ? parseInt(id, 10) : NaN;
    const isError = id !== null && isNaN(intId);
    return (
        <>
            {isError ? (
                <ErrorView errorMessage={'Page does not exists'} />
            ) : isNaN(intId) ? (
                <Backdrop
                    open={true}
                    style={{
                        backgroundColor: theme.palette.background.default
                    }}>
                    <CircularProgress color={'secondary'} />
                </Backdrop>
            ) : (
                <MediaPageView id={intId} />
            )}
            <Box className={styles.fabButton}>
                <Link href={'/'}>
                    <Fab color={'secondary'}>
                        <HomeIcon />
                    </Fab>
                </Link>
            </Box>
        </>
    );
};

export default MediaPage;
