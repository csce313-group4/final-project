import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import YouTube from 'react-youtube';
import 'react-youtube-playlist/dist/styles.scss'
import ClipLoader from 'react-spinners/ClipLoader';
import LoadingOverlay from 'react-loading-overlay'
import ImagePreview from './ImagePreview';
var Flickr = require('flickr-sdk');


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            backgroundImage: '',
            azureKey: '',
            dataUri: null,
            loading: false,
            emotion: this.props.emotion,
            isHappy: true,
            age: 20,
            loadSong: false,
            opts: {
            height: '800px', width: '960px',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
               // listType: 'radio',
                list: 'PLmS86t_jmQvbpeehASz2Tosvj7d1VN-ZE',
                playsinline: 1,
                modestbranding: 1,
                index: 10,
                controls: 0
            }
            }
        };
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
        this.getAgeAndEmotion = this.getAgeAndEmotion.bind(this);
        this.getRecs = this.getRecs.bind(this);
        this.getMusicYearFromAge = this.getMusicYearFromAge.bind(this);
        this.isThisEmotionHappy = this.isThisEmotionHappy.bind(this);
        this.getPlaylistFromParams = this.getPlaylistFromParams.bind(this);
        this.getBackgroundImage = this.getBackgroundImage.bind(this);
    }

    onTakePhotoAnimationDone(dataUri) {
        this.setState({dataUri: dataUri, loading: true});

        Promise.all([this.getAgeAndEmotion()])
            .then(([[age, emotion]]) => {
                this.setState({age: age, emotion: emotion});
                this.getRecs();
            })
            .catch(err => this.getRecs())
            .then(() => {
                Promise.all([this.getBackgroundImage()])
                    .then(([backgroundImage]) => {
                        this.setState({backgroundImage: backgroundImage, loading: false, loadSong: true});
                    })
                    .catch(function () {
                        console.log('backgroundImage promise err')
                    });
            })
    }

    onSelectImage() {
        //this.setState({loading: true});
        // Analzye & make calls
        this.setState({
            loadSong: true
        });
    }

    getAgeAndEmotion() {
        return new Promise((resolve, reject) => {
            var age = -1;
            var emotion = null;
            const azureSubscriptionKey = this.state.azureKey;
            const uri = "https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=age,emotion"
            var buff = new Buffer(this.state.dataUri.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');

            fetch(uri, {
                method: 'post',
                body: buff,
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key': azureSubscriptionKey,
                }
            })
                .then((res) => res.json())
                .then(function (jsonData) {
                    console.log(jsonData);
                    if (jsonData.length > 0) {
                        //get the first face we found
                        age = jsonData[0].faceAttributes.age;
                        emotion = jsonData[0].faceAttributes.emotion;
                        console.log("Azure: age = " + age);
                        console.log("Azure: emotion = " + emotion);
                        resolve([age, emotion]);
                    } else {
                        console.log("NO FACES FOUND");
                        reject();
                    }
                })
                .catch(function () {
                    console.log("got her");
                    reject();
                });
        })
    }

    /* Given the age of someone, get the music decade they are most likely to recognize */
    getMusicYearFromAge(age) {
        //handle error case
        if(age < 0) {
            return age;
        }

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
        //handle error edge case
        if(emotion == null) {
            console.log("emotion was null");
            console.log(emotion);
            return true;
        }

        var happyConf = emotion.happiness;
        var sadConf = emotion.sadness;

        console.log("happy:" + happyConf);
        console.log("sad:" + sadConf);

        if (sadConf > happyConf) {
            return false;
        } else {
            return true;
        }
    }

    getPlaylistFromParams(musicYear, isHappy) {
        switch (musicYear) {
            case 1950:
                if(isHappy){
                    return "PLNDhBcjuPp0-UCSML4DxFqqc5WN4aGcW1";
                }
                else {
                    return "PLjLPKGJvC8TuhpLXMhskQUaC26zSBjCsM";
                }
            case 1960:
                if(isHappy){
                    return "PLPKXtd2AJvNkaZgrb0yK3UoQk7487TceH";
                }
                else {
                    return "PLAZH8pP5KBzXiSfcH_2GgoDeXjtTUF3sM";
                }
            case 1970:
                if(isHappy){
                    return "PL9QL1AvNabH5u2gfi48VogStrPUY_LijY";
                }
                else {
                    return "PLjyiHjKMhSuK-rChCn2Xl4RNfUcUhx-qA";
                }
            case 1980:
                if(isHappy){
                    return "PL857_Yj5tf8cek2iOFyZBE9XSOLOhW-0m";
                }
                else {
                    return "PLT_7RtTUm0XwsUHTCuQog7xknmMCuvr4B";
                }
            case 1990:
                if(isHappy){
                    return "PLLWfa8Ng-FdBamt3JCTadmbdd9UtLFZ7K";
                }
                else {
                    return "PLu1jpc624xfKGhWItKFNRPu7QylkwS-OR";
                }
            case 2000:
                if(isHappy){
                    return "PLPf_PZG3-WAGq4tgjU6m87Ksndn2Jz2OF";
                }
                else {
                    return "PLIWqGUaiQxN7kL47fzQ87h0OlTaCyr8-o";
                }
            case 2010:
                if(isHappy){
                    return 'RDQMU2NvmEhYGhM';
                }
                else {
                    return "RDAMVM3AtDnEC4zak";
                }
            default:
                return "PL0B2BFACC0574C36F";
        }
    }

    getBackgroundImage() {
        const FLICKR_API_KEY = '04d08e66c3f35b0d3223494098bf28bb';
        var isHappy = this.state.emotion.happiness > this.state.emotion.sadness;
        var flickr = new Flickr(FLICKR_API_KEY);
        var backgroundImage = 'https://live.staticflickr.com/1732/42648827301_8879542e48_k.jpg';
        var text = 'city calm';

        if (isHappy) {
            text = 'nature happy';
        }

        return new Promise((resolve, reject) => {
                flickr.photos.search({
                text: text,
                safe_search: '1',
                license: '1,2,3,4,5,6',
                content_type: '1',
                extras: 'url_l'
            })
                .then((res) => {
                    backgroundImage = res.body['photos']['photo'][Math.floor((Math.random() * 50))]['url_l']; // TODO: err handling on this parse
                    resolve(backgroundImage);
                })
                .catch(function () {
                    console.error('Error searching flickr photos');
                    reject();
                });
        })



    }

    getRecs() {
        var age = this.state.age;
        var emotion = this.state.emotion;
        var opts = this.state.opts;
        //get the playlistId
        var musicYear = this.getMusicYearFromAge(age);
        var isHappy = this.isThisEmotionHappy(emotion);
        opts.playerVars.list = this.getPlaylistFromParams(musicYear, isHappy);
        opts.playerVars.index = Math.floor((Math.random() * 10) + 1)
        // set recs
        this.setState({opts: opts, isHappy: isHappy});
    }


    render() {
        const instPopover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Instructions</Popover.Title>
                <Popover.Content>
                    Use the webcam box below to snap a picture of yourself! Press the <strong>white round circle</strong> to take the picture.
                    If the webcam can't find your face, it will play a random video.
                </Popover.Content>
            </Popover>
        );

         if (this.state.loadSong) {
            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/final-project/">
                            <img
                                alt=""
                                src="/logo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <strong>MusicFace</strong>
                        </Navbar.Brand>
                    </Navbar>
                <div id="app" style={{backgroundImage: `url(${this.state.backgroundImage})`, backgroundSize: '100% 100%', justifyContent: 'center', alignItems: 'center'}}>


                     <br/>
                     <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '93vh'}}>
                        <YouTube
                        any    opts={this.state.opts}
                        />
                     </div>
                </div>
                </div>)
        } else {
            return (
                <div className="App">

                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/final-project/">
                            <img
                                alt=""
                                src="/logo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <strong>MusicFace</strong>
                        </Navbar.Brand>
                        <OverlayTrigger trigger="click" placement="right" overlay={instPopover} className="mr-sm-2">
                            <Button variant="success">Instructions</Button>
                        </OverlayTrigger>
                    </Navbar>

                    {
                        (this.state.loading)
                            ? <LoadingOverlay active={true} spinner = {<ClipLoader sizeUnit={"px"} size={100} color={'#36d7b7'} loading={true}/>}>
                                    <ImagePreview isFullscreen={false} dataUri={this.state.dataUri} /></LoadingOverlay>
                            : <Camera onTakePhotoAnimationDone={this.onTakePhotoAnimationDone}/>
                    }
                </div>
            );
        }
    }
}

App.defaultProps = {
    "emotion": {
        "anger": 0,
        "contempt": 0,
        "disgust": 0.001,
        "fear": 0,
        "happiness": 0.989,
        "neutral": 0.009,
        "sadness": 0,
        "surprise": 0
    }
};
export default App;
