document.querySelector("#download-btn").addEventListener("click", async function () {
    let video = document.getElementById("video-link").value;

    if (video.length == 0) return;

    try {
        document.querySelector(".loader").classList.add("show");

        let res = await fetch("/videoInfo?videoURL=" + video);
        let data = await res.json();

        document.querySelector(".loader").classList.add("show");

        let audios = data.formats.filter((obj) => obj.mimeType.includes("audio/webm"));
        let filename = data.videoDetails.title.replace(/\s{1,}/, "-") + ".MP3"
        let itag = audios[0].itag;

        notify(`"${filename}" will be downloaded automatically.`);

        document.getElementById("download-frame").src = `/download?videoURL=${video}&itag=${itag}&filename=${filename}`;
    } catch (error) {
        document.querySelector(".loader").classList.remove("show");
        alert("Something went wrong. Please try again.");
        console.error(error)
    }
})

function notify(message) {
    let notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.classList.remove("show");

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}