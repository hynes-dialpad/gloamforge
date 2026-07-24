export interface LessonStep {
  id: string;
  minutes: string;
  title: string;
  brief: string;
  example?: {
    src: string;
    alt: string;
  };
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
        example: {
          src: "./phase-1-1-version.png",
          alt: "A simplified Blender splash screen with the version area highlighted.",
        },
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
        example: {
          src: "./phase-1-2-orbit.png",
          alt: "A selected default cube viewed from an elevated angle with a subtle orbit path around it.",
        },
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
        example: {
          src: "./phase-1-3-relic.png",
          alt: "A flattened cube, short cylinder, and tall cone stacked into a simple relic marker.",
        },
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
        example: {
          src: "./phase-1-4-checkpoint.png",
          alt: "The completed three-part relic centered in a clean viewport screenshot.",
        },
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
    time: "25-30 minutes",
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
        minutes: "2 min",
        title: "Make a safe copy",
        brief: "Build forward without risking the previous mission.",
        example: {
          src: "./phase-2-1-safe-copy.png",
          alt: "Two Blender project files showing the Mission I file copied into a new Mission II working file.",
        },
        actions: [
          "Open gatewarden-01-forge.blend.",
          "Immediately choose File > Save As.",
          "Save the copy as gatewarden-02-blockout.blend.",
        ],
        proof: "The title bar shows the new filename.",
        stuck:
          "If you saved over the old file, keep working. The screenshot from Mission I still records that milestone.",
      },
      {
        id: "warden-stage",
        minutes: "3 min",
        title: "Clear the stage",
        brief:
          "Keep the relic, but make a clear space for the character blockout.",
        example: {
          src: "./phase-2-2-clear-stage.png",
          alt: "The relic marker moved to the side, leaving an empty center area for the character.",
        },
        actions: [
          "Select the three relic pieces in the viewport or Outliner.",
          "Move them together to one side with G, then X.",
          "Orbit once and confirm the center of the grid is clear.",
        ],
        proof: "The relic remains visible, but the center is empty.",
        stuck:
          "If only one piece moves, undo once and select the three relic pieces together in the Outliner.",
      },
      {
        id: "warden-mass",
        minutes: "5 min",
        title: "Build the big masses",
        brief:
          "Start with torso and head. Details will not rescue unclear proportions.",
        example: {
          src: "./phase-2-3-big-masses.png",
          alt: "A simple bust made from a torso cube, head sphere, and short neck cylinder.",
        },
        actions: [
          "Add a cube for the torso and scale it taller than it is deep.",
          "Add a UV sphere for the head and scale it slightly narrower.",
          "Add a short cylinder for the neck only if the head feels disconnected.",
        ],
        proof: "The figure reads as a bust even with no armor or face.",
        stuck:
          "If the forms overlap strangely, select one in the Outliner and move it only on Z until the stack reads clearly.",
      },
      {
        id: "warden-proportions",
        minutes: "4 min",
        title: "Set the proportions",
        brief:
          "A few large ratios decide whether the sentinel feels imposing or fragile.",
        example: {
          src: "./phase-2-4-proportions.png",
          alt: "The blockout with broader shoulders and adjusted head-to-torso proportions.",
        },
        actions: [
          "Add a cube across the upper torso as a temporary shoulder bar.",
          "Scale it wider than the head and flatter than the torso.",
          "Orbit from the front, side, and above.",
          "Adjust only head size, shoulder width, or torso height until the figure feels stable.",
        ],
        proof: "The shoulders are wider than the head and the bust reads from three angles.",
        stuck:
          "Change one ratio at a time. Do not add armor until the head, shoulders, and torso feel balanced.",
      },
      {
        id: "warden-armor",
        minutes: "5 min",
        title: "Forge the armor silhouette",
        brief:
          "A strong outer contour will survive distance, darkness, and a small laptop screen.",
        example: {
          src: "./phase-2-5-armor-silhouette.png",
          alt: "The Gatewarden blockout with shoulder plates and a tall helmet crest.",
        },
        actions: [
          "Add one flattened cube as a shoulder plate.",
          "Duplicate it with Shift+D, then move the copy to the other shoulder.",
          "Add a narrow cube or cone above the head as a helmet crest.",
        ],
        proof: "The shoulders and helmet create a recognizable outer contour.",
        stuck:
          "Hide the grid with the Overlays button for ten seconds. If the outline is unclear, make one armor form larger instead of adding more pieces.",
      },
      {
        id: "warden-asymmetry",
        minutes: "3 min",
        title: "Break the symmetry",
        brief:
          "One deliberate imbalance makes the blockout feel less manufactured.",
        example: {
          src: "./phase-2-6-asymmetry.png",
          alt: "The blockout with one shoulder plate rotated and the helmet slightly tilted for asymmetry.",
        },
        actions: [
          "Rotate one shoulder plate slightly with R.",
          "Tilt the helmet crest a little in the opposite direction.",
          "Orbit to confirm the changes read from the front and three-quarter view.",
        ],
        proof: "The two sides feel related without being mirror copies.",
        stuck:
          "Keep the changes small. If the figure looks broken, undo and use half as much rotation.",
      },
      {
        id: "warden-story",
        minutes: "5 min",
        title: "Pose the story beat",
        brief:
          "A production artist makes choices for the story, not just the model.",
        example: {
          src: "./phase-2-7-story-pose.png",
          alt: "The posed Gatewarden blockout beside the relic, communicating a watchful mood.",
        },
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
        minutes: "2 min",
        title: "Make the cinematic copy",
        brief: "Protect the blockout before changing cameras and lights.",
        example: {
          src: "./phase-3-1-cinematic-copy.png",
          alt: "Two Blender project files showing the blockout copied into a cinematic working file.",
        },
        actions: [
          "Open gatewarden-02-blockout.blend.",
          "Choose File > Save As.",
          "Save the copy as gatewarden-03-cinematic.blend.",
        ],
        proof: "The title bar shows gatewarden-03-cinematic.blend.",
        stuck:
          "If the old filename remains in the title bar, repeat Save As before changing the scene.",
      },
      {
        id: "oath-output",
        minutes: "3 min",
        title: "Set the fast render",
        brief: "Fast feedback matters more than final realism right now.",
        example: {
          src: "./phase-3-2-fast-render.png",
          alt: "A simplified Blender properties layout highlighting Eevee and a square 800 by 800 output.",
        },
        actions: [
          "Open Render Properties and choose Eevee as the render engine.",
          "In Output Properties, set a square image at 800 by 800 pixels.",
          "Set the output percentage to 100 percent.",
        ],
        proof: "The render engine is Eevee and the output is a square 800 by 800 pixels.",
        stuck:
          "If Blender labels Eevee differently in your version, choose the Eevee option that appears in Render Properties. Do not switch to Cycles for this mission.",
      },
      {
        id: "oath-angle",
        minutes: "4 min",
        title: "Find the story angle",
        brief:
          "Explore the shot before asking the camera to remember it.",
        example: {
          src: "./phase-3-3-story-angle.png",
          alt: "The Gatewarden viewed from a low three-quarter story angle before the camera is locked.",
        },
        actions: [
          "Orbit to a three-quarter view where the head and both shoulders are visible.",
          "Move slightly below eye level for a more imposing character.",
          "Frame the character so the helmet and shoulders have breathing room.",
        ],
        proof: "The viewport angle supports the mood without cropping the silhouette.",
        stuck:
          "If the angle feels flat, move lower or farther to one side. Change only one direction at a time.",
      },
      {
        id: "oath-camera",
        minutes: "3 min",
        title: "Lock the camera",
        brief:
          "Turn the viewport composition into a repeatable shot.",
        example: {
          src: "./phase-3-4-lock-camera.png",
          alt: "The Gatewarden framed inside a square camera border with space around the helmet and shoulders.",
        },
        actions: [
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
        id: "oath-key",
        minutes: "5 min",
        title: "Place the key light",
        brief:
          "One light should describe the face and the largest armor planes.",
        example: {
          src: "./phase-3-5-key-light.png",
          alt: "The Gatewarden lit from the front and above by one warm key light.",
        },
        actions: [
          "Add an Area light in front of and above the character.",
          "Rotate it toward the face.",
          "Switch the viewport to Rendered shading.",
          "Move the light closer until the face and chest planes are readable.",
        ],
        proof: "The face has shape, with one side brighter than the other.",
        stuck:
          "If everything stays gray, move the light closer before increasing its power.",
      },
      {
        id: "oath-light",
        minutes: "5 min",
        title: "Add the rim light",
        brief:
          "A rear light can pull the silhouette out of darkness.",
        example: {
          src: "./phase-3-6-rim-light.png",
          alt: "The Gatewarden with a warm key light and a cool rim light outlining one shoulder and the helmet.",
        },
        actions: [
          "Add a second Area light behind the character on the opposite side.",
          "Make the rear light narrower and brighter so it draws a rim along one shoulder and the helmet.",
          "Move it sideways until the rim appears without lighting the whole face.",
        ],
        proof:
          "At least one shoulder and one helmet edge separate from the background.",
        stuck:
          "If the rim disappears, move the rear light farther to one side before changing its power.",
      },
      {
        id: "oath-balance",
        minutes: "4 min",
        title: "Balance the shot",
        brief:
          "The key and rim should support each other instead of competing.",
        example: {
          src: "./phase-3-7-balance-shot.png",
          alt: "A balanced rendered viewport with readable face planes and clear silhouette separation.",
        },
        actions: [
          "Stay in camera view with Rendered shading active.",
          "Check that the face is readable and the rim touches only part of the silhouette.",
          "Move a light before changing its power.",
          "Make one adjustment, then compare the whole frame again.",
        ],
        proof: "The face reads first and the rim separates the silhouette without becoming the subject.",
        stuck:
          "If both sides are equally bright, move the key farther to one side. If the rim dominates, move it farther behind the character.",
      },
      {
        id: "oath-render",
        minutes: "4 min",
        title: "Deliver the first frame",
        brief: "A finished rough image teaches more than an unfinished perfect model.",
        example: {
          src: "./phase-3-8-first-frame.png",
          alt: "The finished square cinematic Gatewarden frame ready to save as a PNG.",
        },
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
