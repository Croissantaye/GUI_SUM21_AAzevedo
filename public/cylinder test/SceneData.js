var bgImg;
var bdSides;
var bgSpeed;

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
        translate : [0, 0, 20],
        scale : [5, 5, 15],
        color : spokeColor,
        type: "Cylinder"
    },
    spoke2 : {
        model : undefined,
        axis : axis.z,
        startAngle : 90,
        timeScale : 1,
        translate : [0, 0, 20],
        scale : [5, 5, 15],
        color : spokeColor,
        type: "Cylinder"
    },
    spoke3 : {
        model : undefined,
        axis : axis.z,
        startAngle : 180,
        timeScale : 1,
        translate : [0, 0, 20],
        scale : [5, 5, 15],
        color : spokeColor,
        type: "Cylinder"
    },
    spoke4 : {
        model : undefined,
        axis : axis.z,
        startAngle : 270,
        timeScale : 1,
        translate : [0, 0, 20],
        scale : [5, 5, 15],
        color : spokeColor,
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
		scale : [42, 42, 1],
		color : [.8, .8, .5, 1.0],
		type: "Tube"
	}
}