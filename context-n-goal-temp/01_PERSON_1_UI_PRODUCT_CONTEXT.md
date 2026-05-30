# Person 1 Context: UI / Product Flow

## Role

You own the visible product experience. Your job is to make DuelCut look like a real creator tool, not a random form demo.

You are responsible for:

- App shell
- Main layout
- Log input panel
- Storyboard scene cards
- Basic visual polish
- Connecting UI to existing logic from Person 2

---

## Main goal

Build a single-page app where users can:

1. Select a sample battle log.
2. See/edit the battle log text.
3. Click `Generate Storyboard`.
4. See generated scene cards.
5. Edit scene controls.
6. Pass scenes to the replay preview section from Person 3.

---

## Suggested files

```txt
src/app/page.tsx
src/components/Header.tsx
src/components/LogInput.tsx
src/components/StoryboardPanel.tsx
src/components/SceneCard.tsx
src/components/SceneControls.tsx
```

If the project does not use `src/`, adjust paths accordingly.

---

## UI layout

Use a simple 3-part layout:

```txt
Top: Hero/Header
Main left: Battle Log Input
Main middle/right: Storyboard Editor
Bottom/right: Replay Preview from Person 3
```

Recommended desktop layout:

```txt
[ Header ]
[ Log Input ] [ Storyboard Editor ]
[ Replay Preview / Timeline ]
```

Mobile responsiveness is not the priority. Desktop demo matters more.

---

## Required UI elements

### Header

Must include:

- Project name: DuelCut
- Subtitle: AI Cinematic Replay Studio for TCG Creators
- Short description: Turn battle logs into editable cinematic replay scenes.

### Log input panel

Must include:

- Sample log dropdown.
- Textarea for log content.
- `Generate Storyboard` button.
- Small note: "Controlled logs only for hackathon demo. Not a full Yu-Gi-Oh simulator."

### Storyboard panel

Must include:

- Scene list/grid.
- Scene title.
- Action summary.
- Duration.
- Mood select.
- Camera select.
- Intensity slider/select.
- Prompt display box.
- Copy prompt button if time allows.

---

## State contract with Person 2

Expected types:

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

Expected functions from Person 2:

```ts
generateActions(logId: string): BattleAction[]
generateStoryboard(actions: BattleAction[]): StoryScene[]
compilePixVersePrompt(scene: StoryScene): string
```

When user edits mood/camera/intensity/duration, update the scene and regenerate prompt.

---

## Visual direction

Style should feel:

- Dark
- Cinematic
- Creator-tool-like
- Clear, not overloaded
- Slightly dramatic but readable

Use Tailwind classes. Avoid spending too long on perfect design. Good hierarchy matters more than animation.

---

## Phase testcases

### Phase 1 testcase: App shell

Pass if:

- App loads without error.
- Header visible.
- Log input visible.
- Generate button visible.
- No TypeScript/runtime error.

If fail:

- Remove fancy components.
- Use plain divs and buttons until stable.

### Phase 2 testcase: Storyboard visible

Pass if:

- Selecting the sample log and clicking generate shows 5 scene cards.
- Each card has title, action summary, duration, and prompt.
- Total duration is visible or can be checked.

If fail:

- Hardcode scenes temporarily and connect logic later.

### Phase 3 testcase: Scene editing

Pass if:

- Changing mood/camera/intensity updates the scene.
- Prompt text changes after update.
- No crash.

If fail:

- Keep controls but stop prompt auto-update. Manual static prompt is acceptable as fallback.

### Phase 4 testcase: Integration with replay

Pass if:

- Person 3's ReplayPreview receives scenes as props.
- Timeline renders after storyboard generation.

If fail:

- Use static scenes in ReplayPreview for demo.

---

## Do not build

Do not spend time on:

- Login UI.
- Settings page.
- Real upload flow.
- Complex navigation.
- Drag-and-drop storyboard.
- Perfect mobile layout.

---

## TRAE prompt for this role

```txt
You are building the UI/product flow for DuelCut, a hackathon demo app.

Context:
DuelCut turns a TCG battle log into editable cinematic storyboard scenes and PixVerse-ready prompts.

Build a Next.js + TypeScript + Tailwind single-page UI with:
- dark cinematic header
- sample battle log selector
- battle log textarea
- Generate Storyboard button
- storyboard scene cards
- controls for mood, camera, intensity, duration
- prompt display per scene

No backend, no database, no auth.
Use local React state.
Prioritize a working demo over perfect architecture.
```
