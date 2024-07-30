const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');

// Initialize variables for frame selections
let frame0Selected = 0;
let frame1Selected = 0;
let frame2Selected = 0;
let frame3Selected = 0;
let frame4Selected = 0;

// Export the variables so they are accessible in the Patch Editor
Patches.inputs.setScalar('frame0Selected', frame0Selected);
Patches.inputs.setScalar('frame1Selected', frame1Selected);
Patches.inputs.setScalar('frame2Selected', frame2Selected);
Patches.inputs.setScalar('frame3Selected', frame3Selected);
Patches.inputs.setScalar('frame4Selected', frame4Selected);

// Access the Patch Editor variables for head tilts and frame selection conditions
Promise.all([
    Patches.outputs.getBoolean('leftLeanState'),
    Patches.outputs.getBoolean('rightLeanState'),
    Patches.outputs.getScalar('counterValue') // Get the current frame from the counter
]).then(results => {
    const leftLean = results[0];
    const rightLean = results[1];
    const counterValue = results[2];

    // Monitor left lean state
    leftLean.monitor({fireOnInitialValue: true}).subscribe((event) => {
        if (event.newValue) {
            if (counterValue.pinLastValue() === 0 && frame0Selected === 0) {
                frame0Selected = 1;
                Diagnostics.log('Frame 0 selected: Left');
                Patches.inputs.setScalar('frame0Selected', 1);
            } else if (counterValue.pinLastValue() === 1 && frame1Selected === 0) {
                frame1Selected = 1;
                Diagnostics.log('Frame 1 selected: Left');
                Patches.inputs.setScalar('frame1Selected', 1);
            } else if (counterValue.pinLastValue() === 2 && frame2Selected === 0) {
                frame2Selected = 1;
                Diagnostics.log('Frame 2 selected: Left');
                Patches.inputs.setScalar('frame2Selected', 1);
            } else if (counterValue.pinLastValue() === 3 && frame3Selected === 0) {
                frame3Selected = 1;
                Diagnostics.log('Frame 3 selected: Left');
                Patches.inputs.setScalar('frame3Selected', 1);
            } else if (counterValue.pinLastValue() === 4 && frame4Selected === 0) {
                frame4Selected = 1;
                Diagnostics.log('Frame 4 selected: Left');
                Patches.inputs.setScalar('frame4Selected', 1);
            }
        }
    });

    // Monitor right lean state
    rightLean.monitor({fireOnInitialValue: true}).subscribe((event) => {
        if (event.newValue) {
            if (counterValue.pinLastValue() === 0 && frame0Selected === 0) {
                frame0Selected = 2;
                Diagnostics.log('Frame 0 selected: Right');
                Patches.inputs.setScalar('frame0Selected', 2);
            } else if (counterValue.pinLastValue() === 1 && frame1Selected === 0) {
                frame1Selected = 2;
                Diagnostics.log('Frame 1 selected: Right');
                Patches.inputs.setScalar('frame1Selected', 2);
            } else if (counterValue.pinLastValue() === 2 && frame2Selected === 0) {
                frame2Selected = 2;
                Diagnostics.log('Frame 2 selected: Right');
                Patches.inputs.setScalar('frame2Selected', 2);
            } else if (counterValue.pinLastValue() === 3 && frame3Selected === 0) {
                frame3Selected = 2;
                Diagnostics.log('Frame 3 selected: Right');
                Patches.inputs.setScalar('frame3Selected', 2);
            } else if (counterValue.pinLastValue() === 4 && frame4Selected === 0) {
                frame4Selected = 2;
                Diagnostics.log('Frame 4 selected: Right');
                Patches.inputs.setScalar('frame4Selected', 2);
            }
        }
    });

}).catch(err => {
    Diagnostics.log('Error finding lean states: ' + err);
});
