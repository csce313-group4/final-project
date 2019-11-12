import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import YouTube from 'react-youtube';
import ClipLoader from 'react-spinners/ClipLoader';
import ImagePreview from './ImagePreview';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

class App extends React.Component {
    constructor(props,context) {
      super(props,context);
      this.state = {
        dataUri: null,
        loading: false,
        emotions: this.props.emotions,
        age: 20,
        loadSong: false,
        playlistId: "",
      };
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
        this.getAge = this.getAge(this);
        this.getEmotions = this.getEmotions(this);
        this.getRecs = this.getRecs(this);
  }


    onTakePhotoAnimationDone (dataUri) {
    this.setState({ dataUri });
  }

      onSelectImage () {
        //this.setState({loading: true});
        // Analzye & make calls
          this.setState({
              loadSong: true
          } );
      }

      getAge() {
        var age = this.state.age;
        this.setState({loading: true});

        //Call api here, change age

        this.setState({age:age, loading: false});
      }

      getEmotions(){
        var emotions = this.state.emotions;
        this.setState({loading: true});


        // Call api here, change emotions
        this.setState({emotions:emotions, loading: false});

        }

        getRecs(){
        var age = this.state.age;
        var emotions = this.state.emotions;
        var playlistId = this.state.playlistId;
        //michael, set a playlist id from this
        this.setState({loading:true});
        // set recs
        this.setState({playlistId: playlistId,loading:false});
        }


      render()
      {
        const opts = {
          height: '390',
          width: '640',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
          }
        };
        if(this.state.loading){
            return (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                        <ClipLoader sizeUnit={"px"} size={100} color={'#36d7b7'}  loading={this.state.loading} />
            </div>)
        }
        else if(this.state.loadSong){
          return(
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                  <YouTube
                    videoId="dQw4w9WgXcQ"
                    opts={opts}
                    />
              </div>)
        }
        else {
            return (

                <div className="App">
                    {
                        (this.state.dataUri)
                            ? <ImagePreview dataUri={this.state.dataUri} isFullscreen={false}/>
                            : <Camera onTakePhotoAnimationDone = {this.onTakePhotoAnimationDone} />
                    }
                                <div>
                <Navbar bg="dark" variant="dark" sticky="top">
                          <Button variant="primary" onClick={this.onSelectImage}>Get Recommendation</Button>
                      </Navbar>
                                </div>

                </div>
            );
        }
      }
    }

    App.defaultProps = {
          "emotions": ([
        {
          "confidence": 0.9386989,
          "label": "Happy"
        },
        {
          "confidence": 0.0483937,
          "label": "Neutral"
        },
        {
          "confidence": 0.0120008,
          "label": "Disgust"
        },
        {
          "confidence": 0.000406,
          "label": "Sad"
        },
        {
          "confidence": 0.0003461,
          "label": "Fear"
        },
        {
          "confidence": 0.00015,
          "label": "Angry"
        },
        {
          "confidence": 0.0000046,
          "label": "Surprise"
        }
      ])
};
export default App;
