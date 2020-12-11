import { Box, Typography } from '@material-ui/core';
import * as React from 'react';

const ErrorView = (cfg: { errorMessage: string }): JSX.Element => (
    <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        pt={8}>
        <Typography variant={'h2'} color={'error'} align={'center'}>
            An error occurred
        </Typography>
        {cfg.errorMessage && (
            <Typography variant={'h6'} color={'textSecondary'} align={'center'}>
                {cfg.errorMessage}
            </Typography>
        )}
    </Box>
);

export default ErrorView;
