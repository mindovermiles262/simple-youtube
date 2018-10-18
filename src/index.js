import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail'

const API_KEY = '[API KEY]'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('React 16')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term }, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]      
      });
    })
  }

  render() {
    const videoSearch =_.debounce((term) => { this.videoSearch(term)}, 250)

    return(
    <div>
      <div className="row">
        <SearchBar 
          onSearchTermChange={videoSearch} 
        />
      </div>

      <div className="row">
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          />
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
