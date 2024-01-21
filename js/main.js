// const $ = require("jquery");
var selected_preset = undefined;

var path, slash;
path = location.href;

if (getOS() == "MAC") {
    slash = "/";
    path = path.substring(0, path.length - 11);
}
if (getOS() == "WIN") {
    slash = "/";
    path = path.substring(8, path.length - 11);
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the execute element
    var executeElement = document.getElementById("execute");

    // Add click event listener
    executeElement.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the selected preset
        var selectedPreset = document.querySelector(".selected").id;

        // Create CSInterface instance
        var csInterface = new CSInterface();

        // Call evalScript
        csInterface.evalScript(
            'createOneFramer("' + selectedPreset + '")',
            function (res) {
                // Do nothing for now (returns from jsx)
            }
        );
    });
});

// Fetch user os
function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        mac_platforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
        win_platforms = ["Win32", "Win64", "Windows", "WinCE"],
        os = null;

    if (mac_platforms.indexOf(platform) != -1) {
        os = "MAC";
    } else if (win_platforms.indexOf(platform) != -1) {
        os = "WIN";
    }

    return os;
}
