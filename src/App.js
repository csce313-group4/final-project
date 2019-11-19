import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import YouTube from 'react-youtube';
import 'react-youtube-playlist/dist/styles.scss'
import ClipLoader from 'react-spinners/ClipLoader';
import LoadingOverlay from 'react-loading-overlay'
import ImagePreview from './ImagePreview';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
                listType: 'playlist',
                list: 'PLNDhBcjuPp0-UCSML4DxFqqc5WN4aGcW1',
                playsinline: 1,
                modestbranding: 1,
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
    }

    onTakePhotoAnimationDone(dataUri) {
        this.setState({dataUri: dataUri, loading: true});

        Promise.all([this.getAgeAndEmotion()])
            .then( ([[age, emotion]])  => {
                this.setState({age: age, emotion: emotion});
                this.getRecs();
                this.setState({loading: false, loadSong: true})
            });

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
                    return "PLeZgwVkN7bbfVLcqnz9l5RjASqUkBtpBe";
                }
                else {
                    return "PL5D7fjEEs5yflZzSZAhxfgQmN6C_6UJ1W";
                }
            default:
                return "PL0B2BFACC0574C36F";
        }
    }

    getRecs() {
        var age = this.state.age;
        var emotion = this.state.emotion;
        var opts = this.state.opts;
        //get the playlistId
        var musicYear = this.getMusicYearFromAge(age);
        var isHappy = this.isThisEmotionHappy(emotion);
        opts.playerVars.list = this.getPlaylistFromParams(musicYear, isHappy);

        // set recs
        this.setState({opts: opts, isHappy: isHappy});
    }


    render() {
         if (this.state.loadSong) {
            return (
                <div style={{justifyContent: 'center', alignItems: 'center', height:'100%', width: '100%'}}>
                    <h3><strong>Your personalized music selection</strong></h3><br/>
                    <h2>Age: {this.state.age}</h2>
                    <h2>Happy: {this.state.isHappy.toString()}</h2>
                    <YouTube
                        opts={this.state.opts}
                    />
                </div>)
        } else {
            return (
                <div className="App">
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
