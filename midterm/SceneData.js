var bgImg = "BG.jpg";
// var bgImg = "https://i.ibb.co/9wV7p8N/trees.jpg";

// const res = new Response();
// res.headers.set("Access-Control-Allow-Origin", "*");
// res.headers.set("Vary", bgImg);
// console.log(res.headers.get("Access-Control-Allow-Origin"));
// console.log(res.headers.get("Vary"));


var numSides = 6;
var bgSpeed = -.5;
var bgDist = 50;
var bgScale = [30, -30, 1];
var bgTranslate = [0, 15, bgDist];

var spokeColor = [120/256, 82/256, 52/256, 1];

var axis = {
    x : [1, 0, 0],
    y : [0, 1, 0],
    z : [0, 0, 1]
};

var Cylinders = {
    spoke1 : {
        model : 0,
        axis : axis.z,
        startAngle : 0,
        timeScale : 1,
        translate : [0, 0, 3.5],
        scale : [1, 1, 3.5],
        color : spokeColor,
        type: "Cylinder"
    },
    spoke2 : {
        model : undefined,
        axis : axis.z,
        startAngle : 90,
        timeScale : 1,
        translate : [0, 0, 3.5],
        scale : [1, 1, 3.5],
        color : spokeColor,
        type: "Cylinder"
    },
    spoke3 : {
        model : undefined,
        axis : axis.z,
        startAngle : 180,
        timeScale : 1,
        translate : [0, 0, 3.5],
        scale : [1, 1, 3.5],
        color : spokeColor,
        type: "Cylinder"
    },
    spoke4 : {
        model : undefined,
        axis : axis.z,
        startAngle : 270,
        timeScale : 1,
        translate : [0, 0, 3.5],
        scale : [1, 1, 3.5],
        color : spokeColor,
        type: "Cylinder"
    },
    hub : {
        model : undefined,
        axis : axis.z,
        startAngle : 0,
        timeScale : 1,
        translate : [0, 0, 0],
        scale : [2, 2, 2],
        color : [.1, .1, .1, 1.0],
        type: "Tube"
    },
    road : {
        model : undefined,
        axis : axis.x,
        startAngle : 0,
        timeScale : 0,
        translate : [0, 0, 10],
        scale : [50, 50, 1],
        color : [.1, .1, .1, 1.0],
        type: "Cylinder"
    },
    grass : {
        model : undefined,
        axis : axis.x,
        startAngle : 0,
        timeScale : 0,
        translate : [0, 35, 9],
        scale : [30, 30, 1],
        color : [27/256, 128/256, 29/256, 1.0],
        type: "Cylinder"
    }
};

var Tubes = {
    Rim : {
		model : undefined,
		axis : axis.z,
		startAngle : 0,
		timeScale : 1,
		translate : [0, 0, 0],
		scale : [8, 8, 1],
		color : [.5, .5, .5, 1.0],
		type: "Tube"
	}
}

var Planes = {
    Plane1 : {
        model: undefined,
        axis: axis.y,
        startAngle: 0 * (360 / numSides),
        timeScale: bgSpeed,
        translate: bgTranslate,
        scale: bgScale,
        color: [1, 1, 1, 1],
        source: bgImg,
        type: "Plane"
    },
    Plane2 : {
        model: undefined,
        axis: axis.y,
        startAngle: 1 * (360 / numSides),
        timeScale: bgSpeed,
        translate: bgTranslate,
        scale: bgScale,
        color: [1, 1, 1, 1],
        source: bgImg,
        type: "Plane"
    },
    Plane3 : {
        model: undefined,
        axis: axis.y,
        startAngle: 2 * (360 / numSides),
        timeScale: bgSpeed,
        translate: bgTranslate,
        scale: bgScale,
        color: [1, 1, 1, 1],
        source: bgImg,
        type: "Plane"
    },
    Plane4 : {
        model: undefined,
        axis: axis.y,
        startAngle: 3 * (360 / numSides),
        timeScale: bgSpeed,
        translate: bgTranslate,
        scale: bgScale,
        color: [1, 1, 1, 1],
        source: bgImg,
        type: "Plane"
    },
    Plane5 : {
        model: undefined,
        axis: axis.y,
        startAngle: 4 * (360 / numSides),
        timeScale: bgSpeed,
        translate: bgTranslate,
        scale: bgScale,
        color: [1, 1, 1, 1],
        source: bgImg,
        type: "Plane"
    },
    Plane6 : {
        model: undefined,
        axis: axis.y,
        startAngle: 5 * (360 / numSides),
        timeScale: bgSpeed,
        translate: bgTranslate,
        scale: bgScale,
        color: [1, 1, 1, 1],
        source: bgImg,
        type: "Plane"
    }
}