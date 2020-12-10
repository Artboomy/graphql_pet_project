/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaSeason } from './global.d';

// ====================================================
// GraphQL query operation: SearchAnime
// ====================================================

export interface SearchAnime_Page_pageInfo {
    __typename: 'PageInfo';
    /**
     * The total number of items
     */
    total: number | null;
    /**
     * The current page
     */
    currentPage: number | null;
    /**
     * The last page
     */
    lastPage: number | null;
    /**
     * If there is another page
     */
    hasNextPage: boolean | null;
    /**
     * The count on a page
     */
    perPage: number | null;
}

export interface SearchAnime_Page_media_title {
    __typename: 'MediaTitle';
    /**
     * The official english title
     */
    english: string | null;
    /**
     * The romanization of the native language title
     */
    romaji: string | null;
    /**
     * Official title in it's native language
     */
    native: string | null;
}

export interface SearchAnime_Page_media {
    __typename: 'Media';
    /**
     * The id of the media
     */
    id: number;
    /**
     * The official titles of the media in various languages
     */
    title: SearchAnime_Page_media_title | null;
    /**
     * The amount of episodes the anime has when complete
     */
    episodes: number | null;
    /**
     * A weighted average score of all the user's scores of the media
     */
    averageScore: number | null;
    /**
     * The url for the media page on the AniList website
     */
    siteUrl: string | null;
    /**
     * The season the media was initially released in
     */
    season: MediaSeason | null;
    /**
     * The season year the media was initially released in
     */
    seasonYear: number | null;
}

export interface SearchAnime_Page {
    __typename: 'Page';
    /**
     * The pagination information
     */
    pageInfo: SearchAnime_Page_pageInfo | null;
    media: (SearchAnime_Page_media | null)[] | null;
}

export interface SearchAnime {
    Page: SearchAnime_Page | null;
}

export interface SearchAnimeVariables {
    page?: number | null;
    perPage?: number | null;
    search: string;
}
