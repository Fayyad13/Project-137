status = "";
objects = [];
item = "";


function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();

    camera = createCapture(300, 300);
    camera.hide();

}

function draw()
{
    image(camera, 0, 0, 300, 300)
    if (status != "")
    {
        objectDetector.detect(camera, gotResults);
        for (i = 0; i < objects.length; i++)
        {
            if (objects[i].label == item)
            {
                document.getElementById("found_orNot").innerHTML = "Object Found";
                document.getElementById("status").innerHTML = "Status : Object Detected";

                //cameraLiveView.stop();
                objectDetector.detect(gotResults);
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("Object Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("found_orNot").innerHTML = "Object Not Found";
                document.getElementById("status").innerHTML = "Status : Object Not Detected";
            }
            

            

            fill("#00FF00");
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#00FF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    item = document.getElementById('item').value;
    console.log(item);
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

