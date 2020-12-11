/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewMedia
// ====================================================

export interface ViewMedia_Media_title {
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

export interface ViewMedia_Media_coverImage {
    __typename: 'MediaCoverImage';
    /**
     * Average #hex color of cover image
     */
    color: string | null;
    /**
     * The cover image url of the media at a large size
     */
    large: string | null;
}

export interface ViewMedia_Media {
    __typename: 'Media';
    /**
     * The id of the media
     */
    id: number;
    /**
     * The official titles of the media in various languages
     */
    title: ViewMedia_Media_title | null;
    /**
     * The url for the media page on the AniList website
     */
    siteUrl: string | null;
    /**
     * The banner image of the media
     */
    bannerImage: string | null;
    /**
     * The cover images of the media
     */
    coverImage: ViewMedia_Media_coverImage | null;
    /**
     * Short description of the media's story and characters
     */
    description: string | null;
}

export interface ViewMedia {
    /**
     * Media query
     */
    Media: ViewMedia_Media | null;
}

export interface ViewMediaVariables {
    id: number;
}
