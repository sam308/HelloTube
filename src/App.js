import React from 'react';

import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetail, VideoList } from './components';

import youtube from './api/youtube';

class App extends React.Component {

    state = {
        video: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('taylor swift');
    }

    onSelectVideo = (video) => {
        this.setState({
            selectedVideo: video
        });
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { 
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyB1Xt1UR0hx8z_M1XKjtZkIggLhRTqwOEU',
                q: searchTerm,
            }
        });

        this.setState({
            video: response.data.items,
            selectedVideo: response.data.items[0]
        });

    }

    render () {

        const { video, selectedVideo } = this.state;

        return(
            <Grid justify="center" container spacing={10}>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}></SearchBar>
                        </Grid> 
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} ></VideoDetail>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList video={video} onSelectVideo={this.onSelectVideo} ></VideoList>
                        </Grid> 
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;