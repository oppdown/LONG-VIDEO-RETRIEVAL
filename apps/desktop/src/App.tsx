const taskProfiles = [
  'Sparse Long-Video Retrieval — Audio Required',
  'Sparse Long-Video Retrieval — Video Only',
  'Temporal Ordering — How-To (Audio Required)',
  'Temporal Ordering — How-To (Video Only)',
  'Spatial State Change / Physical Outcome — Video Only',
];

export function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">WINDOWS-FIRST MULTIMODAL WORKBENCH</p>
          <h1>LONG VIDEO RETRIEVAL</h1>
        </div>
        <span className="status-pill">PRE-ALPHA · LOCAL-FIRST</span>
      </header>

      <section className="hero-card">
        <div>
          <p className="eyebrow">EVIDENCE PIPELINE</p>
          <h2>Find the moment. Verify every frame.</h2>
          <p>
            Candidate windows will be inspected at the original source-frame rate with
            synchronized audio evidence where the selected task permits it.
          </p>
        </div>
        <div className="drop-zone" aria-label="Media drop zone">
          <span className="drop-icon">＋</span>
          <strong>Drop a video to begin</strong>
          <small>MP4 · MOV · MKV · WEBM · AVI</small>
        </div>
      </section>

      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-heading">
            <h3>Task profile</h3>
            <span>01</span>
          </div>
          <select defaultValue={taskProfiles[0]}>
            {taskProfiles.map((profile) => <option key={profile}>{profile}</option>)}
          </select>
          <p className="muted">Audio state will remain visible and enforced throughout analysis.</p>
        </article>

        <article className="panel timeline-panel">
          <div className="panel-heading">
            <h3>Candidate timeline</h3>
            <span>02</span>
          </div>
          <div className="timeline-empty">Media evidence will appear here after intake.</div>
        </article>

        <article className="panel evidence-panel">
          <div className="panel-heading">
            <h3>Dense verification</h3>
            <span>03</span>
          </div>
          <ul>
            <li><span className="dot pending" />Source-frame adjacency locked</li>
            <li><span className="dot pending" />Pixel and motion signals aligned</li>
            <li><span className="dot pending" />Phantom-motion review available</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

