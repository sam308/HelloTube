import React from 'react';

import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetail, VideoList } from './components';

import youtube from './api/youtube';
import styles from './App.module.css';
import logoImage from './images/hellotube.png'; 

class App extends React.Component {

    state = {
        video: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('cricket');
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
                maxResults: 8,
                key: '[API_KEY]',
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
        
            <div className={styles.outerDIV}>
                <Grid justify="center" container spacing={10}>
                    <Grid item xs={11} className={styles.outside} >
                        <h1 className={styles.headline}>Welcome to HelloTube, my very own YouTube player!<img src={logoImage} alt="HelloTube Logo"></img> © Samarpan Chakravarty, 2020. </h1>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid container spacing={10}>
                            <Grid item xs={12}>
                                <SearchBar onFormSubmit={this.handleSubmit}></SearchBar>
                            </Grid> 
                            <Grid item md={8} xs={10}>
                                <VideoDetail video={selectedVideo} ></VideoDetail>
                            </Grid>
                            <Grid item md={4} xs={10}>
                                <VideoList video={video} onSelectVideo={this.onSelectVideo} ></VideoList>
                            </Grid> 
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default App;