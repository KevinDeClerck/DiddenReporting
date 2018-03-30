cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-firebase-realtime-database/www/firebase-browser.js",
        "id": "cordova-plugin-firebase-realtime-database.FirebaseDatabasePlugin",
        "pluginId": "cordova-plugin-firebase-realtime-database",
        "clobbers": [
            "FirebaseDatabasePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/StatusBarProxy.js",
        "id": "cordova-plugin-statusbar.StatusBarProxy",
        "pluginId": "cordova-plugin-statusbar",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-firebase-realtime-database": "0.0.2",
    "cordova-plugin-geolocation": "4.0.1",
    "cordova-plugin-splashscreen": "5.0.2-dev",
    "cordova-plugin-statusbar": "2.4.0",
    "cordova-plugin-whitelist": "1.3.3"
}
// BOTTOM OF METADATA
});