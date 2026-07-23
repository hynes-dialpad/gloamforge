export interface LessonStep {
  id: string;
  minutes: string;
  title: string;
  brief: string;
  actions: string[];
  proof: string;
  stuck: string;
}

export interface Mission {
  id: string;
  number: string;
  title: string;
  time: string;
  focus: string;
  promise: string;
  outcome: string;
  saveAs: string;
  artwork: {
    src: string;
    alt: string;
  };
  steps: LessonStep[];
  stretch: string;
}

export const missions: Mission[] = [
  {
    id: "ready-the-forge",
    number: "I",
    title: "Ready the Forge",
    time: "15 minutes",
    focus: "Navigation and transforms",
    promise: "Turn the default scene into a small relic marker.",
    outcome:
      "You can move through the viewport, place three forms, and save a clean starting file.",
    saveAs: "gatewarden-01-forge.blend",
    artwork: {
      src: "./gatewarden-ready.png",
      alt: "The low-poly Gatewarden beside a relic made from primitive forms in a dark forge.",
    },
    steps: [
      {
        id: "forge-version",
        minutes: "2 min",
        title: "Name your version",
        brief:
          "This field guide targets Blender 4.5 LTS so the menus stay consistent.",
        actions: [
          "In Blender, open Help, then Splash Screen.",
          "Read the version number in the splash screen.",
          "Enter it in the version field at the top of this page.",
        ],
        proof: "The version is written down before the build begins.",
        stuck:
          "If your version is different, keep going. The actions in these first missions are stable, and the site will flag likely menu differences.",
      },
      {
        id: "forge-navigation",
        minutes: "4 min",
        title: "Circle the default cube",
        brief:
          "Treat the viewport like a camera operator walking around a prop.",
        actions: [
          "Orbit: drag two fingers on the trackpad.",
          "Pan: hold Shift while dragging two fingers.",
          "Zoom: hold Control or Command while dragging two fingers.",
          "Select the cube, then use View > Frame Selected if you lose it.",
        ],
        proof: "You can see the cube from above, below, and both sides.",
        stuck:
          "Do not fight the view for more than a minute. Select the cube and use View > Frame Selected to reset your position.",
      },
      {
        id: "forge-relic",
        minutes: "6 min",
        title: "Stack a relic marker",
        brief:
          "Make a readable silhouette from only a cube, a cylinder, and a cone.",
        actions: [
          "Scale the default cube into a wide stone base with S, then Z.",
          "Add a cylinder with Shift+A > Mesh > Cylinder and move it upward with G, then Z.",
          "Add a cone above the cylinder and make it narrow and tall.",
          "Use G to move, R to rotate, and S to scale. Add X, Y, or Z to lock an axis.",
        ],
        proof: "The three forms read as one object from a distance.",
        stuck:
          "If a shape vanishes, undo once with Command+Z. If it is merely off-screen, select it in the Outliner and frame it from the View menu.",
      },
      {
        id: "forge-save",
        minutes: "3 min",
        title: "Bank the ember",
        brief: "End every short session with a file you can trust.",
        actions: [
          "Choose File > Save As.",
          "Use the filename gatewarden-01-forge.blend.",
          "Take a macOS screenshot of the viewport with Shift+Command+4.",
        ],
        proof: "You have a .blend file and one screenshot outside Blender.",
        stuck:
          "Saving is the finish line. Skip polish if the 15-minute limit is up.",
      },
    ],
    stretch:
      "Give the cone a slight tilt. Decide whether the relic now feels ancient, damaged, or dangerous.",
  },
  {
    id: "shape-the-warden",
    number: "II",
    title: "Shape the Warden",
    time: "25 minutes",
    focus: "Character silhouette",
    promise: "Block out a fantasy sentinel without sculpting a single detail.",
    outcome:
      "You can use primitive forms, proportion, and asymmetry to suggest a character with a story.",
    saveAs: "gatewarden-02-blockout.blend",
    artwork: {
      src: "./gatewarden-shape.png",
      alt: "The Gatewarden as an unfinished geometric blockout beside primitive shape studies.",
    },
    steps: [
      {
        id: "warden-file",
        minutes: "3 min",
        title: "Make a safe copy",
        brief: "Build forward without risking the previous mission.",
        actions: [
          "Open gatewarden-01-forge.blend.",
          "Immediately choose File > Save As.",
          "Save the copy as gatewarden-02-blockout.blend.",
          "Select the relic pieces and move them aside. They will become set dressing later.",
        ],
        proof: "The title bar shows the new filename.",
        stuck:
          "If you saved over the old file, keep working. The screenshot from Mission I still records that milestone.",
      },
      {
        id: "warden-mass",
        minutes: "7 min",
        title: "Find the big masses",
        brief:
          "Characters read from large shapes first: torso, head, shoulders, then details.",
        actions: [
          "Add a cube for the torso and scale it taller than it is deep.",
          "Add a UV sphere for the head and scale it slightly narrower.",
          "Add a short cylinder for the neck only if the head feels disconnected.",
          "Orbit often. Fix proportions from at least three angles.",
        ],
        proof: "The figure reads as a bust even with no armor or face.",
        stuck:
          "If the character feels wrong, change only one ratio: head size, shoulder width, or torso height. Do not add detail to hide a proportion problem.",
      },
      {
        id: "warden-armor",
        minutes: "8 min",
        title: "Forge the silhouette",
        brief:
          "A strong outer contour will survive distance, darkness, and a small laptop screen.",
        actions: [
          "Add one flattened cube as a shoulder plate.",
          "Duplicate it with Shift+D, then move the copy to the other shoulder.",
          "Add a cone or squashed sphere above the head as a helmet crest.",
          "Rotate one shoulder plate a little. Perfect symmetry is less believable.",
        ],
        proof: "The shoulders and helmet create a recognizable outer contour.",
        stuck:
          "Hide the grid with the Overlays button for ten seconds. If the outline is unclear, make one armor form larger instead of adding more pieces.",
      },
      {
        id: "warden-story",
        minutes: "7 min",
        title: "Choose the story beat",
        brief:
          "A production artist makes choices for the story, not just the model.",
        actions: [
          "Choose one word: defiant, weary, watchful, or corrupted.",
          "Tilt the head and shoulders to support that word.",
          "Move the relic from Mission I near the character as a story prop.",
          "Save, then take a screenshot from your strongest angle.",
        ],
        proof: "Another person can guess the chosen mood from the pose.",
        stuck:
          "Try the pose yourself in a mirror. Notice whether your chin, shoulders, and spine rise or fall, then copy only those large angles.",
      },
    ],
    stretch:
      "Make a second screenshot with the opposite mood. Change only the head tilt, shoulders, and camera angle.",
  },
  {
    id: "light-the-oath",
    number: "III",
    title: "Light the Oath",
    time: "30 minutes",
    focus: "Camera, light, and first render",
    promise: "Turn the rough blockout into a cinematic character image.",
    outcome:
      "You can frame a shot, separate a silhouette with light, and finish a fast Eevee render on a MacBook.",
    saveAs: "gatewarden-03-cinematic.blend",
    artwork: {
      src: "./gatewarden-oath.png",
      alt: "The Gatewarden staged in a cinematic gate chamber with warm key light and a cool rim.",
    },
    steps: [
      {
        id: "oath-setup",
        minutes: "5 min",
        title: "Choose the fast path",
        brief: "Fast feedback matters more than final realism right now.",
        actions: [
          "Open gatewarden-02-blockout.blend and save a copy as gatewarden-03-cinematic.blend.",
          "Open Render Properties and choose Eevee as the render engine.",
          "In Output Properties, set a square image at 800 by 800 pixels.",
          "Set the output percentage to 100 percent.",
        ],
        proof: "The file has a new name and the render engine is Eevee.",
        stuck:
          "If Blender labels Eevee differently in your version, choose the Eevee option that appears in Render Properties. Do not switch to Cycles for this mission.",
      },
      {
        id: "oath-camera",
        minutes: "7 min",
        title: "Frame the sentinel",
        brief:
          "A camera angle can make the same model feel powerful, vulnerable, or mysterious.",
        actions: [
          "Orbit to a three-quarter view where the head and both shoulders are visible.",
          "Move slightly below eye level for a more imposing character.",
          "Select the camera in the Outliner.",
          "Use View > Align View > Align Active Camera to View.",
          "Enter camera view from View > Cameras > Active Camera and check the frame.",
        ],
        proof:
          "The helmet stays inside the frame and the shoulders do not touch both edges.",
        stuck:
          "If the camera view is empty, leave camera view, select the character, frame it, rebuild the angle, and align the camera again.",
      },
      {
        id: "oath-light",
        minutes: "10 min",
        title: "Carve with two lights",
        brief:
          "One light describes the face. The other pulls the silhouette out of darkness.",
        actions: [
          "Add an Area light in front of and above the character as the key light.",
          "Rotate it toward the face and increase its power until the forms are readable.",
          "Add a second Area light behind the character on the opposite side.",
          "Make the rear light narrower and brighter so it draws a rim along one shoulder and the helmet.",
          "Switch the viewport to Rendered shading to judge the balance.",
        ],
        proof:
          "The face has shape and at least one edge separates from the background.",
        stuck:
          "If everything is gray, move the key light closer. If everything is flat, move it farther to one side. Change position before changing power.",
      },
      {
        id: "oath-render",
        minutes: "8 min",
        title: "Deliver the first frame",
        brief: "A finished rough image teaches more than an unfinished perfect model.",
        actions: [
          "Press F12 or choose Render > Render Image.",
          "Wait for the square frame to finish.",
          "In the render window, choose Image > Save As.",
          "Save the image as gatewarden-first-frame.png.",
          "Write one sentence: what would happen in the next shot?",
        ],
        proof:
          "A PNG exists outside Blender and the next story beat is written down.",
        stuck:
          "If the result is dark, do not remodel. Return to the scene, move the key light closer, and render once more.",
      },
    ],
    stretch:
      "Render a second frame from a lower angle. Keep the model and lights unchanged so you can see what the camera alone contributes.",
  },
];

export const allStepIds = missions.flatMap((mission) =>
  mission.steps.map((step) => step.id),
);
