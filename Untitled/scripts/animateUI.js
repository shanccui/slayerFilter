const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');

// Find the face tracker and game object
Promise.all([
    Scene.root.findFirst('game'),
    Scene.root.findFirst('faceTracker')
]).then(function (results) {
    const game = results[0];
    const faceTracker = results[1];

    if (!game) {
        Diagnostics.log('Game object not found.');
        return;
    }

    if (!faceTracker) {
        Diagnostics.log('Face Tracker not found.');
        return;
    }

    // Log successful retrieval
    Diagnostics.log('Game and Face Tracker found.');

    // Access the face transform directly
    const face = FaceTracking.face(0); // Access the first tracked face

    if (!face) {
        Diagnostics.log('Face not found.');
        return;
    }

    const faceTransform = face.cameraTransform;

    if (!faceTransform) {
        Diagnostics.log('Face Transform not found.');
        return;
    }

    Diagnostics.log('Face Transform found.');

    // Continue with your binding logic
    const facePositionX = faceTransform.position.x;
    const facePositionY = faceTransform.position.y;

    // Bind face tracker’s position to game object
    const gameTransform = game.transform;
    gameTransform.x = facePositionX;
    gameTransform.y = facePositionY;

    // Log the initial values to confirm they are correct
    facePositionX.monitor().subscribe(function (event) {
        Diagnostics.log('Face Tracker X: ' + event.newValue);
    });

    facePositionY.monitor().subscribe(function (event) {
        Diagnostics.log('Face Tracker Y: ' + event.newValue);
    });

}).catch(function (error) {
    Diagnostics.log('Error: ' + error.message);
});
