import React from 'react';

class Recommendations extends React.Component {
    constructor(props) {
        // use constructor to setup this.state; when state changes component re-renders
        super(props);

        this.state = {
            token: null,
            response: null
        };

        // bind `this` keyword to the component so it can be used in methods
        this.getRecommendations = this.getRecommendations.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        // use component lifecycle hook to run async http requests
        this.getToken();
        this.getRecommendations();
    }

    getToken() {
        // request an oauth token (which is used to make song recommendations)
        // FORMAT: curl -X "POST" -H "Authorization: Basic <base64 encoded client_id:client secret>" -d grant_type=client_credentials https://accounts.spotify.com/api/token
        const CLIENT_ID = '55a975bb69c44569a5775c348367fd3a';
        const CLIENT_SECRET = '2b04fecfc7a94bc0897a8f892be1db38';

        let url = 'https://accounts.spotify.com/api/token';

        let http = new XMLHttpRequest();
        http.open('POST', url, true);
        http.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        let thisComponent = this;
        const DONE = 4;
        http.onreadystatechange = function () {
            if (http.readyState == DONE && http.status == 200) {
                thisComponent.setState({
                    token: JSON.parse(http.responseText)['access_token']
                });
            }
            // FIXME: add error handling for other http cases and JSON.parse failure or access_token key error
        }

        let params = "grant_type=client_credentials";

        http.send(params);
    }

    // TODO: need another way to call getRecommendations (some event the other components can trigger?) after mounting
    //  so other components can use it (e.g. when user submits a photo and the other API components pass in data) UNLESS
    //  all data will come in through props? (can parent update props and this component re-renders automatically?)
    getRecommendations() {
        // request a song recommendation
        let url = 'https://api.spotify.com/v1/recommendations';
        // TODO: replace these hard coded api parameters (using props?)
        let params = '?' + ['market=US', 'seed_artists=4NHQUGzhtTLFvgF5SZesLK', 'seed_tracks=0c6xIDDpzE81m2q797ordA', 'min_energy=0.4', 'min_popularity=50'].join('&');
        url += params;

        let http = new XMLHttpRequest();
        http.open('GET', url);
        // FIXME: could this run before getting a token finishes? should I call getToken here if needed and wait on it to finish somehow?
        http.setRequestHeader('Authorization', 'Bearer ' + this.state.token);

        let thisComponent = this;
        const DONE = 4;
        http.onreadystatechange = function () {
            if (http.readyState == DONE && http.status == 200) {
                thisComponent.setState({
                    response: http.responseText
                });
            }
            // FIXME: add error handling for other http cases (actually it would be okay to leave response null if we don't get multiple
            //  recommendations from same component... if we do, then it should probably check new recommendation is different?)
        };

        http.send();
    }

    render() {
        // based on state of http requests, either display a loading message or the http response
        let recommendations = "Recommendations loading...";
        if (this.state.response != null) {
            // TODO: later parse response to provide only useful info to user
            recommendations = this.state.response;
        }

        return (
            <div className="Recommendations">
                <p id="Recommendations-Body">
                    {recommendations}
                </p>
            </div>
        );
    }
}

export default Recommendations;