# Person 2 Context: Logic / Storyboard / Prompt Compiler

## Role

You own the core demo logic. Your job is to make the app feel intelligent even though it is a hackathon prototype.

You are responsible for:

- Sample battle logs
- TypeScript data models
- Controlled log-to-action mapping
- Action-to-storyboard generation
- PixVerse-ready prompt compiler
- Test data reliability

---

## Main goal

Create deterministic logic that turns a sample battle log into 5 cinematic storyboard scenes with usable prompts.

Do not build a real Yu-Gi-Oh parser. Do not build a real rules engine. Controlled data is acceptable and preferred.

---

## Suggested files

```txt
src/types/replay.ts
src/data/sampleLogs.ts
src/lib/generateActions.ts
src/lib/generateStoryboard.ts
src/lib/compilePixVersePrompt.ts
```

---

## Required types

Create or maintain these types:

```ts
export type BattleActionType =
  | "setup"
  | "activate"
  | "chain"
  | "summon"
  | "attack"
  | "damage";

export type BattleAction = {
  id: string;
  turn: number;
  actor: string;
  card?: string;
  action: BattleActionType;
  summary: string;
  visualIntent: string;
};

export type StoryScene = {
  id: string;
  title: string;
  sourceActionIds: string[];
  actionSummary: string;
  mood: "dark" | "heroic" | "chaotic" | "cinematic";
  camera: "close-up" | "dolly-in" | "overhead" | "whip-pan";
  intensity: 1 | 2 | 3 | 4 | 5;
  duration: number;
  prompt: string;
};

export type ReplayComment = {
  id: string;
  timestamp: number;
  text: string;
};
```

Keep types simple. If UI needs extra fields, add only if necessary.

---

## Sample logs

Create 3 sample logs, but the first one is the main demo.

### Main demo log

```txt
Turn 4:
Player A activates Dark Hole to wipe the field.
Player B chains Solemn Judgment, paying half their LP to negate it.
Player A summons Blue-Eyes White Dragon from the graveyard.
Blue-Eyes attacks directly for 3000 damage.
Player B is reduced to 500 LP.
```

### Optional sample 2

```txt
Final Turn:
Player B sets a hidden trap and ends their turn.
Player A declares an attack with Crimson Dragon.
Player B reveals Mirror Force to destroy the attacking monster.
Player A activates a counter spell to protect Crimson Dragon.
Crimson Dragon lands the final attack.
```

### Optional sample 3

```txt
Turn 7:
Player A has 1000 LP left and no monsters.
Player A draws the final card.
Player A activates Rebirth Gate to revive an ancient machine titan.
The titan absorbs energy from three destroyed cards.
Player A attacks all enemy units and wins the duel.
```

---

## Function requirements

### `generateActions(logId: string): BattleAction[]`

For hackathon reliability, this can return predefined actions based on log ID.

Pass condition:

- Main demo log returns 5 actions.
- No undefined values.
- Each action has a clear summary and visualIntent.

### `generateStoryboard(actions: BattleAction[]): StoryScene[]`

Convert actions to 5 scenes.

Main demo expected output:

| Scene | Title | Duration |
|---|---|---:|
| 1 | Board tension before the reversal | 5 |
| 2 | Dark Hole activation | 6 |
| 3 | Solemn Judgment chain negate | 6 |
| 4 | Blue-Eyes revival summon | 8 |
| 5 | Final direct attack | 7 |

Total duration must be >= 30 seconds.

### `compilePixVersePrompt(scene: StoryScene): string`

Prompt must include:

- Subject
- Battle action
- Mood
- Camera movement
- Intensity
- Duration
- Cinematic visual style
- Lighting
- Particle effects

Example prompt style:

```txt
A cinematic trading card battle arena during a decisive comeback turn. A spell card rises from the battlefield as dark energy collapses into a massive vortex. Mood: chaotic. Camera: overhead to fast dolly-in. Intensity: 5/5. Duration: 6 seconds. Dramatic lighting, glowing card particles, high contrast shadows, anime-inspired fantasy VFX, no text overlay.
```

Avoid copyrighted character names if the team wants safer prompts. For internal demo, names are okay in UI, but generic prompts are safer.

---

## Phase testcases

### Phase 1 testcase: Types compile

Pass if:

```bash
npm run build
```

or

```bash
npm run lint
```

has no type errors from your files.

Fallback:

- Use broader string types instead of strict unions if strict typing blocks integration.

### Phase 2 testcase: Actions generated

Pass if:

- `generateActions("dark-hole-comeback")` returns exactly 5 actions.
- Each action has `id`, `turn`, `actor`, `action`, `summary`, `visualIntent`.

Fallback:

- Return static array directly.

### Phase 3 testcase: Storyboard generated

Pass if:

- `generateStoryboard(actions)` returns exactly 5 scenes.
- Scene durations total >= 30.
- Each scene has a prompt.

Fallback:

- Return static scenes directly.

### Phase 4 testcase: Prompt updates

Pass if:

- Changing mood/camera/intensity in a scene and calling `compilePixVersePrompt(scene)` returns changed text.

Fallback:

- Prompt changes only for mood/camera. Ignore intensity if needed.

---

## Do not build

Do not spend time on:

- Real NLP parser.
- LLM API calls.
- Full rule validation.
- Card legality checking.
- Damage calculation.
- Chain timing correctness.

---

## TRAE prompt for this role

```txt
You are building the domain logic for DuelCut, a hackathon demo.

DuelCut turns controlled TCG battle logs into cinematic storyboard scenes and PixVerse-ready prompts.

Do not build a real Yu-Gi-Oh parser or rules engine.
Use deterministic sample data and simple mapping.

Create TypeScript types, sample logs, generateActions, generateStoryboard, and compilePixVersePrompt.

The main demo must generate exactly 5 scenes totaling at least 30 seconds.
Each scene must have title, action summary, mood, camera, intensity, duration, and prompt.
Prioritize reliability and clean data over complexity.
```
