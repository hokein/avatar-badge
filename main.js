var img, ctx;

window.onload = function() {
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
}

function handleImage(e) {
    var reader = new FileReader();
    var canvas = document.getElementById('imageCanvas');
    ctx = canvas.getContext('2d');
    reader.onload = function (event) {
        img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function saveImage() {
    var ua = window.navigator.userAgent;

    if (ua.indexOf("Chrome") > 0) {
        // save image without file type
        var canvas = document.getElementById("imageCanvas");
        document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        // save image as png
        var link = document.createElement('a');
        link.download = "test.png";
        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.click();
    }
    else {
        alert("Please use Chrome");
    }
}

function setNumber() {
    var length = img.width;
    var radius = length * 0.178;
    var centerX = length - radius;
    var centerY = radius;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.beginPath();
    ctx.font = radius * 1.35 + "px Arial";
    ctx.fillStyle = "white";
    var constX;
    var showNum = document.getElementById("numbers").value.toString();
    if (showNum.length == 1) {
        constX = 0.92;
    } else if (showNum.length == 2) {
        constX = 0.83;
    } else if (showNum.length == 3) {
        showNum = "99+";
        ctx.font = radius * 1.1 + "px Arial";
        constX = 0.80;
    }
    ctx.fillText(showNum, centerX * constX, centerY * 1.4);
}
