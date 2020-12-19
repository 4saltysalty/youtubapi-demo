const youtubeConfig = {
    apiKey: "AIzaSyDEA7zZ9AYlB6NKG7DMycAWoThNn_pMEwo",
    apiUrl: "https://www.googleapis.com/youtube/v3/",
    watchUrl: "https://www.youtube.com/watch"
};

export const searchListVideo = async (params) => {
    const apiUrl = new URL(youtubeConfig.apiUrl + "videos");
    const searchParams = new URLSearchParams(params);
    searchParams.append("key", youtubeConfig.apiKey);
    apiUrl.search = searchParams.toString();
    return await fetch(apiUrl)
                    .then(response => {
                        return response.json();
                    });
}

export const watchYoutubeUrl = (videoId) => {
    const watchUrl = new URL(youtubeConfig.watchUrl);
    const searchParams = new URLSearchParams({ "v": videoId });
    watchUrl.search = searchParams.toString();

    return watchUrl.toString();
}

