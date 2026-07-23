"use client";

import { useMemo, useSyncExternalStore } from "react";

interface LessonStep {
  id: string;
  minutes: string;
  title: string;
  brief: string;
  actions: string[];
  proof: string;
  stuck: string;
}

interface Mission {
  id: string;
  number: string;
  title: string;
  time: string;
  focus: string;
  promise: string;
  outcome: string;
  saveAs: string;
  steps: LessonStep[];
  stretch: string;
}

interface SavedProgress {
  completedStepIds: string[];
  activeMissionId: string;
  blenderVersion: string;
}

const STORAGE_KEY = "gloamforge-progress-v1";

const missions: Mission[] = [
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
        proof: "The helmet stays inside the frame and the shoulders do not touch both edges.",
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
        proof: "The face has shape and at least one edge separates from the background.",
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
        proof: "A PNG exists outside Blender and the next story beat is written down.",
        stuck:
          "If the result is dark, do not remodel. Return to the scene, move the key light closer, and render once more.",
      },
    ],
    stretch:
      "Render a second frame from a lower angle. Keep the model and lights unchanged so you can see what the camera alone contributes.",
  },
];

const allStepIds = missions.flatMap((mission) =>
  mission.steps.map((step) => step.id),
);

const defaultProgress: SavedProgress = {
  activeMissionId: missions[0].id,
  completedStepIds: [],
  blenderVersion: "",
};

const defaultProgressSnapshot = JSON.stringify(defaultProgress);
const progressEventName = "gloamforge-progress";

function parseSavedProgress(raw: string): SavedProgress {
  try {
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    return {
      completedStepIds: Array.isArray(parsed.completedStepIds)
        ? parsed.completedStepIds.filter(
            (id): id is string =>
              typeof id === "string" && allStepIds.includes(id),
          )
        : [],
      activeMissionId: missions.some(
        (mission) => mission.id === parsed.activeMissionId,
      )
        ? (parsed.activeMissionId as string)
        : missions[0].id,
      blenderVersion:
        typeof parsed.blenderVersion === "string"
          ? parsed.blenderVersion.slice(0, 24)
          : "",
    };
  } catch {
    return defaultProgress;
  }
}

function readProgressSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? defaultProgressSnapshot;
  } catch {
    return defaultProgressSnapshot;
  }
}

function subscribeToProgress(onStoreChange: () => void): () => void {
  const handleStorage = () => onStoreChange();
  window.addEventListener(progressEventName, handleStorage);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(progressEventName, handleStorage);
    window.removeEventListener("storage", handleStorage);
  };
}

function writeProgress(progress: SavedProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event(progressEventName));
  } catch {
    // Browser privacy settings may disable storage; the lessons still work.
  }
}

