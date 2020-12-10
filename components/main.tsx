import * as React from 'react';
import { useState } from 'react';
import List from './list';
import Button from '@material-ui/core/Button';
import styles from './main.module.scss';
import {
    AppBar,
    Box,
    InputBase,
    Snackbar,
    Toolbar,
    Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Main = (): JSX.Element => {
    // Two variables are necessary, so search will trigger only by button click
    const [searchText, setText] = useState('');
    const [listText, setListText] = useState('');
    const [open, setOpen] = React.useState(false);
    const loadMedia = () => {
        if (searchText) {
            setListText(searchText);
        } else {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <AppBar position={'static'}>
                <Toolbar>
                    <Box display={'flex'} alignItems={'baseline'}>
                        <Box pr={1}>
                            <Typography variant={'h6'}>Sample App</Typography>
                        </Box>
                        <div className={styles.searchWrapper}>
                            <InputBase
                                placeholder={'Anime name'}
                                value={searchText}
                                classes={{
                                    root: styles.searchInput,
                                    input: styles.searchInputInput
                                }}
                                color={'secondary'}
                                onChange={(event) =>
                                    setText(event.target.value)
                                }
                            />
                        </div>
                        <Box pl={1}>
                            <Button
                                variant={'contained'}
                                onClick={() => loadMedia()}
                                size={'large'}>
                                Search
                            </Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}>
                                <Alert severity='warning'>
                                    Please, enter search text
                                </Alert>
                            </Snackbar>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {listText && <List search={listText} />}
        </>
    );
};
export default Main;
