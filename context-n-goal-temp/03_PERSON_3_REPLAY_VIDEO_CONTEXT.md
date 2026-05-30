# Person 3 Context: Replay / Video / Comments / Share

## Role

You own the replay experience. Your job is to prove DuelCut is not just a prompt generator and not just video playback.

You are responsible for:

- Replay preview
- 30s+ timeline
- Mock video state
- Timestamp comments
- Fake share link
- Export prompts JSON
- Optional embedded PixVerse video

---

## Main goal

Create a replay preview area that takes StoryScene[] and displays a 30s+ cinematic timeline with interaction.

Even if there is no real PixVerse API, the demo should look like a working creator preview tool.

---

## Suggested files

```txt
src/components/ReplayPreview.tsx
src/components/Timeline.tsx
src/components/TimestampComments.tsx
src/components/ShareReplay.tsx
src/components/ExportPrompts.tsx
src/components/RenderStatus.tsx
```

---

## Input contract

Expected prop:

```ts
type ReplayPreviewProps = {
  scenes: StoryScene[];
};
```

Expected scene shape:

```ts
type StoryScene = {
  id: string;
  title: string;
  actionSummary: string;
  mood: string;
  camera: string;
  intensity: number;
  duration: number;
  prompt: string;
};
```

---

## Required features

### Replay preview

Must show:

- Current scene title.
- Current timestamp.
- Total duration.
- Visual mock preview if no real video.
- Embedded video if available.

Mock preview can be:

- Animated gradient.
- Scene title overlay.
- Fake cinematic particles using CSS.
- Progress bar.

Do not spend too much time on complex animation.

### Timeline

Must show:

- One block per scene.
- Block width roughly proportional to duration.
- Clicking block sets current scene/time.
- Total duration must be visible and >= 30s.

### Timestamp comments

Must allow:

- User types comment.
- User clicks add comment.
- Comment is saved with current timestamp.
- Comment list displays timestamp and text.

### Share link

Must allow:

- User clicks `Share Replay`.
- App generates fake link like:

```txt
https://duelcut.demo/replay/demo-comeback-turn
```

- Copy to clipboard if possible.
- If clipboard fails, display link in text field.

### Export prompts

Must allow:

- User clicks `Export Prompts JSON`.
- Browser downloads a JSON file containing scenes and prompts.

---

## Optional PixVerse video plan

If the team has one PixVerse-rendered 30s+ video:

- Put video file in public folder.
- Embed it in ReplayPreview.
- Keep timeline UI separate as overlay/companion.

Suggested path:

```txt
public/demo-replay.mp4
```

If no real video exists:

- Use mock preview.
- Do not block the demo.

---

## Mock render status

Add a simple status pipeline if time allows:

```txt
Parsed -> Storyboard Ready -> Prompts Ready -> Mock Rendering -> Replay Ready
```

This helps communicate workflow without real API.

---

## Phase testcases

### Phase 1 testcase: Preview renders

Pass if:

- ReplayPreview renders with static scenes.
- Current scene title appears.
- Total duration appears.
- No crash when scenes is empty.

Fallback:

- Show placeholder text: "Generate storyboard to preview replay."

### Phase 2 testcase: Timeline works

Pass if:

- Timeline displays all scene blocks.
- Clicking a block changes current scene.
- Total duration is >= 30s for main demo.

Fallback:

- Use equal-width blocks instead of proportional blocks.

### Phase 3 testcase: Comments work

Pass if:

- User can type comment.
- Add button appends comment with timestamp.
- Comment list updates.

Fallback:

- Use fixed timestamp or current scene index instead of exact seconds.

### Phase 4 testcase: Share/export works

Pass if:

- Share button displays a fake link.
- Export button downloads JSON.

Fallback:

- Instead of download, show JSON in textarea for copy.

---

## Do not build

Do not spend time on:

- Real video stitching.
- Real video upload.
- Real backend save.
- Real share page.
- Complex media player controls.
- Authentication.

---

## TRAE prompt for this role

```txt
You are building the replay preview section for DuelCut.

DuelCut is a hackathon demo that turns TCG battle logs into cinematic storyboard scenes and PixVerse-ready prompts.

Build React components for:
- ReplayPreview
- Timeline
- TimestampComments
- ShareReplay
- ExportPrompts

Input is StoryScene[].
Show a 30s+ replay timeline, mock cinematic preview, clickable scene blocks, timestamp comments, fake share link, and JSON prompt export.

No backend, no database, no auth.
Use local React state only.
Make it reliable for a live demo.
```
