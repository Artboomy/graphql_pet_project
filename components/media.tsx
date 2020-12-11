import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ViewMedia, ViewMedia_Media } from '../types/ViewMedia';
import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    createMuiTheme,
    Typography
} from '@material-ui/core';
import sanitizeHtml from 'sanitize-html';
import styles from './media.module.scss';
import LinkIcon from '@material-ui/icons/Link';

interface IProps {
    id: string;
}

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
const theme = createMuiTheme();

const errorRender = (errorMessage: string) => (
    <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        minHeight={'100vh'}>
        <Typography variant={'h2'} color={'error'} align={'center'}>
            An error occurred
        </Typography>
        {errorMessage && (
            <Typography variant={'h6'} color={'textSecondary'} align={'center'}>
                {errorMessage}
            </Typography>
        )}
    </Box>
);
const loadingRender = () => (
    <Backdrop
        open={true}
        style={{ backgroundColor: theme.palette.background.default }}>
        <CircularProgress color={'secondary'} />
    </Backdrop>
);

const MediaView = (props: IProps): JSX.Element => {
    const { data, loading, error } = useQuery<ViewMedia>(VIEW, {
        variables: {
            id: Number(props.id)
        }
    });
    data && console.log(data);
    const dataRender = (Media: ViewMedia_Media) => {
        const bannerImage = Media.bannerImage;
        const title = Media.title?.english || Media.title?.romaji;
        const coverImage = Media.coverImage?.large;
        let description = Media.description;
        description = description
            ? sanitizeHtml(description)
            : 'No description present';
        const createMarkup = (safeHtml: string) => {
            return { __html: safeHtml };
        };
        return (
            <>
                {bannerImage && (
                    <div
                        className={styles.bannerImage}
                        style={{ backgroundImage: `url(${bannerImage})` }}>
                        {' '}
                    </div>
                )}
                <Container fixed>
                    <Box display={'flex'} pt={4}>
                        <div
                            title={'Cover image'}
                            className={styles.coverImage}
                            style={{
                                ...(coverImage && {
                                    backgroundImage: `url(${coverImage})`
                                }),
                                ...(bannerImage && {
                                    marginTop: '-100px'
                                })
                            }}>
                            {' '}
                        </div>
                        <Box pl={4}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant={'h4'}>{title}</Typography>
                                {Media.siteUrl && (
                                    <a
                                        href={Media.siteUrl}
                                        style={{
                                            display: 'flex',
                                            marginLeft: '8px'
                                        }}
                                        target={'_blank'}
                                        rel={'noreferrer'}>
                                        <LinkIcon fontSize={'large'} />
                                    </a>
                                )}
                            </Box>
                            {description && (
                                <div
                                    dangerouslySetInnerHTML={createMarkup(
                                        description
                                    )}
                                />
                            )}
                        </Box>
                    </Box>
                </Container>
            </>
        );
    };
    return (
        <Container disableGutters={true} maxWidth={false}>
            {loading
                ? loadingRender()
                : data && data.Media
                ? dataRender(data.Media)
                : errorRender(error?.message || 'Unknown error')}
        </Container>
    );
};
export default MediaView;
