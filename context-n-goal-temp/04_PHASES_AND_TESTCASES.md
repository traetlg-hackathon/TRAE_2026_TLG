# DuelCut Phase Plan & Testcases

This file defines when the team is allowed to move from one phase to the next.

Rule: do not proceed to the next phase until the current phase testcase passes. If it does not pass within 10-15 minutes, use fallback.

---

## Phase 0: Setup

### Goal

Create a working Next.js app that all members can run.

### Tasks

- Create Next.js + TypeScript + Tailwind project.
- Create folder structure.
- Add placeholder components.
- Confirm app starts locally.

### Suggested command

```bash
npx create-next-app@latest duelcut
cd duelcut
npm run dev
```

Recommended choices:

```txt
TypeScript: yes
Tailwind: yes
App Router: yes
src directory: yes
```

### Folder structure

```txt
src/app
src/components
src/data
src/lib
src/types
public
```

### Testcase

Pass if:

- App opens in browser.
- Header says "DuelCut".
- No runtime error.

Fallback:

- Use basic Next.js page without shadcn/ui.

---

## Phase 1: Core Data & UI Shell

### Goal

Show sample log and generate button.

### Tasks

- Add sample log data.
- Add log selector.
- Add textarea.
- Add Generate Storyboard button.
- Add empty storyboard area.

### Testcase

Pass if:

- User can select sample log.
- Textarea updates.
- Generate button exists.
- No TypeScript/runtime error.

Fallback:

- Hardcode one sample log only.

---

## Phase 2: Storyboard Generation

### Goal

Generate 5 storyboard scenes from sample log.

### Tasks

- Implement `generateActions`.
- Implement `generateStoryboard`.
- Implement `compilePixVersePrompt`.
- Render scene cards.

### Testcase

Pass if:

- Clicking Generate Storyboard displays exactly 5 scenes.
- Each scene has title, action summary, mood, camera, intensity, duration, prompt.
- Total duration >= 30 seconds.

Fallback:

- Return static scene array directly.

---

## Phase 3: Editable Storyboard

### Goal

User can adjust cinematic direction.

### Tasks

- Add mood selector.
- Add camera selector.
- Add intensity selector/slider.
- Add duration input/select.
- Regenerate prompt after changes.

### Testcase

Pass if:

- User changes mood and prompt text changes.
- User changes camera and prompt text changes.
- User changes intensity and prompt text changes.
- No scene becomes invalid.

Fallback:

- Keep controls but allow only mood/camera changes.

---

## Phase 4: Replay Preview Timeline

### Goal

Show a 30s+ replay preview based on storyboard scenes.

### Tasks

- Build ReplayPreview.
- Show current scene.
- Show total duration.
- Render timeline blocks.
- Allow clicking a scene block.

### Testcase

Pass if:

- Timeline has 5 scene blocks.
- Total duration shown is >= 30s.
- Clicking each block changes current scene.
- Preview area does not crash if video is missing.

Fallback:

- Use static mock preview and equal-width blocks.

---

## Phase 5: Comments, Share, Export

### Goal

Show that this is a creator workflow, not just playback.

### Tasks

- Add timestamp comment input.
- Add comment list.
- Add fake share link button.
- Add export prompts JSON.

### Testcase

Pass if:

- User can add at least one timestamp comment.
- Share button displays a link.
- Export button downloads JSON or shows JSON for copy.

Fallback:

- If download fails, show JSON in a textarea.
- If clipboard fails, display the fake share link.

---

## Phase 6: PixVerse / Video Proof

### Goal

Satisfy video-generation track requirements as much as possible.

### Preferred plan

- Use one pre-rendered PixVerse video, 30s+.
- Embed it in replay preview.
- Keep timeline/comment features around it.

### If no real video

- Use mock cinematic preview.
- Show PixVerse-ready prompts clearly.
- Explain that live render is replaceable with PixVerse API.

### Testcase

Pass if:

- Preview section clearly shows a 30s+ replay/video concept.
- Prompts are visible and exportable.
- The demo can be explained without live API.

Fallback:

- Use mock preview and emphasize prompt compiler + workflow.

---

## Phase 7: Demo Freeze

### Goal

Stop adding features and prepare presentation.

### Tasks

- Test full flow from refresh.
- Prepare demo script.
- Prepare backup screenshots.
- Prepare backup video or mock mode.
- Fix only blocking bugs.

### Testcase

Pass if:

- App works after page refresh.
- Demo flow completes in under 3 minutes.
- No missing dependency blocks demo.

Fallback:

- Use local app instead of deployed app.
- Use screenshots/video if live app crashes.

---

## Final acceptance checklist

Before submission/demo, confirm:

- [ ] App loads.
- [ ] Sample log visible.
- [ ] Generate Storyboard works.
- [ ] 5 scenes appear.
- [ ] Total duration >= 30s.
- [ ] Scene prompt visible.
- [ ] Scene editing works.
- [ ] Replay preview visible.
- [ ] Timeline clickable.
- [ ] Timestamp comment works.
- [ ] Share link works or displays.
- [ ] Export prompts works or JSON copy area exists.
- [ ] Pitch script ready.
- [ ] Backup screenshot/video ready.
