import React from 'react';

class Recommendations extends React.Component {
    render() {
        let url = 'https://api.spotify.com/v1/recommendations';
        url += '?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50';

        let http = new XMLHttpRequest();
        http.open('GET', url);
        http.setRequestHeader('Authorization', 'Bearer BQCORkhTuDC5KmG5jJVLbg6vsgAbZMIcm-ufGbaJ_GBR6H-R5jvOxw29AcilNvc0B78z3olKqEF2OF8T_D7LRP251ff2xjPwKwehJtJwtKzSWaAa4-mIKpPlxdBTuGj99t80wmv9gQfIgjW6UsoDk23GXkc-p-U');

        /* replace with synchronous version for testing
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
            } else {
                document.getElementById('info').innerText = http.responseType + http.responseText;
            }
        }
         */

        http.send();

        let response = null;
        setTimeout(() => response = http.responseType + http.responseText, 3000);

        // won't return anything yet but requests are going through
        return (
            <div className="Recommendations">
                <p>
                    Class recommendations test
                </p>
                <p id="Recommendations-Body">
                    {response}
                </p>
            </div>
        );
    }
}

export default Recommendations;