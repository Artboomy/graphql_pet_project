import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { SearchAnime, SearchAnime_Page } from '../types/SearchAnime';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Box,
    Container,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import ErrorView from './error';

interface IProps {
    search: string;
}

const SEARCH = gql`
    query SearchAnime($page: Int, $perPage: Int, $search: String!) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(search: $search, isAdult: false) {
                id
                title {
                    english
                    romaji
                }
                episodes
                averageScore
                siteUrl
                season
                seasonYear
            }
        }
    }
`;
const loadingRender = () => (
    <Container>
        {Array(10).fill(
            <Skeleton
                variant='text'
                height={53}
                component={'div'}
                animation={'wave'}
            />
        )}
    </Container>
);

const emptyRender = () => (
    <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        pt={8}>
        <Typography variant={'h2'} align={'center'}>
            No results
        </Typography>
    </Box>
);

const List = React.memo(
    (props: IProps): JSX.Element => {
        const { loading, error, data } = useQuery<SearchAnime>(SEARCH, {
            variables: {
                page: 0,
                perPage: 10,
                search: props.search
            }
        });
        const tableHead = (
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align={'right'}>Episodes</TableCell>
                    <TableCell align={'right'}>Score</TableCell>
                    <TableCell align={'right'}>Season</TableCell>
                </TableRow>
            </TableHead>
        );
        const dataRender = (page: SearchAnime_Page) => {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label={'results table'}>
                        {tableHead}
                        <TableBody>
                            {page?.media?.map((row) => {
                                const romaji = row?.title?.romaji;
                                return (
                                    <TableRow key={row?.id || 'no_id'}>
                                        <TableCell
                                            component={'th'}
                                            scope={'row'}>
                                            <Link
                                                href={`/media/${encodeURIComponent(
                                                    row?.id || 'no_id'
                                                )}`}>
                                                <div title={romaji || ''}>
                                                    {row?.title?.english ||
                                                        romaji ||
                                                        'No title'}
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {row?.episodes}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {row?.averageScore}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {`${row?.season || ''} ${
                                                row?.seasonYear || ''
                                            }`}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        };
        return (
            <div>
                {loading ? (
                    loadingRender()
                ) : error ? (
                    <ErrorView errorMessage={error.message} />
                ) : data?.Page?.media?.length ? (
                    <Box pt={1}>{dataRender(data.Page)}</Box>
                ) : (
                    emptyRender()
                )}
            </div>
        );
    }
);

export default List;
