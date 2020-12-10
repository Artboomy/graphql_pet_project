import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { SearchAnime } from '../types/SearchAnime';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

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
                    native
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

const List = React.memo(
    (props: IProps): JSX.Element => {
        const { loading, error, data } = useQuery<SearchAnime>(SEARCH, {
            variables: {
                page: 0,
                perPage: 10,
                search: props.search
            }
        });
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
        const errorRender = () => 'Error';
        const dataRender = (page: SearchAnime['Page']) => {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label={'results table'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align={'right'}>Episodes</TableCell>
                                <TableCell align={'right'}>Score</TableCell>
                                <TableCell align={'right'}>Season</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {page?.media?.map((row) => {
                                const romaji = row?.title?.romaji;
                                return (
                                    <TableRow key={row?.id || 'no_id'}>
                                        <TableCell
                                            component={'th'}
                                            scope={'row'}>
                                            <div title={romaji || ''}>
                                                <a
                                                    href={row?.siteUrl || '#'}
                                                    target={'_blank'}
                                                    rel={'noreferrer'}>
                                                    {row?.title?.english ||
                                                        romaji ||
                                                        'No title'}
                                                </a>
                                            </div>
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
        data && console.log(data);
        return (
            <div>
                {loading && loadingRender()}
                {error && errorRender()}
                {!loading &&
                    !error &&
                    (data?.Page?.media?.length
                        ? dataRender(data.Page)
                        : 'No results')}
            </div>
        );
    }
);

export default List;
