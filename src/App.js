import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import YouTubePlaylist from 'react-youtube-playlist';
import ClipLoader from 'react-spinners/ClipLoader';
import ImagePreview from './ImagePreview';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataUri: null,
            loading: false,
            emotions: this.props.emotions,
            age: 20,
            loadSong: false,
            playlistId: "PLA6E336BE9AE31719",
        };
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
        this.getAge = this.getAge(this);
        this.getEmotions = this.getEmotions(this);
        this.getRecs = this.getRecs(this);
    }

    onTakePhotoAnimationDone(dataUri) {
        this.setState({dataUri});
    }

    onSelectImage() {
        //this.setState({loading: true});
        // Analzye & make calls
        this.setState({
            loadSong: true
        });
    }

    getAge() {
        var age = this.state.age;
        this.setState({loading: true});

        //Call api here, change age

        this.setState({age: age, loading: false});
    }

    getEmotions() {
        var emotions = this.state.emotions;
        this.setState({loading: true});


        // Call api here, change emotions
        this.setState({emotions: emotions, loading: false});

    }

    /* Given the age of someone, get the music decade they are most likely to recognize */
    getMusicYearFromAge(age) {
        var d = new Date();
        var currentYear = d.getFullYear();

        /* Get the exact music year  */
        var tmpMusicYear = currentYear - age + 10;
        var leastSignificantDigitOfMusicYear = tmpMusicYear % 10;

        /* Get the music year at a flat decade */
        var musicYear = tmpMusicYear - leastSignificantDigitOfMusicYear;

        /* if the were born in the second half of the music year, suggest music from the next decade */
        if (leastSignificantDigitOfMusicYear >= 5) {
            musicYear += 10;
        }

        //handle edge cases
        if (musicYear < 1950) {
            musicYear = 1950;
        } else if (musicYear > 2010) {
            musicYear = 2010;
        }

        return musicYear;
    }

    /* If the happy emotion confidence is greater than the sad emotion confidence, return true */
    isThisEmotionHappy(emotion) {
        var happyConf = 0.0;
        var sadConf = 0.0;

        emotion.forEach(function (item, index) {
            if (item.label.localeCompare("happy") === 0) {
                happyConf = item.confidence;
            } else if (item.label.localeCompare("sad") === 0) {
                sadConf = item.confidence;
            }
        });

        if (sadConf > happyConf) {
            return false;
        } else {
            return true;
        }
    }

    getPlaylistFromParams(musicYear, isHappy) {
        switch (musicYear) {
            case 1950:
                if (isHappy) {
                    return "PLNDhBcjuPp0-UCSML4DxFqqc5WN4aGcW1";
                } else {
                    return "PLjLPKGJvC8TuhpLXMhskQUaC26zSBjCsM";
                }
            case 1960:
                if (isHappy) {
                    return "PLPKXtd2AJvNkaZgrb0yK3UoQk7487TceH";
                } else {
                    return "PLAZH8pP5KBzXiSfcH_2GgoDeXjtTUF3sM";
                }
            case 1970:
                if (isHappy) {
                    return "PL9QL1AvNabH5u2gfi48VogStrPUY_LijY";
                } else {
                    return "PLjyiHjKMhSuK-rChCn2Xl4RNfUcUhx-qA";
                }
            case 1980:
                if (isHappy) {
                    return "PL857_Yj5tf8cek2iOFyZBE9XSOLOhW-0m";
                } else {
                    return "PLT_7RtTUm0XwsUHTCuQog7xknmMCuvr4B";
                }
            case 1990:
                if (isHappy) {
                    return "PLLWfa8Ng-FdBamt3JCTadmbdd9UtLFZ7K";
                } else {
                    return "PLu1jpc624xfKGhWItKFNRPu7QylkwS-OR";
                }
            case 2000:
                if (isHappy) {
                    return "PLPf_PZG3-WAGq4tgjU6m87Ksndn2Jz2OF";
                } else {
                    return "PLIWqGUaiQxN7kL47fzQ87h0OlTaCyr8-o";
                }
            case 2010:
                if (isHappy) {
                    return "PLeZgwVkN7bbfVLcqnz9l5RjASqUkBtpBe";
                } else {
                    return "PL5D7fjEEs5yflZzSZAhxfgQmN6C_6UJ1W";
                }
            default:
                return "Invalid year! No playlist id generated";
        }
    }

    getRecs() {
        var age = this.state.age;
        var emotions = this.state.emotions;

        //get the playlistId
        var musicYear = this.getMusicYearFromAge(age);
        var isHappy = this.isThisEmotionHappy(emotions);
        var playlistId = this.getPlaylistFromParams(musicYear, isHappy);
        console.log("Created Playlist: " + playlistId);

        console.log("Created Playlist: " + this.state.playlistId);
        this.setState({loading: true});
        // set recs
        this.setState({playlistId: playlistId, loading: false}, () => {
            console.log("update playlist" + this.state.playlistId);
        });
    }


    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        console.log("loadSong: " + this.state.loadSong);
        if (this.state.loading) {
            return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <ClipLoader sizeUnit={"px"} size={100} color={'#36d7b7'} loading={this.state.loading}/>
            </div>)
        } else if (this.state.loadSong) {
            console.log("Attempting to loadSong with playlistId " + this.state.playlistId);
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <YouTubePlaylist
                        width={640}
                        api_key='ENTER YOUTUBE API KEY'
                        playlist_id = {this.state.playlistId}
                        show_thumbnails = {true}
                    />
                </div>)
        } else {
            return (

                <div className="App">
                    {
                        (this.state.dataUri)
                            ? <ImagePreview dataUri={this.state.dataUri} isFullscreen={false}/>
                            : <Camera onTakePhotoAnimationDone={this.onTakePhotoAnimationDone}/>
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
