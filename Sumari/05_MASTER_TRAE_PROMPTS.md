# Master TRAE Prompts for DuelCut

Use these prompts inside TRAE SOLO. Feed the relevant context file first, then use the task prompt.

---

## Master project prompt

```txt
You are helping build DuelCut for a 4-hour hackathon prototype.

DuelCut is an AI cinematic replay studio for TCG creators.
It turns a controlled card battle log into battle actions, converts them into editable storyboard scenes, compiles PixVerse-ready prompts, and previews a 30s+ replay timeline with timestamp comments and fake share/export.

Important constraints:
- Do not build a real Yu-Gi-Oh simulator.
- Do not build a full rules parser.
- Do not add auth, database, payment, or multiplayer.
- Use local React state.
- Prioritize working demo over perfect architecture.
- The main flow must be: sample log -> generate storyboard -> edit scenes -> prompts -> replay timeline -> comments/share/export.

Tech stack:
Next.js, TypeScript, TailwindCSS.
```

---

## Prompt: create project structure

```txt
Create the initial folder and file structure for DuelCut.

Use Next.js App Router, TypeScript, and Tailwind.

Create placeholder files:
- src/types/replay.ts
- src/data/sampleLogs.ts
- src/lib/generateActions.ts
- src/lib/generateStoryboard.ts
- src/lib/compilePixVersePrompt.ts
- src/components/Header.tsx
- src/components/LogInput.tsx
- src/components/StoryboardPanel.tsx
- src/components/SceneCard.tsx
- src/components/ReplayPreview.tsx
- src/components/Timeline.tsx
- src/components/TimestampComments.tsx
- src/components/ShareReplay.tsx
- src/components/ExportPrompts.tsx

Keep code minimal but compiling.
```

---

## Prompt: build logic

```txt
Implement the DuelCut domain logic.

Create TypeScript types for BattleAction, StoryScene, ReplayComment.
Create 3 controlled sample logs.
Implement:
- generateActions(logId: string): BattleAction[]
- generateStoryboard(actions: BattleAction[]): StoryScene[]
- compilePixVersePrompt(scene: StoryScene): string

Main demo log must produce exactly 5 scenes with total duration >= 30 seconds.
Each scene must include title, action summary, mood, camera, intensity, duration, and a PixVerse-ready prompt.

Do not build a real parser. Use deterministic mapping for reliability.
```

---

## Prompt: build UI shell

```txt
Build the main DuelCut page.

Requirements:
- Dark cinematic UI.
- Header with project name and subtitle.
- Sample log selector.
- Textarea for battle log.
- Generate Storyboard button.
- Storyboard panel showing scene cards.
- Scene controls: mood, camera, intensity, duration.
- Prompt box per scene.
- Pass scenes to ReplayPreview.

Use local React state only.
Make the app understandable within 15 seconds.
```

---

## Prompt: build replay preview

```txt
Build the ReplayPreview section for DuelCut.

Input: StoryScene[].

Features:
- Show total duration.
- Show current scene title and timestamp.
- Show mock cinematic preview if no video is available.
- Show timeline blocks, one per scene.
- Clicking a block changes current scene.
- Timestamp comments input and list.
- Fake share link generation.
- Export prompts JSON.

No backend. No database. No auth.
It must not crash when scenes is empty.
```

---

## Prompt: fix TypeScript errors

```txt
Fix all TypeScript and React errors in this project.

Do not add new features.
Do not change the product scope.
Keep the core flow intact:
sample log -> storyboard -> prompts -> replay preview -> comments/share/export.

Prefer simple, reliable fixes over complex abstractions.
```

---

## Prompt: polish UI only

```txt
Polish the DuelCut UI without changing core logic.

Improve spacing, visual hierarchy, dark cinematic style, cards, badges, buttons, and readability.
Do not add new features.
Do not introduce backend/database/auth.
Keep the demo stable.
```

---

## Prompt: write demo script

```txt
Write a 2-minute demo script for DuelCut.

The script should explain:
- Problem: battle logs are boring and hard to share.
- Solution: DuelCut turns logs into cinematic replay workflow.
- Flow: log -> actions -> storyboard -> prompts -> replay timeline -> comments/share/export.
- Why it is not just playback.
- How TRAE SOLO helped build quickly.
- How PixVerse fits the generation workflow.

Keep it natural and concise.
```
