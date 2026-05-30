# DuelCut Project Context & Goal

## 1. Project identity

**Project name:** DuelCut  
**Hackathon:** Unbound Creativity with TRAE SOLO - TRAE SOLO Hackathon @ Vietnam  
**Track:** Video Generation, Gaming, Film & Entertainment, Content Studio  
**Build time assumed:** ~4 hours of real coding time  
**Team size:** 3 people  
**Core tools:** TRAE SOLO, PixVerse, Next.js, TypeScript, TailwindCSS  

DuelCut is a hackathon prototype for a **TCG/card-game cinematic replay studio**. It turns a boring battle log into an editable storyboard, generates PixVerse-ready prompts, and previews a 30s+ cinematic replay timeline.

This is **not** a Yu-Gi-Oh simulator. This is **not** a real card game engine. This is **not** a full video editor. It is a focused demo that proves the core product workflow.

---

## 2. One-sentence goal

Build a working prototype where a user selects a sample card battle log, clicks generate, receives 5 editable cinematic storyboard scenes, sees PixVerse-ready prompts, previews a 30s+ replay timeline, adds timestamp comments, and exports/shares the result.

---

## 3. Real problem

Card game and boardgame logs are usually hard to read, boring to share, and not useful for content creators. A dramatic turn in a TCG often becomes plain text like:

```txt
Player A activates Dark Hole.
Player B chains Solemn Judgment.
Player A summons Blue-Eyes.
Blue-Eyes attacks directly.
```

That has gameplay meaning, but it does not look like content. DuelCut turns that raw log into a cinematic recap workflow.

---

## 4. Target users

Primary users:

- TCG content creators
- Streamers
- Indie card game developers
- Boardgame communities
- Tournament/community organizers

They need short, shareable video recaps from game moments, not full match replays.

---

## 5. Value proposition

DuelCut provides value because it is not just a video player. It gives users a creator workflow:

1. Parse raw battle log into actions.
2. Convert actions into cinematic storyboard scenes.
3. Let user tune mood, camera, intensity, and duration.
4. Compile each scene into a PixVerse-ready prompt.
5. Preview a 30s+ replay timeline.
6. Add timestamp comments.
7. Export/share replay assets.

The demo should feel like a lightweight content studio.

---

## 6. Hackathon fit

This fits the Video Generation track because:

- It uses PixVerse-style video generation as part of the product workflow.
- The output is a 30s+ AI-generated or AI-ready cinematic replay.
- It is in the gaming/entertainment category.
- The app has real functionality beyond playback: storyboard editing, prompt generation, timeline comments, export/share.
- TRAE SOLO can be used heavily for coding, prompt generation, architecture, component creation, and rapid iteration.

---

## 7. MVP scope

### Must-have

The demo is only acceptable if all of these work:

- Sample battle log selector.
- Textarea showing battle log.
- Generate Storyboard button.
- Output 5 storyboard scenes.
- Each scene has title, action summary, mood, camera, intensity, duration.
- Each scene has a generated PixVerse-ready prompt.
- User can edit mood/camera/intensity/duration.
- Prompt updates after editing.
- Replay preview timeline totals at least 30 seconds.
- Timeline has scene blocks.
- User can add timestamp comments.
- User can generate fake share link.
- User can export prompts as JSON.

### Should-have

Useful if time allows:

- Mock render status: `Parsed -> Storyboard -> Prompted -> Rendering -> Ready`.
- Copy prompt button per scene.
- Current scene highlight in replay timeline.
- Better sample logs, 2-3 options.
- Simple loading and error states.

### Nice-to-have

Only do these after MVP is stable:

- Embed one real PixVerse-rendered 30s+ video.
- More polished animations.
- Card thumbnails.
- LocalStorage save.
- Fake replay detail page.

### Cut scope

Do not build these during hackathon:

- Real Yu-Gi-Oh rules parser.
- Real boardgame engine.
- Full card database.
- Login/auth.
- Database.
- Multiplayer.
- Real video stitching.
- Full PixVerse API integration for every scene.
- Payment, user profile, social feed.

---

## 8. Main user flow

1. User opens DuelCut.
2. User selects a sample battle log.
3. User clicks `Generate Storyboard`.
4. App converts the log into battle actions.
5. App converts battle actions into 5 storyboard scenes.
6. User edits scene direction: mood, camera, intensity, duration.
7. App regenerates PixVerse-ready prompts.
8. User opens replay preview.
9. App shows a 30s+ cinematic timeline using mock video or embedded video.
10. User clicks timeline scenes and adds timestamp comments.
11. User exports prompts JSON or generates a fake share link.

---

## 9. Sample battle log for demo

Use this as the primary demo input:

```txt
Turn 4:
Player A activates Dark Hole to wipe the field.
Player B chains Solemn Judgment, paying half their LP to negate it.
Player A summons Blue-Eyes White Dragon from the graveyard.
Blue-Eyes attacks directly for 3000 damage.
Player B is reduced to 500 LP.
```

Expected scenes:

| Scene | Title | Duration |
|---|---|---:|
| 1 | Board tension before the reversal | 5s |
| 2 | Dark Hole activation | 6s |
| 3 | Solemn Judgment chain negate | 6s |
| 4 | Blue-Eyes revival summon | 8s |
| 5 | Final direct attack | 7s |

Total expected duration: 32 seconds.

---

## 10. Success definition

The project is "good enough" when:

- A judge can understand the product within 15 seconds.
- The whole flow works without manual code changes.
- The timeline clearly shows a 30s+ replay structure.
- At least one prompt looks like something usable for PixVerse.
- The app has interaction beyond playback.
- The team can demo it in 2-3 minutes without explaining missing features too much.

---

## 11. TRAE usage expectation

Use TRAE SOLO for:

- Generating React components.
- Creating TypeScript types.
- Writing deterministic mock logic.
- Refactoring UI layout.
- Generating prompt compiler logic.
- Fixing TypeScript errors.
- Writing demo data.
- Building export/share features.

Do not ask TRAE to build the whole app blindly. Feed it this context file and then give one focused task at a time.

---

## 12. Development rule

Build in phases. Do not proceed to the next phase until the testcase for the current phase passes.

No feature is allowed to block the main demo flow. If a feature causes issues, cut it and use the fallback.
