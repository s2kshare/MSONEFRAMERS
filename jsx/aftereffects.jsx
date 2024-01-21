function createOneFramer(index) {
    app.beginUndoGroup("Creating One Frame");
    // Get current composition
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var width = comp.width;
        var height = comp.height;

        // Creating adjustment layer. Parameters >> RGB, name,
        var adjustment_layer = comp.layers.addSolid(
            [0, 0, 0],
            "1F Layer",
            width,
            height,
            1,
            0.01
        );
        // Set adjustment layer to true
        adjustment_layer.adjustmentLayer = true;
        adjustment_layer.startTime = comp.time;

        switch (index) {
            case "2":
                mosaicPreset(adjustment_layer);
                break;
            case "3":
                horizontalBlurPreset(adjustment_layer);
                break;
            case "4":
                scanlinePreset(adjustment_layer);
                break;
            case "5":
                ledPreset(adjustment_layer);
                break;
            case "6":
                gammaBlurPreset(adjustment_layer);
                break;
            case "7":
                minimaxHorizontalOffsetPreset(adjustment_layer, width, height);
                break;
            default:
                invertPreset(adjustment_layer);
                break;
        }
    } else {
        alert("Please select comp layer");
    }
}

// 1
function invertPreset(layer) {
    var invert = layer.Effects.addProperty("ADBE Invert");
    var tint = layer.Effects.addProperty("ADBE Tint");
}

// 2
function scanlinePreset(layer) {
    try {
        var scanlines = layer.Effects.addProperty("S_ScanLines");
        scanlines.property("Lines Frequency").setValue(139.0);
    } catch (err) {
        alert("Error: " + err);
    }
}

// 3
function horizontalBlurPreset(layer) {
    var horizontalBlur = layer.Effects.addProperty("ADBE Motion Blur");
    horizontalBlur.property("Direction").setValue(90);
    horizontalBlur.property("Blur Length").setValue(80);
}

// 4
function gammaBlurPreset(layer) {
    try {
        var gammaBlur = layer.Effects.addProperty("BCC Fast Lens Blur");
        gammaBlur.property("Scale Y").setValue(1.0);
        gammaBlur.property("Gamma").setValue(405.0);
    } catch (err) {
        alert("Error: " + err);
    }
}
// 5
function ledPreset(layer) {
    try {
        var led = layer.Effects.addProperty("BCC LED");
        led.property("LED Size X").setValue(2.8);
    } catch (err) {
        alert("Error: " + err);
    }
}
// 6
function mosaicPreset(layer) {
    var mosaic = layer.Effects.addProperty("ADBE Mosaic");
    mosaic.property("Horizontal Blocks").setValue(150);
    mosaic.property("Vertical Blocks").setValue(150);
    mosaic.property("Sharp Colors").setValue(true);
}
// 7
function minimaxHorizontalOffsetPreset(layer, width, height) {
    var motiontile = layer.Effects.addProperty("ADBE Tile");
    motiontile.property("Output Width").setValue(200);
    motiontile.property("Output Height").setValue(200);
    motiontile.property("Mirror Edges").setValue(true);

    var offset = layer.Effects.addProperty("ADBE Offset");
    offset.property("Shift Center To").setValue([width / 2 + 300, height / 2]);

    var directionalBlur = layer.Effects.addProperty("BCC Directional Blur");

    var minimax = layer.Effects.addProperty("ADBE Minimax");
    minimax.property("Radius").setValue(35);
    minimax.property("Direction").setValue(2);
}

//createOneFramer();
