"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { allStepIds, missions } from "../course-data";
import { MissionWorkspace } from "./mission-workspace";

interface SavedProgress {
  completedStepIds: string[];
  activeMissionId: string;
  blenderVersion: string;
}

const STORAGE_KEY = "gloamforge-progress-v1";

const defaultProgress: SavedProgress = {
  activeMissionId: missions[0].id,
  completedStepIds: [],
  blenderVersion: "",
};

const defaultProgressSnapshot = JSON.stringify(defaultProgress);
const progressEventName = "gloamforge-progress";
let memoryProgressSnapshot = defaultProgressSnapshot;

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
    return window.localStorage.getItem(STORAGE_KEY) ?? memoryProgressSnapshot;
  } catch {
    return memoryProgressSnapshot;
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
  const snapshot = JSON.stringify(progress);
  memoryProgressSnapshot = snapshot;

  try {
    window.localStorage.setItem(STORAGE_KEY, snapshot);
  } catch {
    // Browser privacy settings may disable persistence; memory state stays usable.
  }

  window.dispatchEvent(new Event(progressEventName));
}

export function GloamforgeCourse(): React.ReactElement {
  const [missionFocusRequest, setMissionFocusRequest] = useState(0);
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
  const entryMissionId =
    completedStepIds.length === 0 ? missions[0].id : activeMissionId;

  const activeMission =
    missions.find((mission) => mission.id === activeMissionId) ?? missions[0];
  const activeMissionCompletionKey = activeMission.steps
    .filter((step) => completedStepIds.includes(step.id))
    .map((step) => step.id)
    .join(",");

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

  useEffect(() => {
    if (missionFocusRequest === 0) {
      return;
    }

    const missionHeading = document.getElementById("mission-title");
    const missionWorkspace = document.getElementById("active-mission");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    missionHeading?.focus({ preventScroll: true });
    missionWorkspace?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [activeMission.id, missionFocusRequest]);

  const selectMission = (missionId: string, shouldFocus = false) => {
    writeProgress({ ...progress, activeMissionId: missionId });
    if (shouldFocus) {
      setMissionFocusRequest((request) => request + 1);
    }
  };

  const enterActiveMission = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ): void => {
    event.preventDefault();
    window.history.pushState(null, "", "#active-mission");
    selectMission(entryMissionId, true);
  };

  const setStepCompletion = (stepId: string, isComplete: boolean) => {
    const isAlreadyComplete = completedStepIds.includes(stepId);
    if (isComplete === isAlreadyComplete) {
      return;
    }

    writeProgress({
      ...progress,
      completedStepIds: isComplete
        ? [...completedStepIds, stepId]
        : completedStepIds.filter((id) => id !== stepId),
    });
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
            <svg viewBox="0 0 48 48" focusable="false">
              <path
                className="brandFrame"
                d="M24 3.5 44.5 24 24 44.5 3.5 24 24 3.5Z"
              />
              <path
                className="brandHelm"
                d="m16.2 20.4 1.6-6.2L24 9.8l6.2 4.4 1.6 6.2-2.6 12.1L24 37l-5.2-4.5-2.6-12.1Z"
              />
              <path className="brandCrest" d="M24 9.8V5.9l4.6 2.3" />
              <path className="brandVisor" d="m17 21 7 3.6 7-3.6" />
              <path className="brandNose" d="M24 16.2v15.1" />
            </svg>
          </span>
          <span className="brandWord">Gloamforge</span>
        </a>
        <div className="topActions">
          <nav className="topNav" aria-label="Main navigation">
            <a href="#course-map">Missions</a>
            <a href="#field-kit">Field kit</a>
          </nav>
          <button
            className="mastheadReset"
            type="button"
            onClick={resetProgress}
          >
            Reset progress
          </button>
        </div>
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
            <a
              className="primaryButton"
              href="#active-mission"
              onClick={enterActiveMission}
            >
              {completedStepIds.length === 0
                ? "Begin Mission I"
                : "Continue the field guide"}
              <span aria-hidden="true">→</span>
            </a>
            <span className="timePromise">15-30 minutes at a time</span>
          </div>
        </div>

        <figure className="heroArtifact">
          {/* eslint-disable-next-line @next/next/no-img-element -- The GitHub Pages export uses bundled relative assets. */}
          <img
            src="./gatewarden-hero.png"
            alt="The Gatewarden, an original low-poly fantasy sentinel, lit by a warm forge."
            width={1200}
            height={630}
            loading="eager"
            decoding="async"
          />
          <figcaption className="artifactCaption">
            <span>First project</span>
            <strong>The Gatewarden</strong>
            <p>From primitive shapes to a lit story frame.</p>
          </figcaption>
        </figure>
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
              <span
                style={{ transform: `scaleX(${completionPercent / 100})` }}
              />
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

      <MissionWorkspace
        key={`${activeMission.id}:${activeMissionCompletionKey}`}
        mission={activeMission}
        completedStepIds={completedStepIds}
        blenderVersion={blenderVersion}
        onBlenderVersionChange={(version) =>
          writeProgress({ ...progress, blenderVersion: version })
        }
        onStepCompletion={setStepCompletion}
        onSelectMission={(missionId) => selectMission(missionId, true)}
      />

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
