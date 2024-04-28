let accessToken = "";
const clientID = "0b7cacd71fa94f05b6f2dd1bae2e079a";
const redirectURI = "https://www.JacobsJammmingProject.surge.sh";
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const expirationTime = window.location.href.match(/expires_in=([^&]*)/);

        if (urlAccessToken && expirationTime) {
            accessToken = urlAccessToken[1];
            const expiresIn = Number(expirationTime[1]);
            window.setTimeout(() => (accessToken = " "), expiresIn * 1000);
            //clears Access token from URL for security reasons
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;

    },
    async search (userSearchTerm) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${userSearchTerm}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        const jsonResponse = await response.json();
        if (!jsonResponse) {
            console.error("Response Error");
        }
        return jsonResponse.tracks.items?.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },
    async savePlaylist(playlistName, trackURIarr) {
        if ((!playlistName) && (!trackURIarr)) {
            return;
        }
        let access_token = this.getAccessToken();
        const header = { Authorization: `Bearer ${access_token}` };
        let userID = "";
        const response = await fetch(`https://api.spotify.com/v1/me`, {
            method: "GET",
            headers: header,
        });
        const jsonResponse = await response.json();
        if (!jsonResponse) {
            console.error("User name response error");
        }
        userID = jsonResponse.id;
        const playlist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: header,
            method: "POST",
            body: JSON.stringify( {name: playlistName}),
        });
        const playlistResponse = await playlist.json();
        const playlistID = playlistResponse.id;

        const addToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: header,
            method: "POST",
            body: JSON.stringify( { uris: trackURIarr})
        });
        }

        
    }


export { Spotify };