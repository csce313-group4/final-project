import React from 'react';

class Recommendations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: null
        };
    }

    componentDidMount() {
        let url = 'https://api.spotify.com/v1/recommendations';
        // FIXME: replace these hard coded api parameters
        url += '?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50';

        let http = new XMLHttpRequest();
        http.open('GET', url);
        http.setRequestHeader('Authorization', 'Bearer BQCORkhTuDC5KmG5jJVLbg6vsgAbZMIcm-ufGbaJ_GBR6H-R5jvOxw29AcilNvc0B78z3olKqEF2OF8T_D7LRP251ff2xjPwKwehJtJwtKzSWaAa4-mIKpPlxdBTuGj99t80wmv9gQfIgjW6UsoDk23GXkc-p-U');

        let thisComponent = this;
        http.onreadystatechange = function () {
            thisComponent.setState({
                response: http.responseText
            });
        };

        http.send();
    }

    render() {
        let recommendations = "Recommendations loading...";
        if (this.state.response != null) {
            // FIXME: later parse response to provide only useful info to user
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