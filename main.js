Song1 = "";
Song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

LeftHand_Song_Status = "";
RightHand_Song_Status = "";

function preload() {
    Song1 = loadSound("music.mp3");
    Song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 640, 480);
    fill('red');
    stroke('red');
    Song1.isPlaying();
    Song2.isPlaying();
    if (scoreLeftWrist > 0.2) { 
        circle(leftWristX, leftWristY, 20);
        Song2.stop();

        if (Song1 == false) {
            Song1.play();
            document.getElementById("song1").innerHTML = "Mystery Song 1";
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        Song1.stop();

        if (Song2 == false) {
            Song2.play();
            document.getElementById("song2").innerHTML = "Mystery Song 2";
        }
    }
}

function modelLoaded() {
    console.log("Model Has Successfully Loaded!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("X position of Left Wrist = " + leftWristX + "Y-position of Left Wrist = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("X position of Right Wrist = " + rightWristX + "Y-position of Right Wrist = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score = " + scoreRightWrist);
    }
}