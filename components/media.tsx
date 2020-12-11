import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ViewMedia, ViewMedia_Media } from '../types/ViewMedia';
import { Box, Container, Typography } from '@material-ui/core';
import sanitizeHtml from 'sanitize-html';
import styles from './media.module.scss';

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
                color
                large
            }
            description(asHtml: true)
        }
    }
`;

const MediaView = (props: IProps): JSX.Element => {
    const { data, loading, error } = useQuery<ViewMedia>(VIEW, {
        variables: {
            id: Number(props.id)
        }
    });
    const loadingRender = () => 'Loading';
    const errorRender = () => (
        <>
            <Typography variant={'h2'}>An error occurred.</Typography>
            {error && <Typography variant={'h6'}>{error.message}</Typography>}
        </>
    );
    data && console.log(data);
    const dataRender = (Media: ViewMedia_Media) => {
        const backgroundImage = Media.bannerImage;
        const style = backgroundImage
            ? { backgroundImage: `url(${backgroundImage})` }
            : {};
        const title = Media.title?.english || Media.title?.romaji;
        const backgroundColor = Media.coverImage?.color || '#ccc';
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
                <div className={styles.bannerImage} style={style}>
                    {' '}
                </div>
                <Container fixed>
                    <Box display={'flex'}>
                        <div
                            title={'Cover image'}
                            className={styles.coverImage}
                            style={{
                                backgroundColor,
                                ...(coverImage && {
                                    backgroundImage: `url(${coverImage})`
                                })
                            }}>
                            {' '}
                        </div>
                        <Box pl={4}>
                            <Typography variant={'h5'}>
                                {Media.siteUrl ? (
                                    <a
                                        href={Media.siteUrl}
                                        target={'_blank'}
                                        rel={'noreferrer'}>
                                        {title}
                                    </a>
                                ) : (
                                    title
                                )}
                            </Typography>
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
                : errorRender()}
        </Container>
    );
};
export default MediaView;
