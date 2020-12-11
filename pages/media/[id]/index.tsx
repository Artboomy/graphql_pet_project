import { useRouter } from 'next/router';
import * as React from 'react';
import Wrapper from '../../../components/wrapper';
import { Box, Link, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Fab } from '@material-ui/core';
import MediaView from '../../../components/media';
import styles from './index.module.scss';

const MediaPage = (): JSX.Element => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <Wrapper>
            <>
                {typeof id === 'string' ? (
                    <MediaView id={id} />
                ) : (
                    <Typography>Wrong Id</Typography>
                )}
                <Box className={styles.fabButton}>
                    <Link href={'/'}>
                        <Fab color={'secondary'}>
                            <HomeIcon />
                        </Fab>
                    </Link>
                </Box>
            </>
        </Wrapper>
    );
};

export default MediaPage;
