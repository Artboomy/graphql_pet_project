import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    SearchAnime,
    SearchAnime_Page,
    SearchAnime_Page_media
} from '../types/SearchAnime';
import styles from './list.module.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Box,
    createMuiTheme,
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

interface IListData {
    id: number;
    title: JSX.Element;
    score: JSX.Element;
    episodeCount: JSX.Element;
    season: JSX.Element;
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
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

const loadingRender = () => {
    const skeleton = (
        <Skeleton
            variant='text'
            component={'div'}
            animation={'wave'}
            height={36}
        />
    );
    const skeletonRows: IListData[] = Array(5)
        .fill(null)
        .map((_, idx) => {
            return {
                id: idx,
                title: skeleton,
                episodeCount: skeleton,
                score: skeleton,
                season: skeleton
            };
        });
    return tableRender(skeletonRows);
};

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

const tableRender = (data: IListData[]) => {
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
    const rows = data.map((item) => (
        <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell align={'right'} width={50}>
                {item.episodeCount}
            </TableCell>
            <TableCell align={'right'} width={50}>
                {item.score}
            </TableCell>
            <TableCell
                align={'right'}
                width={150}
                className={styles.seasonText}>
                {item.season}
            </TableCell>
        </TableRow>
    ));
    return (
        <Box pt={1}>
            <TableContainer component={Paper}>
                <Table aria-label={'results table'}>
                    {tableHead}
                    <TableBody>{rows}</TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
const decorateScore = (score: number): JSX.Element => {
    const theme = createMuiTheme();
    let color;
    if (score > 80) {
        color = theme.palette.success;
    } else if (score > 65) {
        color = theme.palette.warning;
    } else {
        color = theme.palette.error;
    }
    return <div style={{ color: color.main }}>{`${score}%`}</div>;
};

const List = React.memo(
    (props: IProps): JSX.Element => {
        const { loading, error, data } = useQuery<SearchAnime>(SEARCH, {
            variables: {
                page: 0,
                perPage: 10,
                search: props.search
            }
        });
        const dataRender = (
            media: (SearchAnime_Page_media | null)[],
            pageInfo: SearchAnime_Page['pageInfo']
        ) => {
            console.info('PageInfo is ', pageInfo);
            const mediaList: SearchAnime_Page_media[] = media.filter(notEmpty);
            const rows: IListData[] = mediaList.map((row) => {
                const romaji = row.title?.romaji;
                const id = row.id;
                const title = (
                    <Link href={`/media/${encodeURIComponent(id)}`}>
                        <div title={romaji || ''}>
                            {row.title?.english || romaji || 'No title'}
                        </div>
                    </Link>
                );
                return {
                    id,
                    title,
                    episodeCount: <>{row.episodes}</>,
                    score: (
                        <>
                            {row?.averageScore
                                ? decorateScore(row.averageScore)
                                : ''}
                        </>
                    ),
                    season: (
                        <>
                            {`${row?.season || ''} ${
                                row?.seasonYear || ''
                            }`.toLowerCase()}
                        </>
                    )
                };
            });
            return tableRender(rows);
        };
        const mediaList = data?.Page?.media || [];
        const pageInfo = data?.Page?.pageInfo;
        return (
            <div>
                {loading ? (
                    loadingRender()
                ) : error ? (
                    <ErrorView errorMessage={error.message} />
                ) : mediaList.length && pageInfo ? (
                    dataRender(mediaList, pageInfo)
                ) : (
                    emptyRender()
                )}
            </div>
        );
    }
);

export default List;