export default function Home() {
  const progressSnapshot = useSyncExternalStore(
    subscribeToProgress,
    readProgressSnapshot,
    () => defaultProgressSnapshot,
  );
  const progress = useMemo(
    () => parseSavedProgress(progressSnapshot),
    [progressSnapshot],
  );
  const { activeMissionId, blenderVersion, completedStepIds } = progress;

  const activeMission =
    missions.find((mission) => mission.id === activeMissionId) ?? missions[0];

  const completionPercent = Math.round(
    (completedStepIds.length / allStepIds.length) * 100,
  );

  const completedMissions = useMemo(
    () =>
      missions.filter((mission) =>
        mission.steps.every((step) => completedStepIds.includes(step.id)),
      ).length,
    [completedStepIds],
  );

  const versionWarning =
    blenderVersion.trim().length > 0 &&
    !blenderVersion.trim().startsWith("4.5");

  const selectMission = (missionId: string, shouldScroll = false) => {
    writeProgress({ ...progress, activeMissionId: missionId });
    if (shouldScroll) {
      window.setTimeout(() => {
        document
          .getElementById("active-mission")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  const toggleStep = (stepId: string) => {
    const nextStepIds = completedStepIds.includes(stepId)
      ? completedStepIds.filter((id) => id !== stepId)
      : [...completedStepIds, stepId];
    writeProgress({ ...progress, completedStepIds: nextStepIds });
  };

  const resetProgress = () => {
    if (!window.confirm("Clear every completed step and the saved version?")) {
      return;
    }
    writeProgress(defaultProgress);
  };

  return (
    <main className="siteShell">
      <a className="skipLink" href="#course-map">
        Skip to the course
      </a>

      <header className="topBar">
        <a className="brand" href="#top" aria-label="Gloamforge home">
          <span className="brandMark" aria-hidden="true">
            <span />
          </span>
          <span className="brandWord">Gloamforge</span>
        </a>
        <nav className="topNav" aria-label="Main navigation">
          <a href="#course-map">Missions</a>
          <a href="#field-kit">Field kit</a>
          <a href="#next-chapter">Next chapter</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="kicker">A Blender field guide for cinematic fantasy</p>
          <h1>
            Enter the <span>Gloamforge</span>
          </h1>
          <p className="heroLead">
            Build characters. Light worlds. Tell stories. Three focused
            missions turn Blender&apos;s default cube into your first cinematic
            character frame.
          </p>
          <div className="heroActions">
            <button
              className="primaryButton"
              type="button"
              onClick={() => selectMission(activeMissionId, true)}
            >
              {completedStepIds.length === 0
                ? "Begin Mission I"
                : "Continue the field guide"}
              <span aria-hidden="true">-&gt;</span>
            </button>
            <span className="timePromise">15-30 minutes at a time</span>
          </div>
        </div>

        <div className="heroArtifact" aria-label="The Gatewarden project arc">
          <div className="artifactHalo" aria-hidden="true" />
          <div className="artifactFigure" aria-hidden="true">
            <span className="figureHelm" />
            <span className="figureHead" />
            <span className="figureShoulder figureShoulderLeft" />
            <span className="figureShoulder figureShoulderRight" />
            <span className="figureTorso" />
          </div>
          <div className="artifactCaption">
            <span>First project</span>
            <strong>The Gatewarden</strong>
            <p>From primitive shapes to a lit story frame.</p>
          </div>
        </div>
      </section>

      <section className="versionDock" aria-labelledby="version-heading">
        <div>
          <p className="sectionLabel">Stable target</p>
          <h2 id="version-heading">Blender 4.5 LTS</h2>
          <p>
            One documented version, menu-first directions, and shortcuts as a
            bonus. No chasing old videos.
          </p>
        </div>
        <div className="versionControl">
          <label htmlFor="blender-version">Your installed version</label>
          <div className="versionInputRow">
            <input
              id="blender-version"
              type="text"
              value={blenderVersion}
              onChange={(event) =>
                writeProgress({
                  ...progress,
                  blenderVersion: event.target.value.slice(0, 24),
                })
              }
              placeholder="Example: 4.5.3"
              autoComplete="off"
            />
            <a
              href="https://www.blender.org/download/lts/"
              target="_blank"
              rel="noreferrer"
            >
              Official LTS download
            </a>
          </div>
          <p
            className={versionWarning ? "versionNote warning" : "versionNote"}
            role={versionWarning ? "alert" : undefined}
          >
            {versionWarning
              ? "Different version detected. These missions still use stable tools, but a few labels may move."
              : "Open Help > Splash Screen in Blender to find this number."}
          </p>
        </div>
      </section>

      <section className="courseSection" id="course-map">
        <div className="sectionHeading">
          <div>
            <p className="sectionLabel">The first campaign</p>
            <h2>One character. Three victories.</h2>
          </div>
          <div className="progressSummary">
            <span>
              {completedMissions} of {missions.length} missions complete
            </span>
            <div
              className="progressTrack"
              role="progressbar"
              aria-label="Course progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completionPercent}
            >
              <span style={{ width: `${completionPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="missionMap">
          {missions.map((mission) => {
            const complete = mission.steps.every((step) =>
              completedStepIds.includes(step.id),
            );
            const active = mission.id === activeMissionId;
            return (
              <button
                className={`missionRoute${active ? " active" : ""}${complete ? " complete" : ""}`}
                type="button"
                key={mission.id}
                onClick={() => selectMission(mission.id, true)}
                aria-pressed={active}
              >
                <span className="missionNumber">{mission.number}</span>
                <span className="missionRouteCopy">
                  <strong>{mission.title}</strong>
                  <small>{mission.focus}</small>
                </span>
                <span className="missionTime">
                  {complete ? "Complete" : mission.time}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="lessonWorkspace"
        id="active-mission"
        aria-labelledby="mission-title"
      >
        <aside className="missionBrief">
          <p className="sectionLabel">Mission {activeMission.number}</p>
          <h2 id="mission-title">{activeMission.title}</h2>
          <p className="missionPromise">{activeMission.promise}</p>

          <dl className="briefFacts">
            <div>
              <dt>Timebox</dt>
              <dd>{activeMission.time}</dd>
            </div>
            <div>
              <dt>Core skill</dt>
              <dd>{activeMission.focus}</dd>
            </div>
            <div>
              <dt>Save as</dt>
              <dd>{activeMission.saveAs}</dd>
            </div>
          </dl>

          <div className="winCondition">
            <span aria-hidden="true">+</span>
            <div>
              <strong>Win condition</strong>
              <p>{activeMission.outcome}</p>
            </div>
          </div>
        </aside>

        <div className="stepList">
          {activeMission.steps.map((step, index) => {
            const complete = completedStepIds.includes(step.id);
            return (
              <article
                className={`lessonStep${complete ? " complete" : ""}`}
                key={step.id}
              >
                <div className="stepHeader">
                  <span className="stepIndex">
                    {activeMission.number}.{index + 1}
                  </span>
                  <div>
                    <span className="stepMinutes">{step.minutes}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <button
                    className="completeButton"
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    aria-pressed={complete}
                  >
                    <span className="checkMark" aria-hidden="true">
                      {complete ? "OK" : ""}
                    </span>
                    {complete ? "Completed" : "Mark complete"}
                  </button>
                </div>

                <p className="stepBrief">{step.brief}</p>
                <ol>
                  {step.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ol>

                <div className="stepFooter">
                  <p>
                    <strong>Proof:</strong> {step.proof}
                  </p>
                  <details>
                    <summary>Stuck? Open a recovery hint</summary>
                    <p>{step.stuck}</p>
                  </details>
                </div>
              </article>
            );
          })}

          <div className="stretchChallenge">
            <span className="stretchMark" aria-hidden="true">
              +
            </span>
            <div>
              <p className="sectionLabel">Optional stretch</p>
              <h3>One more creative choice</h3>
              <p>{activeMission.stretch}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fieldKit" id="field-kit">
        <div className="fieldKitIntro">
          <p className="sectionLabel">Built for one screen</p>
          <h2>A field kit for the MacBook.</h2>
          <p>
            The lesson stays readable beside Blender. Every checkpoint ends at
            a safe stopping point, so a short session still produces something
            visible.
          </p>
        </div>

        <div className="trackpadMap">
          <div className="trackpadSurface" aria-hidden="true">
            <span className="finger fingerOne" />
            <span className="finger fingerTwo" />
          </div>
          <dl>
            <div>
              <dt>Orbit</dt>
              <dd>Two-finger drag</dd>
            </div>
            <div>
              <dt>Pan</dt>
              <dd>Shift + two-finger drag</dd>
            </div>
            <div>
              <dt>Zoom</dt>
              <dd>Control or Command + two-finger drag</dd>
            </div>
            <div>
              <dt>Recover</dt>
              <dd>View &gt; Frame Selected</dd>
            </div>
          </dl>
        </div>

        <div className="mouseNote">
          <span className="mouseShape" aria-hidden="true" />
          <div>
            <strong>A mouse is worth adding.</strong>
            <p>
              Blender officially recommends a three-button mouse with a
              clickable scroll wheel. The trackpad works, but a basic mouse
              makes navigation faster and leaves fewer shortcuts to emulate.
            </p>
            <a
              href="https://docs.blender.org/manual/en/latest/getting_started/configuration/hardware.html"
              target="_blank"
              rel="noreferrer"
            >
              Read Blender&apos;s hardware guidance
            </a>
          </div>
        </div>
      </section>

      <section className="nextChapter" id="next-chapter">
        <div>
          <p className="sectionLabel">If the format sticks</p>
          <h2>The road beyond the first frame.</h2>
        </div>
        <ol className="futurePath">
          <li>
            <span>04</span>
            <strong>Edit-mode armor</strong>
            <p>Extrude, inset, bevel, and build a readable prop.</p>
          </li>
          <li>
            <span>05</span>
            <strong>Face and form</strong>
            <p>Sculpt broad anatomy without chasing skin detail.</p>
          </li>
          <li>
            <span>06</span>
            <strong>Materials with history</strong>
            <p>Metal, cloth, wear, roughness, and controlled color.</p>
          </li>
          <li>
            <span>07</span>
            <strong>Storyboard the encounter</strong>
            <p>Pose, camera continuity, and three shots that tell a beat.</p>
          </li>
        </ol>
      </section>

      <footer className="siteFooter">
        <div>
          <strong>Gloamforge</strong>
          <p>
            An original learning project for building cinematic 3D skills one
            short session at a time.
          </p>
        </div>
        <div className="footerActions">
          <p>Progress is saved on this device.</p>
          <button type="button" onClick={resetProgress}>
            Reset progress
          </button>
        </div>
      </footer>
    </main>
  );
}
