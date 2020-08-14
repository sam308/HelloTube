import React from 'react'

import { Grid } from '@material-ui/core';

import VideoItem from './VideoItem';

const VideoList = ({ video, onSelectVideo }) => {

    const listOfVideos = video.map((video, id) => <VideoItem onSelectVideo={onSelectVideo} key={id} video={video}/>)

    return (
        <Grid container spacing={10}>
            {listOfVideos}
        </Grid>
    )
}

export default VideoList;