import * as React from 'react';
import { ViewMedia_Media } from '../types/ViewMedia';
import { Box, Container, Typography } from '@material-ui/core';
import sanitizeHtml from 'sanitize-html';
import styles from './media.module.scss';
import LinkIcon from '@material-ui/icons/Link';
interface IProps {
    media: ViewMedia_Media;
}

const MediaView = (props: IProps): JSX.Element => {
    const Media = props.media;
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
                <Box pt={4} className={styles.mainGrid}>
                    <Box
                        className={styles.coverImageWrapper}
                        style={{
                            ...(bannerImage && {
                                marginTop: '-100px'
                            })
                        }}>
                        {coverImage ? (
                            <img
                                src={coverImage}
                                className={styles.coverImage}
                                alt={'Cover image'}
                            />
                        ) : (
                            <div>Cover Image</div>
                        )}
                    </Box>
                    <Box display={'flex'} className={styles.gridTitle}>
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
                            className={styles.gridDescription}
                            dangerouslySetInnerHTML={createMarkup(description)}
                        />
                    )}
                </Box>
            </Container>
        </>
    );
};
export default MediaView;
