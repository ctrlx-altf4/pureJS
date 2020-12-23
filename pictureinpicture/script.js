const videoElement = document.getElementById("video");
const button = document.getElementById("button");

//prompt to Select the media stream and pass the video element , to play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", async () => {
  //Disable button
  button.disabled = true;

  await videoElement.requestPictureInPicture();
  //Reset Button
  button.disabled = false;
});

//on load
selectMediaStream();
