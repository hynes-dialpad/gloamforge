"use client";

import { useState } from "react";

import { missions, type Mission } from "../course-data";

interface MissionWorkspaceProps {
  mission: Mission;
  completedStepIds: string[];
  blenderVersion: string;
  onBlenderVersionChange: (version: string) => void;
  onStepCompletion: (stepId: string, isComplete: boolean) => void;
  onSelectMission: (missionId: string) => void;
}

export function MissionWorkspace({
  mission,
  completedStepIds,
  blenderVersion,
  onBlenderVersionChange,
  onStepCompletion,
  onSelectMission,
}: MissionWorkspaceProps): React.ReactElement {
  const completedCount = mission.steps.filter((step) =>
    completedStepIds.includes(step.id),
  ).length;
  const isMissionComplete = completedCount === mission.steps.length;
  const [expandedStepId, setExpandedStepId] = useState<string | null>(
    () =>
      mission.steps.find((step) => !completedStepIds.includes(step.id))?.id ??
      null,
  );
  const versionWarning =
    blenderVersion.trim().length > 0 &&
    !blenderVersion.trim().startsWith("4.5");
  const missionIndex = missions.findIndex((item) => item.id === mission.id);
  const nextMission = missions[missionIndex + 1];

  return (
    <section
      className="lessonWorkspace"
      id="active-mission"
      aria-labelledby="mission-title"
    >
      <aside className="missionBrief">
        <p className="sectionLabel">Mission {mission.number}</p>
        <h2 id="mission-title" tabIndex={-1}>
          {mission.title}
        </h2>
        <p className="missionPromise">{mission.promise}</p>

        <figure className="missionArtwork">
          {/* eslint-disable-next-line @next/next/no-img-element -- The GitHub Pages export uses bundled relative assets. */}
          <img
            src={mission.artwork.src}
            alt={mission.artwork.alt}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <dl className="briefFacts">
          <div>
            <dt>Timebox</dt>
            <dd>{mission.time}</dd>
          </div>
          <div>
            <dt>Core skill</dt>
            <dd>{mission.focus}</dd>
          </div>
          <div>
            <dt>Save as</dt>
            <dd>{mission.saveAs}</dd>
          </div>
        </dl>

        <div className="winCondition">
          <span aria-hidden="true">+</span>
          <div>
            <strong>Win condition</strong>
            <p>{mission.outcome}</p>
          </div>
        </div>
      </aside>

      <div className="missionRun">
        <div className="missionRunHeader">
          <p>
            {completedCount} of {mission.steps.length} phases complete
          </p>
          <div
            className="missionProgress"
            role="progressbar"
            aria-label={`Mission ${mission.number} progress`}
            aria-valuemin={0}
            aria-valuemax={mission.steps.length}
            aria-valuenow={completedCount}
          >
            <span
              style={{
                transform: `scaleX(${completedCount / mission.steps.length})`,
              }}
            />
          </div>
        </div>

        <div className="stepList">
          {mission.steps.map((step, index) => {
            const isComplete = completedStepIds.includes(step.id);
            const isExpanded = expandedStepId === step.id;
            const headingId = `phase-heading-${step.id}`;
            const panelId = `phase-panel-${step.id}`;

            return (
              <article
                className={`lessonStep${isComplete ? " complete" : ""}${isExpanded ? " expanded" : ""}`}
                key={step.id}
              >
                <h3 className="phaseHeading">
                  <button
                    id={headingId}
                    className="phaseToggle"
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() =>
                      setExpandedStepId(isExpanded ? null : step.id)
                    }
                  >
                    <span className="stepIndex">
                      {mission.number}.{index + 1}
                    </span>
                    <span className="phaseTitle">
                      <span className="stepMinutes">{step.minutes}</span>
                      <span>{step.title}</span>
                    </span>
                    <span className="phaseState">
                      {isComplete ? "Complete" : isExpanded ? "Open" : "Next"}
                    </span>
                  </button>
                </h3>

                <div
                  className="phasePanel"
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  hidden={!isExpanded}
                >
                  {step.id === "forge-version" ? (
                    <div className="versionControl">
                      <div className="versionControlHeading">
                        <strong>Blender 4.5 LTS</strong>
                        <span>Stable course target</span>
                      </div>
                      <label htmlFor="blender-version">
                        Your installed version
                      </label>
                      <div className="versionInputRow">
                        <input
                          id="blender-version"
                          type="text"
                          value={blenderVersion}
                          onChange={(event) =>
                            onBlenderVersionChange(
                              event.target.value.slice(0, 24),
                            )
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
                        className={
                          versionWarning
                            ? "versionNote warning"
                            : "versionNote"
                        }
                        role={versionWarning ? "alert" : undefined}
                      >
                        {versionWarning
                          ? "Different version detected. These missions still use stable tools, but a few labels may move."
                          : "Open Help > Splash Screen in Blender to find this number."}
                      </p>
                    </div>
                  ) : null}

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

                  <button
                    className="completeButton"
                    type="button"
                    onClick={() => onStepCompletion(step.id, !isComplete)}
                  >
                    <span className="checkMark" aria-hidden="true">
                      {isComplete ? "—" : "✓"}
                    </span>
                    {isComplete ? "Mark incomplete" : "Complete this phase"}
                  </button>
                </div>
              </article>
            );
          })}

          {isMissionComplete ? (
            <div className="missionComplete" role="status">
              <p className="sectionLabel">Mission sealed</p>
              <h3>{mission.title} is complete.</h3>
              <p>
                The file is saved, the proof is captured, and the next part of
                the Gatewarden can begin.
              </p>
              {nextMission ? (
                <button
                  className="primaryButton"
                  type="button"
                  onClick={() => onSelectMission(nextMission.id)}
                >
                  Begin Mission {nextMission.number}
                  <span aria-hidden="true">→</span>
                </button>
              ) : (
                <a className="primaryButton" href="#next-chapter">
                  See the road ahead
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          ) : null}

          <div className="stretchChallenge">
            <span className="stretchMark" aria-hidden="true">
              +
            </span>
            <div>
              <p className="sectionLabel">Optional stretch</p>
              <h3>One more creative choice</h3>
              <p>{mission.stretch}</p>
            </div>
          </div>

          <details className="fieldKit" id="field-kit" open>
            <summary>
              <span>A field kit for the MacBook</span>
              <small>Trackpad map and hardware note</small>
            </summary>
            <div className="fieldKitBody">
              <div className="fieldKitIntro">
                <p>
                  Keep this reference beside the active phase. Every checkpoint
                  ends at a safe stopping point, so a short session still
                  produces something visible.
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
                    Blender recommends a three-button mouse with a clickable
                    scroll wheel. The trackpad works, but a basic mouse makes
                    navigation faster and leaves fewer shortcuts to emulate.
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
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
