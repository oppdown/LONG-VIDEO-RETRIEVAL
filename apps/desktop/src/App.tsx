import { ChangeEvent, DragEvent, useMemo, useState } from 'react';

type TaskProfile = {
  id: string;
  label: string;
  modality: 'Audio required' | 'Video only';
  description: string;
};

const taskProfiles: TaskProfile[] = [
  { id: 'sparse-audio', label: 'Sparse Long-Video Retrieval — Audio Required', modality: 'Audio required', description: 'Search a long timeline with synchronized visual and audio evidence.' },
  { id: 'sparse-video', label: 'Sparse Long-Video Retrieval — Video Only', modality: 'Video only', description: 'Search a long timeline using visual evidence while audio remains disabled.' },
  { id: 'ordering-audio', label: 'Temporal Ordering — How-To (Audio Required)', modality: 'Audio required', description: 'Establish the order of demonstrated steps with synchronized audio support.' },
  { id: 'ordering-video', label: 'Temporal Ordering — How-To (Video Only)', modality: 'Video only', description: 'Establish the order of demonstrated steps from visual evidence alone.' },
  { id: 'spatial-video', label: 'Spatial State Change / Physical Outcome — Video Only', modality: 'Video only', description: 'Compare object relationships before and after a visible state change.' },
];

const acceptedVideoTypes = '.mp4,.mov,.mkv,.webm,.avi,.m4v';

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function App() {
  const [selectedProfileId, setSelectedProfileId] = useState(taskProfiles[0].id);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [promptText, setPromptText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const selectedProfile = useMemo(
    () => taskProfiles.find((profile) => profile.id === selectedProfileId) ?? taskProfiles[0],
    [selectedProfileId],
  );

  function acceptMedia(file?: File) {
    if (file) setMediaFile(file);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    acceptMedia(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    acceptMedia(event.dataTransfer.files?.[0]);
  }

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
        <label
          className={`drop-zone ${isDragging ? 'is-dragging' : ''}`}
          htmlFor="media-file"
          onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input id="media-file" type="file" accept={acceptedVideoTypes} onChange={handleFileChange} />
          <span className="drop-icon">＋</span>
          <strong>{mediaFile ? 'Replace video' : 'Drop a video to begin'}</strong>
          <small>MP4 · MOV · MKV · WEBM · AVI</small>
          {mediaFile && <span className="file-summary">{mediaFile.name} · {formatBytes(mediaFile.size)}</span>}
        </label>
      </section>

      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-heading">
            <h3>Task profile</h3>
            <span>01</span>
          </div>
          <fieldset className="profile-list">
            <legend className="sr-only">Choose a task profile</legend>
            {taskProfiles.map((profile) => (
              <label className={`profile-option ${selectedProfileId === profile.id ? 'is-selected' : ''}`} key={profile.id}>
                <input
                  type="radio"
                  name="task-profile"
                  value={profile.id}
                  checked={selectedProfileId === profile.id}
                  onChange={() => setSelectedProfileId(profile.id)}
                />
                <span className="radio-mark" aria-hidden="true" />
                <span className="profile-copy">
                  <strong>{profile.label}</strong>
                  <small>{profile.description}</small>
                </span>
                <span className={`modality-badge ${profile.modality === 'Audio required' ? 'audio' : 'video'}`}>{profile.modality}</span>
              </label>
            ))}
          </fieldset>
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

        <article className="panel prompt-panel">
          <div className="panel-heading">
            <div>
              <h3>Task prompt / question(s)</h3>
              <p className="panel-subtitle">Paste the exact task text here</p>
            </div>
            <span>04</span>
          </div>
          <textarea
            aria-label="Task prompt or questions"
            placeholder="Paste the prompt, question(s), answer choices, or task-specific instructions…"
            value={promptText}
            onChange={(event) => setPromptText(event.target.value)}
            rows={7}
          />
          <div className="prompt-footer">
            <span>{promptText.trim().length ? `${promptText.trim().length} characters ready` : 'Optional until task instructions are available'}</span>
            <span>{selectedProfile.modality}</span>
          </div>
        </article>

        <article className="panel intake-panel">
          <div className="panel-heading">
            <h3>Analysis intake</h3>
            <span>05</span>
          </div>
          <div className="intake-row">
            <span className="intake-label">Profile</span>
            <strong>{selectedProfile.label}</strong>
          </div>
          <div className="intake-row">
            <span className="intake-label">Media</span>
            <strong>{mediaFile ? mediaFile.name : 'Waiting for a video'}</strong>
          </div>
          <button className="primary-button" type="button" disabled={!mediaFile}>Prepare evidence review</button>
          <p className="muted">Preparation is available for input testing; dense analysis is the next integration milestone.</p>
        </article>
      </section>
    </main>
  );
}
