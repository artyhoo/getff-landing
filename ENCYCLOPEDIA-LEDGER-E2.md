# ENCYCLOPEDIA-LEDGER-E2 — capability-sentence ledger, stage E2 (census families B + C)

Stage: beta-docs-encyclopedia E2 — raw reference drafts: skills + sub-agents.
Evidence pin: framework `artyhoo/getff` staging @ `b069c59328aa8e08671d3a19fd25efa618dfc1c5`
(fetched 2026-09-11; ancestry of census pin `a1337cb301` verified). Anchors citing
`.claude/skills/aif*/SKILL.md` and `.claude/skills/self-reflection/SKILL.md` files: the aif-*
suite files are on-disk gitignored files in the framework clone (`.gitignore:120-121`), so those
anchors are disk reads at authoring time (2026-09-12), not git objects at the pin;
`self-reflection` IS tracked (a git object at the pin). All other anchor paths (setup.d/*,
packages/*, agents/*) are git objects at the pin.

Method: every capability sentence-unit of the 55 new pages' Status line, What it is,
How it works, and Satellites & companions sections was extracted by a deterministic
code-span- and quote-aware splitter; the same extraction defines both the rows and the tally, so the count below is
the splitter's count, not a hand-picked one. Rows citing an anchor carry the anchor(s) that
appear inside that sentence on the page; rows whose sentence makes a page-level framing
claim with no inline citation carry the explicit label `page-level (see page Anchors)` —
their evidence is the page's own anchor section. `…/path` anchors mirror the pages' own
elided-path citation notation.

Tally: 55 pages · 716 ledger rows (389 with inline anchors, 327 page-level labeled) ·
0 experimental/planned labels (no page carries those labels; all documented items ship).
Consolidation into `CLAIMS-LEDGER.md` is stage E6's job (per-stage files on purpose —
sibling stages E3-E5 write their own); `CLAIMS-LEDGER.md` was not touched.

| page | sentence (short) | evidence anchor(s) at pin |
| --- | --- | --- |
| b1-template-audit | **Status:** shipped-beta | page-level (see page Anchors) |
| b1-template-audit | **Ships to:** core tier arm (GETFF_SKILLS_CORE, setup.d/lib.sh:61) | setup.d/lib.sh:61 |
| b1-template-audit | **Fires at:** Claude Code skill auto-activation on the trigger phrases in its frontmatter description | page-level (see page Anchors) |
| b1-template-audit | A skill that audits the docs templates the framework renders (e.g | page-level (see page Anchors) |
| b1-template-audit | a project's AGENTS.md) via a **local advisory review**, in two steps | page-level (see page Anchors) |
| b1-template-audit | Its own self-description: a Session-bound advisory audit. **FREE under Claude Code subscription.** No API… | .claude/skills/template-audit/SKILL.md:13 |
| b1-template-audit | It is advisory — it reports findings for the session to act on; the… | page-level (see page Anchors) |
| b1-template-audit | Per its ## Procedure section (.claude/skills/template-audit/SKILL.md:15): | .claude/skills/template-audit/SKILL.md:15 |
| b1-template-audit | **Step 1 — deterministic probes (CI-equivalent).** Run npm --prefix packages/core run test:template-render; If this… | .claude/skills/template-audit/SKILL.md:20 |
| b1-template-audit | **Step 2 — LLM advisory checks (session-bound, P2/P3/P5).** Ask the current Claude session (no… | .claude/skills/template-audit/SKILL.md:25, .claude/skills/template-audit/SKILL.md:29 |
| b1-template-audit | A ## Promotion trigger section (.claude/skills/template-audit/SKILL.md:38) closes the skill | .claude/skills/template-audit/SKILL.md:38 |
| b1-template-audit | Harness posture is declared portable: prose advisory audit checklist; no harness primitives (.claude/skills/template-audit/SKILL.md:6) | .claude/skills/template-audit/SKILL.md:6 |
| b1-template-audit | - **USES:** the deterministic template-render audit in packages/core (npm … run test:template-render, Step 1)… | .claude/skills/template-audit/SKILL.md:11 |
| b1-template-audit | - **ADAPTS:** the local advisory-review pattern (session-bound, no paid API) shared by the core-tier… | page-level (see page Anchors) |
| b1-template-audit | - **ADDS:** the trigger vocabulary for template audits (template, audit, render, generated docs, AGENTS.md,… | SKILL.md:3 |
| b1-template-audit | - Census family satellites: **E** (templates + vendored renders) — the surfaces this skill… | page-level (see page Anchors) |
| b10-dispatcher | **Status:** shipped-beta | page-level (see page Anchors) |
| b10-dispatcher | **Ships to:** factory tier arm (GETFF_SKILLS_FACTORY, setup.d/lib.sh:63) | setup.d/lib.sh:63 |
| b10-dispatcher | **Fires at:** explicit /dispatcher <umbrella-name> only — the frontmatter carries arguments: [umbrella] and disable-model-invocation: true (.claude/skills/dispatcher/SKILL.md:4-6) | .claude/skills/dispatcher/SKILL.md:4-6 |
| b10-dispatcher | The aif-control execution loop: # /dispatcher — aif-control execution loop (.claude/skills/dispatcher/SKILL.md:28) | .claude/skills/dispatcher/SKILL.md:28 |
| b10-dispatcher | Its description: Use when you need to EXECUTE a chosen umbrella's stages through the… | .claude/skills/dispatcher/SKILL.md:3 |
| b10-dispatcher | It complements /pipeline (plan) with the execution half (.claude/skills/dispatcher/SKILL.md:31 area), on a substrate of… | .claude/skills/dispatcher/SKILL.md:31, .claude/skills/dispatcher/SKILL.md:33 |
| b10-dispatcher | The skill's sections are the loop itself: §0 Invocation, §1 Primitives table, §2 The… | .claude/skills/dispatcher/SKILL.md:38, .claude/skills/dispatcher/SKILL.md:374 |
| b10-dispatcher | Its frontmatter pins the runtime surface: model: opus and an allowed-tools allowlist (git, gh,… | .claude/skills/dispatcher/SKILL.md:7-16 |
| b10-dispatcher | The aif environment rule binds failures to the doctor: On ANY aif environment symptom… | .claude/skills/dispatcher/SKILL.md:34 |
| b10-dispatcher | Harness posture: cc-native-with-fallback with a documented CC-absent degradation (.claude/skills/dispatcher/SKILL.md:6 area) | .claude/skills/dispatcher/SKILL.md:6 |
| b10-dispatcher | - **USES:** the aif runtime-bridge primitives (REST dispatch, status endpoints) and /pipeline's launch table… | page-level (see page Anchors) |
| b10-dispatcher | - **ADAPTS:** the umbrella kickoffs' stage gates into an executable loop; the park taxonomy… | page-level (see page Anchors) |
| b10-dispatcher | - **ADDS:** the execution loop, harvest procedure, and stage-gate advance — planning/priority stay in… | page-level (see page Anchors) |
| b10-dispatcher | - Census family satellites: **H** (runtime-bridge — dispatch + review-state return channel). Companion: /aif-doctor… | page-level (see page Anchors) |
| b13-story | **Status:** shipped-beta | page-level (see page Anchors) |
| b13-story | **Ships to:** factory tier arm (GETFF_SKILLS_FACTORY, setup.d/lib.sh:63) | setup.d/lib.sh:63 |
| b13-story | **Fires at:** Claude Code skill auto-activation on recap triggers (story, recap, «расскажи что сделали», «по актам»),… | page-level (see page Anchors) |
| b13-story | The session-recap skill: # /story — session recap as a story (.claude/skills/story/SKILL.md:11) | .claude/skills/story/SKILL.md:11 |
| b13-story | It narrates the finished session as an engaging, plain-language story for the human —… | .claude/skills/story/SKILL.md:16-18 |
| b13-story | Its header pins it as the single SSOT for the story spec shared with… | .claude/skills/story/SKILL.md:8 |
| b13-story | Two steps (.claude/skills/story/SKILL.md:17 heading): first run the localized-instruction emitter !bash ${CLAUDE_SKILL_DIR}/helpers/emit-story-prompt.sh (.claude/skills/story/SKILL.md:20), which prints… | .claude/skills/story/SKILL.md:17, .claude/skills/story/SKILL.md:20, .claude/skills/story/SKILL.md:21-22, .claude/skills/story/SKILL.md:25-27 |
| b13-story | The spec is shared with the Stop-hook aif_msg_eot_branch_story branch (.claude/skills/story/SKILL.md:23) | .claude/skills/story/SKILL.md:23 |
| b13-story | Harness posture: cc-native-with-fallback — the !shell injection and Stop-hook auto-emission are CC-native; degradation is… | .claude/skills/story/SKILL.md:6 |
| b13-story | - **USES:** its own helpers/emit-story-prompt.sh (the localized spec emitter); the AIF_HOOK_LANG language convention. | page-level (see page Anchors) |
| b13-story | - **ADAPTS:** the Stop-hook end-of-turn branch (aif_msg_eot_branch_story) — same spec, two delivery moments. | page-level (see page Anchors) |
| b13-story | - **ADDS:** the reader-facing story format (by-acts narration) as distinct from the per-turn diagnostic… | page-level (see page Anchors) |
| b13-story | - Census family satellites: none listed (—). | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | **Status:** shipped-beta | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | **Ships to:** factory tier arm (GETFF_SKILLS_FACTORY, setup.d/lib.sh:63) | setup.d/lib.sh:63 |
| b14-claude-glm-executor-handoff | **Fires at:** Claude Code skill auto-activation when an in-aif coordinator is about to dispatch to a… | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | The cross-model dispatch edge: Use when an in-aif Claude coordinator is about to dispatch… | .claude/skills/claude-glm-executor-handoff/SKILL.md:3 |
| b14-claude-glm-executor-handoff | Note the executor tier moved to **glm-5.3** since 2026-09-11 per the skill's own header… | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | The skill is A **thin adapter** for the narrow case where an in-aif Claude… | .claude/skills/claude-glm-executor-handoff/SKILL.md:13 |
| b14-claude-glm-executor-handoff | Sections: §0 when it fires (coordinator on Claude-family AND worker frontmatter model: GLM-family; a… | .claude/skills/claude-glm-executor-handoff/SKILL.md:15, .claude/skills/claude-glm-executor-handoff/SKILL.md:76, .claude/skills/claude-glm-executor-handoff/SKILL.md:112 |
| b14-claude-glm-executor-handoff | Harness posture: cc-only — requires an in-aif CC coordinator + aif runtime-bridge + GLM… | .claude/skills/claude-glm-executor-handoff/SKILL.md:6 |
| b14-claude-glm-executor-handoff | - **USES:** superpowers:subagent-driven-development (the dispatch loop it adapts); aif's per-agent model: frontmatter mechanics. | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | - **ADAPTS:** the orchestrator REPORT schema (owned by agents/orchestrator-worker-discipline.md, census C1) for GLM replies;… | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | - **ADDS:** the GLM-specific input-prompt contract, verified behavioural deltas (text-only I/O, reasoning_effort value-collapse, Anthropic-compat… | page-level (see page Anchors) |
| b14-claude-glm-executor-handoff | - Census family satellites: **H** (runtime-bridge). | page-level (see page Anchors) |
| b16-tool-bootstrapping | **Status:** shipped-beta | page-level (see page Anchors) |
| b16-tool-bootstrapping | **Ships to:** every tier — copied by setup.d/10-skills.sh:41 outside the tier-arm variables | setup.d/10-skills.sh:41 |
| b16-tool-bootstrapping | **Fires at:** Claude Code skill auto-activation on tool-bootstrap triggers (MCP installation, tool detection, package.json deps changed,… | page-level (see page Anchors) |
| b16-tool-bootstrapping | Tool Bootstrapping — project-aware MCP/skill proposal discipline (.claude/skills/tool-bootstrapping/SKILL.md:8 heading): the six-rule loop that stops… | .claude/skills/tool-bootstrapping/SKILL.md:8, .claude/skills/tool-bootstrapping/SKILL.md:15 |
| b16-tool-bootstrapping | Description: Use when analysing project stack for MCP or skill recommendations. (.claude/skills/tool-bootstrapping/SKILL.md:3) | .claude/skills/tool-bootstrapping/SKILL.md:3 |
| b16-tool-bootstrapping | Six rules, one section each: Rule 1 Analyse stack (read package.json, .mcp.json, framework configs),… | .claude/skills/tool-bootstrapping/SKILL.md:27-29, .claude/skills/tool-bootstrapping/SKILL.md:35 |
| b16-tool-bootstrapping | The install pipeline it references is the AIF skills.sh flow: npx skills search →… | .claude/skills/tool-bootstrapping/SKILL.md:23 |
| b16-tool-bootstrapping | Harness posture: portable — prose + npx skills CLI; the deps-hash UserPromptSubmit hook is… | .claude/skills/tool-bootstrapping/SKILL.md:6 |
| b16-tool-bootstrapping | The copy that ships to consumers is the repo-root skills/tool-bootstrapping tree, copied with the… | .claude/skills/tool-bootstrapping/SKILL.md:11, setup.d/10-skills.sh:40-41 |
| b16-tool-bootstrapping | - **USES:** the AIF /aif stack-detection flow (SSOT #31 ADOPT, named in the skill… | page-level (see page Anchors) |
| b16-tool-bootstrapping | - **ADAPTS:** the closed-questions §13.25 discipline into a triggerable skill; the shipped twin under… | page-level (see page Anchors) |
| b16-tool-bootstrapping | - **ADDS:** the six-rule loop with its hard no-install-without-confirmation rule and the persistence rule… | page-level (see page Anchors) |
| b16-tool-bootstrapping | - Census family satellites: **A9** (MCP companion layer). Plugin/marketplace twin: census **I7**. | page-level (see page Anchors) |
| b17-aif | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b17-aif | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 name only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b17-aif | **Fires at:** Claude Code skill auto-activation (set up project, configure AI, what skills do I need) | page-level (see page Anchors) |
| b17-aif | The AI Factory project-setup entry skill | page-level (see page Anchors) |
| b17-aif | Its self-description: Set up agent context for a project. Analyzes tech stack, installs relevant… | .claude/skills/aif/SKILL.md:3 |
| b17-aif | It is the skill whose repeated setup produces the .claude/skills/aif* suite the rest of… | page-level (see page Anchors) |
| b17-aif | The skill's own workflow header is # AI Factory - Project Setup (.claude/skills/aif/SKILL.md:8), with… | .claude/skills/aif/SKILL.md:8, .claude/skills/aif/SKILL.md:16, .claude/skills/aif/SKILL.md:85, .claude/skills/aif/SKILL.md:119 |
| b17-aif | It takes a free-form project description as its argument (argument-hint: [project description], .claude/skills/aif/SKILL.md:4) | .claude/skills/aif/SKILL.md:4 |
| b17-aif | - **USES:** skills.sh as its skill-acquisition channel and MCP configuration (its own description, .claude/skills/aif/SKILL.md:3). | .claude/skills/aif/SKILL.md:3 |
| b17-aif | - **ADAPTS:** the generic installer-skill pattern to the project's detected stack. | page-level (see page Anchors) |
| b17-aif | - **ADDS:** the installed .claude/skills/aif-* operator suite itself — this page family (B17-B40) is… | page-level (see page Anchors) |
| b18-aif-architecture | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b18-aif-architecture | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b18-aif-architecture | **Fires at:** Claude Code skill auto-activation (which architecture, after /aif setup) | page-level (see page Anchors) |
| b18-aif-architecture | An architecture-guideline generator | page-level (see page Anchors) |
| b18-aif-architecture | Its description: Generate architecture guidelines for the project. Analyzes tech stack from DESCRIPTION.md, recommends… | .claude/skills/aif-architecture/SKILL.md:3 |
| b18-aif-architecture | The pattern is selectable via argument: argument-hint: [clean|ddd|microservices|monolith|layers] (.claude/skills/aif-architecture/SKILL.md:4) | .claude/skills/aif-architecture/SKILL.md:4 |
| b18-aif-architecture | A three-step workflow — ### Step 0: Load Config & Project Context (.claude/skills/aif-architecture/SKILL.md:15), ###… | .claude/skills/aif-architecture/SKILL.md:15, .claude/skills/aif-architecture/SKILL.md:67, .claude/skills/aif-architecture/SKILL.md:99, .claude/skills/aif-architecture/SKILL.md:108 |
| b18-aif-architecture | Model invocation stays enabled: disable-model-invocation: false (.claude/skills/aif-architecture/SKILL.md:6) | .claude/skills/aif-architecture/SKILL.md:6 |
| b18-aif-architecture | - **USES:** DESCRIPTION.md as its stack input and the AIF config loader (Step 0). | page-level (see page Anchors) |
| b18-aif-architecture | - **ADAPTS:** generic architecture-pattern guidance to the detected stack. | page-level (see page Anchors) |
| b18-aif-architecture | - **ADDS:** the .ai-factory/ARCHITECTURE.md artifact the other AIF workflow skills read. | page-level (see page Anchors) |
| b19-aif-best-practices | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b19-aif-best-practices | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b19-aif-best-practices | **Fires at:** Claude Code skill auto-activation (how should I name this, best practice for, clean code) | page-level (see page Anchors) |
| b19-aif-best-practices | A code-quality guidelines skill | page-level (see page Anchors) |
| b19-aif-best-practices | Its description: Code quality guidelines and best practices for writing clean, maintainable code. Covers… | .claude/skills/aif-best-practices/SKILL.md:3 |
| b19-aif-best-practices | It is advisory-only by tooling: allowed-tools: Read Glob Grep (.claude/skills/aif-best-practices/SKILL.md:5) — it cannot write | .claude/skills/aif-best-practices/SKILL.md:5 |
| b19-aif-best-practices | A reference document more than a procedure: # Best Practices Guide (.claude/skills/aif-best-practices/SKILL.md:9) with a… | .claude/skills/aif-best-practices/SKILL.md:9, .claude/skills/aif-best-practices/SKILL.md:35, .claude/skills/aif-best-practices/SKILL.md:46, .claude/skills/aif-best-practices/SKILL.md:86, .claude/skills/aif-best-practices/SKILL.md:146, .claude/skills/aif-best-practices/SKILL.md:193 |
| b19-aif-best-practices | An area can be requested directly: argument-hint: [naming|structure|errors|testing|review] (.claude/skills/aif-best-practices/SKILL.md:4) | .claude/skills/aif-best-practices/SKILL.md:4 |
| b19-aif-best-practices | - **USES:** nothing upstream — it is a static reference body. | page-level (see page Anchors) |
| b19-aif-best-practices | - **ADAPTS:** — | page-level (see page Anchors) |
| b19-aif-best-practices | - **ADDS:** the quality vocabulary later AIF review/verify passes lean on. | page-level (see page Anchors) |
| b2-ai-doc | **Status:** shipped-beta | page-level (see page Anchors) |
| b2-ai-doc | **Ships to:** core tier arm (GETFF_SKILLS_CORE, setup.d/lib.sh:61) | setup.d/lib.sh:61 |
| b2-ai-doc | **Fires at:** Claude Code skill auto-activation on authoring triggers (write a rule, author a skill, fix… | page-level (see page Anchors) |
| b2-ai-doc | The AI-doc authoring standard skill: Use when creating or fixing an AI-facing doc/rule/skill/agent in… | .claude/skills/ai-doc/SKILL.md:3 |
| b2-ai-doc | It is explicitly a thin wrapper, not a new method: Composes existing skills; does… | .claude/skills/ai-doc/SKILL.md:15, .claude/skills/ai-doc/SKILL.md:15-17 |
| b2-ai-doc | The ## The standard section carries the judgment calls the wrapper actually owns (.claude/skills/ai-doc/SKILL.md:23… | .claude/skills/ai-doc/SKILL.md:23, .claude/skills/ai-doc/SKILL.md:26 |
| b2-ai-doc | A Without this skill / With this skill pair closes the file (.claude/skills/ai-doc/SKILL.md:30,34) | .claude/skills/ai-doc/SKILL.md:30 |
| b2-ai-doc | Harness posture: portable (.claude/skills/ai-doc/SKILL.md:6) | .claude/skills/ai-doc/SKILL.md:6 |
| b2-ai-doc | - **USES:** upstream superpowers:writing-skills for authoring mechanics; anthropic-and-aif-residue.md loaded on demand for the residue… | SKILL.md:15-17 |
| b2-ai-doc | - **ADAPTS:** the doc-authority hierarchy and channel-selection rules the framework ships elsewhere; the wrapper… | page-level (see page Anchors) |
| b2-ai-doc | - **ADDS:** the repo-specific residue standard (context-hygiene, rule-as-test, AI-agnostic markers) that upstream authoring skills… | page-level (see page Anchors) |
| b2-ai-doc | - Census family satellites: **F** (rules corpus + generated-rule tooling) — the rules this… | page-level (see page Anchors) |
| b20-aif-build-automation | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b20-aif-build-automation | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b20-aif-build-automation | **Fires at:** Claude Code skill auto-activation (generate makefile, create taskfile, add justfile, setup mage, build automation) | page-level (see page Anchors) |
| b20-aif-build-automation | A build-file generator | page-level (see page Anchors) |
| b20-aif-build-automation | Its description (frontmatter block scalar): Analyze project and generate or enhance build automation file… | .claude/skills/aif-build-automation/SKILL.md:3-5 |
| b20-aif-build-automation | Detect-then-generate: ## Step 1: Detect Existing Build Files & Determine Mode (.claude/skills/aif-build-automation/SKILL.md:58) with an… | .claude/skills/aif-build-automation/SKILL.md:58, .claude/skills/aif-build-automation/SKILL.md:60, .claude/skills/aif-build-automation/SKILL.md:70, .claude/skills/aif-build-automation/SKILL.md:26, .claude/skills/aif-build-automation/SKILL.md:123 |
| b20-aif-build-automation | - **USES:** the project's own build files as its enhancement baseline (Step 1). | page-level (see page Anchors) |
| b20-aif-build-automation | - **ADAPTS:** four build-file dialects (make/task/just/mage) to one analysis pass. | page-level (see page Anchors) |
| b20-aif-build-automation | - **ADDS:** missing targets + best practices to an existing build file rather than… | page-level (see page Anchors) |
| b21-aif-ci | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b21-aif-ci | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b21-aif-ci | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-ci/SKILL.md:6) | .claude/skills/aif-ci/SKILL.md:6 |
| b21-aif-ci | A CI/CD pipeline generator | page-level (see page Anchors) |
| b21-aif-ci | Its description: Generate CI/CD pipeline (GitHub Actions / GitLab CI) with linting, static analysis,… | .claude/skills/aif-ci/SKILL.md:3 |
| b21-aif-ci | Target and mode come via argument: argument-hint: [github|gitlab] [--enhance] (.claude/skills/aif-ci/SKILL.md:4) | .claude/skills/aif-ci/SKILL.md:4 |
| b21-aif-ci | ### 1.1 Scan for Existing CI Configuration (.claude/skills/aif-ci/SKILL.md:61) feeds ### 1.2 Determine Mode (.claude/skills/aif-ci/SKILL.md:72),… | .claude/skills/aif-ci/SKILL.md:61, .claude/skills/aif-ci/SKILL.md:72, .claude/skills/aif-ci/SKILL.md:90, .claude/skills/aif-ci/SKILL.md:125, .claude/skills/aif-ci/SKILL.md:140 |
| b21-aif-ci | - **USES:** the existing CI configuration as its audit/enhance baseline (Step 1.4). | page-level (see page Anchors) |
| b21-aif-ci | - **ADAPTS:** one analysis pass to two CI dialects (GitHub Actions / GitLab CI). | page-level (see page Anchors) |
| b21-aif-ci | - **ADDS:** security tooling alongside lint/static-analysis/test jobs (its description, line 3). | page-level (see page Anchors) |
| b22-aif-commit | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b22-aif-commit | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b22-aif-commit | **Fires at:** Claude Code skill auto-activation (commit, save changes, create commit) | page-level (see page Anchors) |
| b22-aif-commit | A conventional-commit message generator | page-level (see page Anchors) |
| b22-aif-commit | Its description: Create conventional commit messages by analyzing staged changes. Generates semantic commit messages… | .claude/skills/aif-commit/SKILL.md:3 |
| b22-aif-commit | Its tooling is deliberately narrow: allowed-tools: Read Bash(git *) AskUserQuestion Questions (.claude/skills/aif-commit/SKILL.md:5) | .claude/skills/aif-commit/SKILL.md:5 |
| b22-aif-commit | A linear workflow (## Workflow, .claude/skills/aif-commit/SKILL.md:13) over the staged diff, followed by format rules… | .claude/skills/aif-commit/SKILL.md:13, .claude/skills/aif-commit/SKILL.md:82, .claude/skills/aif-commit/SKILL.md:92, .claude/skills/aif-commit/SKILL.md:116, .claude/skills/aif-commit/SKILL.md:170 |
| b22-aif-commit | An optional scope/context can be passed: argument-hint: [scope or context] (.claude/skills/aif-commit/SKILL.md:4) | .claude/skills/aif-commit/SKILL.md:4 |
| b22-aif-commit | - **USES:** git diff over the staged changes (its allowed-tools, line 5). | page-level (see page Anchors) |
| b22-aif-commit | - **ADAPTS:** the Conventional Commits spec to the project's own history conventions. | page-level (see page Anchors) |
| b22-aif-commit | - **ADDS:** the ask-before-commit behavior documented in its Behavior section. | page-level (see page Anchors) |
| b23-aif-dockerize | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b23-aif-dockerize | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b23-aif-dockerize | **Fires at:** Claude Code skill auto-activation (dockerize, add docker, docker compose) | page-level (see page Anchors) |
| b23-aif-dockerize | A Docker configuration generator | page-level (see page Anchors) |
| b23-aif-dockerize | Its description (frontmatter block scalar): Analyze project and generate Docker configuration: Dockerfile (multi-stage dev/prod),… | .claude/skills/aif-dockerize/SKILL.md:3-6 |
| b23-aif-dockerize | Same detect-then-generate shape as the other generators: context load (.claude/skills/aif-dockerize/SKILL.md:31), ### 1.1 Scan for… | .claude/skills/aif-dockerize/SKILL.md:31, .claude/skills/aif-dockerize/SKILL.md:66, .claude/skills/aif-dockerize/SKILL.md:80, .claude/skills/aif-dockerize/SKILL.md:98, .claude/skills/aif-dockerize/SKILL.md:155 |
| b23-aif-dockerize | - **USES:** the project's existing Docker files as its audit/enhance baseline (Step 1). | page-level (see page Anchors) |
| b23-aif-dockerize | - **ADAPTS:** one analysis pass to the four-file compose family it emits. | page-level (see page Anchors) |
| b23-aif-dockerize | - **ADDS:** a hardened production compose variant + production security audit (description, line 6). | page-level (see page Anchors) |
| b24-aif-docs | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b24-aif-docs | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b24-aif-docs | **Fires at:** Claude Code skill auto-activation (create docs, write documentation, update docs, generate readme, document project) | page-level (see page Anchors) |
| b24-aif-docs | A documentation generator | page-level (see page Anchors) |
| b24-aif-docs | Its description: Generate and maintain project documentation. Creates a lean README as a landing… | .claude/skills/aif-docs/SKILL.md:3 |
| b24-aif-docs | Takes a flag argument (argument-hint: [--web], .claude/skills/aif-docs/SKILL.md:4) | .claude/skills/aif-docs/SKILL.md:4 |
| b24-aif-docs | State-driven: ### Step 1: Determine Current State (.claude/skills/aif-docs/SKILL.md:93) including a scan for scattered markdown… | .claude/skills/aif-docs/SKILL.md:93, .claude/skills/aif-docs/SKILL.md:123, .claude/skills/aif-docs/SKILL.md:185, .claude/skills/aif-docs/SKILL.md:236, .claude/skills/aif-docs/SKILL.md:17 |
| b24-aif-docs | - **USES:** the configured docs directory from the AIF config (Step 0). | page-level (see page Anchors) |
| b24-aif-docs | - **ADAPTS:** existing scattered markdown as migration input (Step 1.1). | page-level (see page Anchors) |
| b24-aif-docs | - **ADDS:** the README-as-landing-page + topic-split docs structure. | page-level (see page Anchors) |
| b25-aif-evolve | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b25-aif-evolve | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b25-aif-evolve | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-evolve/SKILL.md:6) | .claude/skills/aif-evolve/SKILL.md:6 |
| b25-aif-evolve | A skill self-improvement pass | page-level (see page Anchors) |
| b25-aif-evolve | Its description: Self-improve AI Factory skills based on project context, accumulated patches, and codebase… | .claude/skills/aif-evolve/SKILL.md:3 |
| b25-aif-evolve | Target selection: argument-hint: '[skill-name or all]' (.claude/skills/aif-evolve/SKILL.md:4) | .claude/skills/aif-evolve/SKILL.md:4 |
| b25-aif-evolve | A six-step workflow under ## Workflow (.claude/skills/aif-evolve/SKILL.md:47): resolve target, ### Step 1: Collect Intelligence… | .claude/skills/aif-evolve/SKILL.md:47, .claude/skills/aif-evolve/SKILL.md:128, .claude/skills/aif-evolve/SKILL.md:228, .claude/skills/aif-evolve/SKILL.md:278, .claude/skills/aif-evolve/SKILL.md:329, .claude/skills/aif-evolve/SKILL.md:379 |
| b25-aif-evolve | Two guardrails are first-class: a ## Patch Consumption Policy (.claude/skills/aif-evolve/SKILL.md:23) and ## Critical: Never… | .claude/skills/aif-evolve/SKILL.md:23, .claude/skills/aif-evolve/SKILL.md:35 |
| b25-aif-evolve | - **USES:** the accumulated patches + skill-context corpus as its improvement input. | page-level (see page Anchors) |
| b25-aif-evolve | - **ADAPTS:** AIF's own installed skills (never built-ins — its Critical section). | page-level (see page Anchors) |
| b25-aif-evolve | - **ADDS:** the stale-rule detection sweep over skill-context files. | page-level (see page Anchors) |
| b26-aif-explore | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b26-aif-explore | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b26-aif-explore | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-explore/SKILL.md:6) | .claude/skills/aif-explore/SKILL.md:6 |
| b26-aif-explore | An exploration-mode skill | page-level (see page Anchors) |
| b26-aif-explore | Its description: Enter explore mode - a thinking partner for exploring ideas, investigating problems,… | .claude/skills/aif-explore/SKILL.md:3 |
| b26-aif-explore | It declares a stance rather than a pipeline: ## The Stance (.claude/skills/aif-explore/SKILL.md:37) | .claude/skills/aif-explore/SKILL.md:37 |
| b26-aif-explore | Config load (.claude/skills/aif-explore/SKILL.md:15) and ## Artifact Ownership (.claude/skills/aif-explore/SKILL.md:29) frame a mode that branches on… | .claude/skills/aif-explore/SKILL.md:15, .claude/skills/aif-explore/SKILL.md:29, .claude/skills/aif-explore/SKILL.md:146, .claude/skills/aif-explore/SKILL.md:153, .claude/skills/aif-explore/SKILL.md:186, .claude/skills/aif-explore/SKILL.md:213 |
| b26-aif-explore | - **USES:** the AIF config + plan state on disk. | page-level (see page Anchors) |
| b26-aif-explore | - **ADAPTS:** — | page-level (see page Anchors) |
| b26-aif-explore | - **ADDS:** a paths.research artifact whose Active Summary is declared input for /aif-plan (B32). | page-level (see page Anchors) |
| b27-aif-fix | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b27-aif-fix | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b27-aif-fix | **Fires at:** Claude Code skill auto-activation (fix bug, debug this, something is broken, pasted error message) | page-level (see page Anchors) |
| b27-aif-fix | The AIF bug-fix workflow | page-level (see page Anchors) |
| b27-aif-fix | Its description: Fix a specific bug or problem in the codebase. Supports two modes… | .claude/skills/aif-fix/SKILL.md:3 |
| b27-aif-fix | Its allowed-tools include the handoff MCP tools (mcp__handoff__handoff_sync_status, …, .claude/skills/aif-fix/SKILL.md:5), so it operates in… | .claude/skills/aif-fix/SKILL.md:5 |
| b27-aif-fix | A Handoff-mode detection prelude (### Step 0 (pre): Detect Handoff Mode, .claude/skills/aif-fix/SKILL.md:15) precedes config… | .claude/skills/aif-fix/SKILL.md:15, .claude/skills/aif-fix/SKILL.md:64, .claude/skills/aif-fix/SKILL.md:135, .claude/skills/aif-fix/SKILL.md:168, .claude/skills/aif-fix/SKILL.md:189 |
| b27-aif-fix | - **USES:** an existing FIX_PLAN.md when invoked without arguments (description, line 3). | page-level (see page Anchors) |
| b27-aif-fix | - **ADAPTS:** the Handoff MCP sync surface used by the AIF implement/plan skills. | page-level (see page Anchors) |
| b27-aif-fix | - **ADDS:** the plan-first/immediate mode split with mandatory test-coverage and logging suggestions. | page-level (see page Anchors) |
| b28-aif-grounded | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b28-aif-grounded | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b28-aif-grounded | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-grounded/SKILL.md:6) | .claude/skills/aif-grounded/SKILL.md:6 |
| b28-aif-grounded | An answer-reliability gate | page-level (see page Anchors) |
| b28-aif-grounded | Its description: Reliability gate for answers. Forces evidence-based reasoning, explicit uncertainty, and “insufficient information”… | .claude/skills/aif-grounded/SKILL.md:3 |
| b28-aif-grounded | It is small by suite standards — 117 lines total | page-level (see page Anchors) |
| b28-aif-grounded | A five-step workflow: ### Step 1: Classify the request (.claude/skills/aif-grounded/SKILL.md:49), ### Step 2: Define… | .claude/skills/aif-grounded/SKILL.md:49, .claude/skills/aif-grounded/SKILL.md:56, .claude/skills/aif-grounded/SKILL.md:65, .claude/skills/aif-grounded/SKILL.md:71, .claude/skills/aif-grounded/SKILL.md:77, .claude/skills/aif-grounded/SKILL.md:112 |
| b28-aif-grounded | - **USES:** skill-context loading at Step 0 (.claude/skills/aif-grounded/SKILL.md:27). | .claude/skills/aif-grounded/SKILL.md:27 |
| b28-aif-grounded | - **ADAPTS:** — | page-level (see page Anchors) |
| b28-aif-grounded | - **ADDS:** the strict output-format + confidence-gate contract for high-stakes answers. | page-level (see page Anchors) |
| b29-aif-implement | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b29-aif-implement | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b29-aif-implement | **Fires at:** Claude Code skill auto-activation (implement, start coding, execute plan, continue implementation) | page-level (see page Anchors) |
| b29-aif-implement | The AIF plan-execution loop | page-level (see page Anchors) |
| b29-aif-implement | Its description: Execute implementation tasks from the current plan. Works through tasks sequentially, marks… | .claude/skills/aif-implement/SKILL.md:3 |
| b29-aif-implement | It is the largest skill in the suite — 964 lines total | page-level (see page Anchors) |
| b29-aif-implement | Argument surface: argument-hint: '[--list] [--without-plan <description>] [@plan-file] [task-id or status]' (.claude/skills/aif-implement/SKILL.md:4) | .claude/skills/aif-implement/SKILL.md:4 |
| b29-aif-implement | The workflow is plan-file-driven: Handoff-mode detection (.claude/skills/aif-implement/SKILL.md:15), current-state check (.claude/skills/aif-implement/SKILL.md:43), a --list mode (.claude/skills/aif-implement/SKILL.md:66),… | .claude/skills/aif-implement/SKILL.md:15, .claude/skills/aif-implement/SKILL.md:43, .claude/skills/aif-implement/SKILL.md:66, .claude/skills/aif-implement/SKILL.md:93, .claude/skills/aif-implement/SKILL.md:238, .claude/skills/aif-implement/SKILL.md:398 |
| b29-aif-implement | It syncs with the handoff MCP tools (allowed-tools, .claude/skills/aif-implement/SKILL.md:5) | .claude/skills/aif-implement/SKILL.md:5 |
| b29-aif-implement | - **USES:** plan files produced by /aif-plan (B32) or fix plans from /aif-fix (B27). | page-level (see page Anchors) |
| b29-aif-implement | - **ADAPTS:** the handoff MCP task surface when a Handoff task is linked. | page-level (see page Anchors) |
| b29-aif-implement | - **ADDS:** the inline --without-plan one-shot mode and resume/recovery reconciliation. | page-level (see page Anchors) |
| b30-aif-improve | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b30-aif-improve | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b30-aif-improve | **Fires at:** Claude Code skill auto-activation (improve plan, refine plan) | page-level (see page Anchors) |
| b30-aif-improve | A second-iteration plan refiner | page-level (see page Anchors) |
| b30-aif-improve | Its description: Refine and enhance an existing implementation plan with a second iteration. Re-analyzes… | .claude/skills/aif-improve/SKILL.md:3 |
| b30-aif-improve | Plan discovery (.claude/skills/aif-improve/SKILL.md:25, with its own --list at .claude/skills/aif-improve/SKILL.md:51) feeds ### Step 2: Deep… | .claude/skills/aif-improve/SKILL.md:25, .claude/skills/aif-improve/SKILL.md:51, .claude/skills/aif-improve/SKILL.md:172, .claude/skills/aif-improve/SKILL.md:209, .claude/skills/aif-improve/SKILL.md:245, .claude/skills/aif-improve/SKILL.md:250 |
| b30-aif-improve | - **USES:** plans from /aif-plan (B32) and /aif-fix (B27) as its input artifact. | page-level (see page Anchors) |
| b30-aif-improve | - **ADAPTS:** the same plans-directory conventions as its sibling skills. | page-level (see page Anchors) |
| b30-aif-improve | - **ADDS:** the deep-codebase-analysis pass that re-validates plan assumptions before execution. | page-level (see page Anchors) |
| b31-aif-loop | **Status:** shipped-beta (AIF suite) | page-level (see page Anchors) |
| b31-aif-loop | **Ships to:** clone — not in any getff consumer tier arm | page-level (see page Anchors) |
| b31-aif-loop | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-loop/SKILL.md:6) | .claude/skills/aif-loop/SKILL.md:6 |
| b31-aif-loop | A multi-iteration reflex loop | page-level (see page Anchors) |
| b31-aif-loop | Its description: Run a strict multi-iteration Reflex Loop with phases (PLAN, PRODUCE||PREPARE, EVALUATE, CRITIQUE,… | .claude/skills/aif-loop/SKILL.md:3 |
| b31-aif-loop | A persisted loop, not just a prompt pattern: a ## Persistence Contract (.claude/skills/aif-loop/SKILL.md:62) with… | .claude/skills/aif-loop/SKILL.md:62, .claude/skills/aif-loop/SKILL.md:75, .claude/skills/aif-loop/SKILL.md:151, .claude/skills/aif-loop/SKILL.md:82, .claude/skills/aif-loop/SKILL.md:4, .claude/skills/aif-loop/SKILL.md:144 |
| b31-aif-loop | - **USES:** a loop-state directory on disk (directories ensured at 1.1, .claude/skills/aif-loop/SKILL.md:138). | .claude/skills/aif-loop/SKILL.md:138 |
| b31-aif-loop | - **ADAPTS:** — | page-level (see page Anchors) |
| b31-aif-loop | - **ADDS:** resumable, aliased loop state — the persistence contract generic prompt-chaining lacks. | page-level (see page Anchors) |
| b32-aif-plan | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b32-aif-plan | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b32-aif-plan | **Fires at:** Claude Code skill auto-activation (plan, new feature, start feature, create tasks) | page-level (see page Anchors) |
| b32-aif-plan | Implementation planning skill | page-level (see page Anchors) |
| b32-aif-plan | Its self-description: Plan implementation for a feature or task. Two modes — fast (single… | .claude/skills/aif-plan/SKILL.md:3 |
| b32-aif-plan | The body defines the split: **Fast** – quick plan, no git branch, saves to… | .claude/skills/aif-plan/SKILL.md:14 |
| b32-aif-plan | It takes a mode plus subcommand flags as its argument (argument-hint: [fast | full]… | .claude/skills/aif-plan/SKILL.md:4 |
| b32-aif-plan | After a pre-step that detects Handoff mode, the workflow reaches ### Step 0: Load… | .claude/skills/aif-plan/SKILL.md:85, .claude/skills/aif-plan/SKILL.md:120 |
| b32-aif-plan | It then parses arguments and picks fast vs full at ### Step 0.2: Parse… | .claude/skills/aif-plan/SKILL.md:176, .claude/skills/aif-plan/SKILL.md:672 |
| b32-aif-plan | - **USES:** the project's skill-context override (.claude/skills/aif-plan/SKILL.md:120) and the resolved DESCRIPTION/ARCHITECTURE/roadmap artifacts read at… | .claude/skills/aif-plan/SKILL.md:120, .claude/skills/aif-plan/SKILL.md:85 |
| b32-aif-plan | - **ADAPTS:** the canonical plan template — Use the canonical template in references/TASK-FORMAT.md (Plan… | .claude/skills/aif-plan/SKILL.md:543 |
| b32-aif-plan | - **ADDS:** the fast/full mode split with optional --parallel worktree flow and --list/--cleanup subcommands… | .claude/skills/aif-plan/SKILL.md:4 |
| b33-aif-qa | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b33-aif-qa | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b33-aif-qa | **Fires at:** Claude Code skill auto-activation (test this, write test plan, what should I test, QA… | page-level (see page Anchors) |
| b33-aif-qa | QA workflow skill | page-level (see page Anchors) |
| b33-aif-qa | Its self-description: QA workflow for testing a feature or task implementation. Analyzes changes, produces… | .claude/skills/aif-qa/SKILL.md:3 |
| b33-aif-qa | The body restates it: Generates change summaries, produces test plans, and describes test scenarios… | .claude/skills/aif-qa/SKILL.md:11 |
| b33-aif-qa | The skill operates in three sequential modes. (.claude/skills/aif-qa/SKILL.md:15) — a ## Modes table maps… | .claude/skills/aif-qa/SKILL.md:15, .claude/skills/aif-qa/SKILL.md:22 |
| b33-aif-qa | Artifacts are saved per branch under a collision-resistant branch-slug (.claude/skills/aif-qa/SKILL.md:84), and the ## Critical… | .claude/skills/aif-qa/SKILL.md:84, .claude/skills/aif-qa/SKILL.md:186 |
| b33-aif-qa | - **USES:** the project's skill-context override — **Read .ai-factory/skill-context/aif-qa/SKILL.md** — MANDATORY if the file… | .claude/skills/aif-qa/SKILL.md:56 |
| b33-aif-qa | - **ADAPTS:** per-mode reference playbooks — references/CHANGE-SUMMARY.md, references/TEST-PLAN.md, references/TEST-CASES.md (.claude/skills/aif-qa/SKILL.md:121). | .claude/skills/aif-qa/SKILL.md:121 |
| b33-aif-qa | - **ADDS:** the strict sequential stage chain (change-summary → test-plan → test-cases, .claude/skills/aif-qa/SKILL.md:114) that… | .claude/skills/aif-qa/SKILL.md:114 |
| b34-aif-reference | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b34-aif-reference | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b34-aif-reference | **Fires at:** Claude Code skill auto-activation — the frontmatter names no Use when trigger phrases and… | .claude/skills/aif-reference/SKILL.md:9 |
| b34-aif-reference | Reference-creation skill | page-level (see page Anchors) |
| b34-aif-reference | Its frontmatter description is a block scalar: description: >- (.claude/skills/aif-reference/SKILL.md:3) whose text reads Create… | .claude/skills/aif-reference/SKILL.md:3, .claude/skills/aif-reference/SKILL.md:4 |
| b34-aif-reference | The body adds the reuse angle: Create structured knowledge references from external sources and… | .claude/skills/aif-reference/SKILL.md:18 |
| b34-aif-reference | A ## Argument Detection section (.claude/skills/aif-reference/SKILL.md:56) routes --update/URLs/file paths/list/show/delete/empty args to modes (Contains URLs… | .claude/skills/aif-reference/SKILL.md:56, .claude/skills/aif-reference/SKILL.md:61, .claude/skills/aif-reference/SKILL.md:168 |
| b34-aif-reference | An ## Integration With Other Skills section wires the output in: - /aif-plan and… | .claude/skills/aif-reference/SKILL.md:228 |
| b34-aif-reference | - **USES:** WebFetch/WebSearch for URL sources (1. Fetch the page using WebFetch and extract:,… | .claude/skills/aif-reference/SKILL.md:94, .claude/skills/aif-reference/SKILL.md:33 |
| b34-aif-reference | - **ADAPTS:** fetched page/document material into a fixed reference template (## Step 2: Synthesize… | .claude/skills/aif-reference/SKILL.md:120 |
| b34-aif-reference | - **ADDS:** a durable, indexed artifact — Check if <resolved references dir>/INDEX.md exists. Create… | .claude/skills/aif-reference/SKILL.md:187 |
| b35-aif-review | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b35-aif-review | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b35-aif-review | **Fires at:** Claude Code skill auto-activation (review code, check my code, review PR, is this code… | .claude/skills/aif-review/SKILL.md:6 |
| b35-aif-review | Code review skill | page-level (see page Anchors) |
| b35-aif-review | Its self-description: Perform code review on staged changes or a pull request. Checks for… | .claude/skills/aif-review/SKILL.md:3 |
| b35-aif-review | The body titles it Code Review Assistant (.claude/skills/aif-review/SKILL.md:9) and states the focus: Perform thorough… | .claude/skills/aif-review/SKILL.md:9, .claude/skills/aif-review/SKILL.md:4 |
| b35-aif-review | A ## Behavior section (.claude/skills/aif-review/SKILL.md:25) branches three ways: without arguments it reviews staged changes… | .claude/skills/aif-review/SKILL.md:25, .claude/skills/aif-review/SKILL.md:29-30 |
| b35-aif-review | Before finalizing findings it runs ## Context Gates (Read-Only) (.claude/skills/aif-review/SKILL.md:106) — read-only checks against… | .claude/skills/aif-review/SKILL.md:106 |
| b35-aif-review | Findings are then produced through a ## Review Checklist (.claude/skills/aif-review/SKILL.md:156) whose subsections are Correctness,… | .claude/skills/aif-review/SKILL.md:156, .claude/skills/aif-review/SKILL.md:158-190 |
| b35-aif-review | - **USES:** the project's skill-context override — **Read .ai-factory/skill-context/aif-review/SKILL.md** — MANDATORY if the file… | .claude/skills/aif-review/SKILL.md:136 |
| b35-aif-review | - **ADAPTS:** the generic review checklist to repo context via the read-only context gates… | page-level (see page Anchors) |
| b35-aif-review | - **ADDS:** the allowed-tools confinement to review verbs only — allowed-tools: Bash(git *) Bash(gh… | .claude/skills/aif-review/SKILL.md:5 |
| b36-aif-roadmap | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b36-aif-roadmap | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b36-aif-roadmap | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-roadmap/SKILL.md:6); its description names the ask-triggers (roadmap, project… | .claude/skills/aif-roadmap/SKILL.md:6, .claude/skills/aif-roadmap/SKILL.md:3 |
| b36-aif-roadmap | Roadmap skill | page-level (see page Anchors) |
| b36-aif-roadmap | Its self-description: Create or update a project roadmap with major milestones. Generates the configured… | .claude/skills/aif-roadmap/SKILL.md:3 |
| b36-aif-roadmap | The body titles it Roadmap - Strategic Project Planning (.claude/skills/aif-roadmap/SKILL.md:9): Create and maintain a… | .claude/skills/aif-roadmap/SKILL.md:9 |
| b36-aif-roadmap | Three modes under a ## Workflow header (.claude/skills/aif-roadmap/SKILL.md:13): ### Mode 1: Create Roadmap (First… | .claude/skills/aif-roadmap/SKILL.md:13, .claude/skills/aif-roadmap/SKILL.md:64, .claude/skills/aif-roadmap/SKILL.md:150, .claude/skills/aif-roadmap/SKILL.md:225, .claude/skills/aif-roadmap/SKILL.md:227 |
| b36-aif-roadmap | The artifact path is resolved, not hardcoded: Otherwise check if the resolved roadmap path… | .claude/skills/aif-roadmap/SKILL.md:58, .claude/skills/aif-roadmap/SKILL.md:277 |
| b36-aif-roadmap | - **USES:** the configured roadmap artifact from the project's config (resolved paths.roadmap, default .ai-factory/ROADMAP.md,… | .claude/skills/aif-roadmap/SKILL.md:58 |
| b36-aif-roadmap | - **ADAPTS:** one roadmap format to three lifecycle moments (create, update, automated progress check). | page-level (see page Anchors) |
| b36-aif-roadmap | - **ADDS:** nothing recorded in the census (satellites column «—»); within this stage its… | page-level (see page Anchors) |
| b37-aif-rules | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b37-aif-rules | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b37-aif-rules | **Fires at:** explicit invocation only — disable-model-invocation: true (.claude/skills/aif-rules/SKILL.md:6); its description names the ask-triggers (add rule,… | .claude/skills/aif-rules/SKILL.md:6, .claude/skills/aif-rules/SKILL.md:3 |
| b37-aif-rules | Rules-capture skill | page-level (see page Anchors) |
| b37-aif-rules | Its self-description: Add project-specific rules and conventions to the configured RULES.md artifact. Each invocation… | .claude/skills/aif-rules/SKILL.md:3 |
| b37-aif-rules | The body titles it AI Factory Rules - Project Conventions (.claude/skills/aif-rules/SKILL.md:9) and restates the… | .claude/skills/aif-rules/SKILL.md:9 |
| b37-aif-rules | A ## Rules Hierarchy section (.claude/skills/aif-rules/SKILL.md:13) fixes the first tier of a three-level rules… | .claude/skills/aif-rules/SKILL.md:13, .claude/skills/aif-rules/SKILL.md:15, .claude/skills/aif-rules/SKILL.md:18 |
| b37-aif-rules | Under ## Workflow (.claude/skills/aif-rules/SKILL.md:34) three add modes follow: ### Mode A: Direct Add (.claude/skills/aif-rules/SKILL.md:78,… | .claude/skills/aif-rules/SKILL.md:34, .claude/skills/aif-rules/SKILL.md:78, .claude/skills/aif-rules/SKILL.md:88, .claude/skills/aif-rules/SKILL.md:109, .claude/skills/aif-rules/SKILL.md:208, .claude/skills/aif-rules/SKILL.md:219 |
| b37-aif-rules | - **USES:** the configured rules artifact from the project's config (default .ai-factory/RULES.md) — the… | page-level (see page Anchors) |
| b37-aif-rules | - **ADAPTS:** free-form operator instructions into the hierarchy's axiom tier (short, flat, hard-requirement form). | page-level (see page Anchors) |
| b37-aif-rules | - **ADDS:** nothing recorded in the census (satellites column «—»); within this stage its… | page-level (see page Anchors) |
| b38-aif-rules-check | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b38-aif-rules-check | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b38-aif-rules-check | **Fires at:** the use-case its description names — a dedicated project-rules check without a full review… | .claude/skills/aif-rules-check/SKILL.md:3, .claude/skills/aif-rules-check/SKILL.md:4, .claude/skills/aif-rules-check/SKILL.md:6 |
| b38-aif-rules-check | Read-only rules-compliance gate | page-level (see page Anchors) |
| b38-aif-rules-check | Its self-description: Run a standalone read-only rules compliance gate against changed files or a… | .claude/skills/aif-rules-check/SKILL.md:3 |
| b38-aif-rules-check | The body titles it Rules Compliance Gate (.claude/skills/aif-rules-check/SKILL.md:13); frontmatter metadata tags it category: quality,… | .claude/skills/aif-rules-check/SKILL.md:13, .claude/skills/aif-rules-check/SKILL.md:8-10 |
| b38-aif-rules-check | Under ## Step 3: Evaluate Rules (.claude/skills/aif-rules-check/SKILL.md:138) it evaluates the loaded rule sources against… | .claude/skills/aif-rules-check/SKILL.md:138, .claude/skills/aif-rules-check/SKILL.md:113, .claude/skills/aif-rules-check/SKILL.md:48 |
| b38-aif-rules-check | The boundary is explicit: ## Step 4: Read-Only Boundary (.claude/skills/aif-rules-check/SKILL.md:154) — This command is… | .claude/skills/aif-rules-check/SKILL.md:154, .claude/skills/aif-rules-check/SKILL.md:156, .claude/skills/aif-rules-check/SKILL.md:159 |
| b38-aif-rules-check | - **USES:** the project's skill-context override — **Read .ai-factory/skill-context/aif-rules-check/SKILL.md** - MANDATORY if the file… | .claude/skills/aif-rules-check/SKILL.md:50 |
| b38-aif-rules-check | - **ADAPTS:** the axioms produced by [B37](/docs/reference/b37-aif-rules) into a per-change evaluation pass without any… | page-level (see page Anchors) |
| b38-aif-rules-check | - **ADDS:** the read-only gate posture itself — evaluate and suggest, never edit (.claude/skills/aif-rules-check/SKILL.md:154-156). | .claude/skills/aif-rules-check/SKILL.md:154-156 |
| b39-aif-security-checklist | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b39-aif-security-checklist | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b39-aif-security-checklist | **Fires at:** Claude Code skill auto-activation (is this secure, security check, vulnerability) or explicit /aif-security-checklist [auth|injection|xss|csrf|secrets|api|infra|prompt-injection|race-condition|ignore… | .claude/skills/aif-security-checklist/SKILL.md:4, .claude/skills/aif-security-checklist/SKILL.md:6 |
| b39-aif-security-checklist | Security-audit skill | page-level (see page Anchors) |
| b39-aif-security-checklist | Its self-description: Security audit checklist based on OWASP Top 10 and best practices. Covers… | .claude/skills/aif-security-checklist/SKILL.md:3 |
| b39-aif-security-checklist | The body titles it Security Checklist (.claude/skills/aif-security-checklist/SKILL.md:9): Comprehensive security checklist based on OWASP Top… | .claude/skills/aif-security-checklist/SKILL.md:9, .claude/skills/aif-security-checklist/SKILL.md:11 |
| b39-aif-security-checklist | A ## Quick Reference section (.claude/skills/aif-security-checklist/SKILL.md:13) enumerates the category subcommands, one per OWASP area… | .claude/skills/aif-security-checklist/SKILL.md:13, .claude/skills/aif-security-checklist/SKILL.md:23 |
| b39-aif-security-checklist | Before any audit it honors an ignore list: ## Ignored Items (SECURITY.md) (.claude/skills/aif-security-checklist/SKILL.md:37) —… | .claude/skills/aif-security-checklist/SKILL.md:37, .claude/skills/aif-security-checklist/SKILL.md:39 |
| b39-aif-security-checklist | ## Quick Automated Audit (.claude/skills/aif-security-checklist/SKILL.md:127) runs the automated script, and ## Machine-Readable Gate Result… | .claude/skills/aif-security-checklist/SKILL.md:127, .claude/skills/aif-security-checklist/SKILL.md:145, .claude/skills/aif-security-checklist/SKILL.md:152 |
| b39-aif-security-checklist | - **USES:** the project's SECURITY.md as its ignore-list contract (resolved path, default .ai-factory/SECURITY.md, .claude/skills/aif-security-checklist/SKILL.md:39). | .claude/skills/aif-security-checklist/SKILL.md:39 |
| b39-aif-security-checklist | - **ADAPTS:** the OWASP Top 10 (2021) checklist into category-scoped subcommands over the current… | page-level (see page Anchors) |
| b39-aif-security-checklist | - **ADDS:** the machine-readable aif-gate-result JSON block (.claude/skills/aif-security-checklist/SKILL.md:145) that turns a prose audit into… | .claude/skills/aif-security-checklist/SKILL.md:145 |
| b40-aif-skill-generator | **Status:** shipped-beta (AIF suite, vendored into the clone) | page-level (see page Anchors) |
| b40-aif-skill-generator | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b40-aif-skill-generator | **Fires at:** Claude Code skill auto-activation (creating new skills, generating custom slash commands, building reusable AI… | .claude/skills/aif-skill-generator/SKILL.md:4, .claude/skills/aif-skill-generator/SKILL.md:6 |
| b40-aif-skill-generator | Skill-generation skill | page-level (see page Anchors) |
| b40-aif-skill-generator | Its self-description: Generate professional Agent Skills for AI agents. Creates complete skill packages with… | .claude/skills/aif-skill-generator/SKILL.md:3 |
| b40-aif-skill-generator | The body titles it Skill Generator (.claude/skills/aif-skill-generator/SKILL.md:13); frontmatter metadata tags it category: developer-tools, version… | .claude/skills/aif-skill-generator/SKILL.md:13, .claude/skills/aif-skill-generator/SKILL.md:8-10 |
| b40-aif-skill-generator | Its defining constraint is ## CRITICAL: Security Scanning (.claude/skills/aif-skill-generator/SKILL.md:39): **Every skill MUST be scanned… | .claude/skills/aif-skill-generator/SKILL.md:39, .claude/skills/aif-skill-generator/SKILL.md:41, .claude/skills/aif-skill-generator/SKILL.md:43 |
| b40-aif-skill-generator | The scan is ### Mandatory Two-Level Scan (.claude/skills/aif-skill-generator/SKILL.md:52) — Security checks happen on **two… | .claude/skills/aif-skill-generator/SKILL.md:52, .claude/skills/aif-skill-generator/SKILL.md:54, .claude/skills/aif-skill-generator/SKILL.md:56 |
| b40-aif-skill-generator | Modes are detected from the invocation: ## Argument Detection (.claude/skills/aif-skill-generator/SKILL.md:145) — Before starting the… | .claude/skills/aif-skill-generator/SKILL.md:145, .claude/skills/aif-skill-generator/SKILL.md:297 |
| b40-aif-skill-generator | - **USES:** npx skills in its allowed-tools (Bash(npx skills *), .claude/skills/aif-skill-generator/SKILL.md:5) as its package… | .claude/skills/aif-skill-generator/SKILL.md:5, .claude/skills/aif-skill-generator/SKILL.md:56 |
| b40-aif-skill-generator | - **ADAPTS:** the Agent Skills specification into generated, validated packages for this repo's harness. | page-level (see page Anchors) |
| b40-aif-skill-generator | - **ADDS:** the anti-manipulation hardening itself — the two-level scan and the rule that… | .claude/skills/aif-skill-generator/SKILL.md:39-41 |
| b41-self-reflection | **Status:** shipped-beta (framework-native skill, tracked in the repo) | page-level (see page Anchors) |
| b41-self-reflection | **Ships to:** clone — not in any getff consumer tier arm (setup.d/lib.sh:61-63 names only the core/env+/factory… | setup.d/lib.sh:61-63 |
| b41-self-reflection | **Fires at:** skill auto-activation on the description's trigger list — «правило», «принцип», discipline/process/meta wording, forward check,… | .claude/skills/self-reflection/SKILL.md:3 |
| b41-self-reflection | A recommendation-discipline gate | page-level (see page Anchors) |
| b41-self-reflection | Its self-description: Use when introducing or extending a rule, principle, pattern, methodology, discipline, or… | .claude/skills/self-reflection/SKILL.md:3 |
| b41-self-reflection | The body titles it Self-reflection — recommendation discipline gate (.claude/skills/self-reflection/SKILL.md:8) and scopes its authority:… | .claude/skills/self-reflection/SKILL.md:8, .claude/skills/self-reflection/SKILL.md:10-11 |
| b41-self-reflection | It declares a harness posture: portable — prose self-application checklist over repo artefacts; no… | .claude/skills/self-reflection/SKILL.md:6 |
| b41-self-reflection | It exists because of recurrence: Three documented occurrences of the same shape in 2026:… | .claude/skills/self-reflection/SKILL.md:15 |
| b41-self-reflection | Its output contract requires that before closing a discipline-introducing recommendation — and in any… | .claude/skills/self-reflection/SKILL.md:45 |
| b41-self-reflection | The skill tracks its own enforcement surface: 5 active layers as of Wave 8.1… | .claude/skills/self-reflection/SKILL.md:108, .claude/skills/self-reflection/SKILL.md:121, .claude/skills/self-reflection/SKILL.md:125 |
| b41-self-reflection | - **USES:** .claude/rules/phase-research-coverage.md as the authority it points at (the §1.7 rule itself —… | .claude/skills/self-reflection/SKILL.md:11 |
| b41-self-reflection | - **ADAPTS:** the §1.7 forward/backward checklist into a portable prose skill with no harness… | .claude/skills/self-reflection/SKILL.md:6 |
| b41-self-reflection | - **ADDS:** the repo's first project-internal skill — its own backward-check records that directory… | .claude/skills/self-reflection/SKILL.md:124 |
| b7-orchestrator | **Status:** shipped-beta | page-level (see page Anchors) |
| b7-orchestrator | **Ships to:** env+ tier arm (GETFF_SKILLS_ENV, setup.d/lib.sh:62) | setup.d/lib.sh:62 |
| b7-orchestrator | **Fires at:** Claude Code skill auto-activation on orchestration triggers («оркестратор», delegate, umbrella, batch fixes, task decomposing… | page-level (see page Anchors) |
| b7-orchestrator | The operator-side orchestration workflow, titled Orchestrator — the senior coordinates, juniors execute and verify… | .claude/skills/orchestrator/SKILL.md:15 |
| b7-orchestrator | Its frontmatter description is a block scalar (.claude/skills/orchestrator/SKILL.md:3), with the trigger vocabulary in a… | .claude/skills/orchestrator/SKILL.md:3 |
| b7-orchestrator | The skill is authoritative for the operator-side orchestration workflow — the Mode A/B dispatch… | .claude/skills/orchestrator/SKILL.md:17-19 |
| b7-orchestrator | The 480-line skill is organized as a phase sequence over a shared vocabulary: | page-level (see page Anchors) |
| b7-orchestrator | - **Dispatch channels:** Mode A (inline Agent on Opus) is the default; Mode B… | .claude/skills/orchestrator/SKILL.md:92 |
| b7-orchestrator | - **Task-size triage:** Task size picks the mechanism (small → the senior's own Edit,… | .claude/skills/orchestrator/SKILL.md:57 |
| b7-orchestrator | - **Cross-session dispatch:** worktree by default (.claude/skills/orchestrator/SKILL.md:139), with in-session sub-agent isolation via the Agent… | .claude/skills/orchestrator/SKILL.md:139 |
| b7-orchestrator | - **Quota monitoring:** a cross-cutting rule active from Phase 3 with zones, responses, reset… | .claude/skills/orchestrator/SKILL.md:187 |
| b7-orchestrator | - **Phase -1:** cold self-review of a kickoff before dispatch (.claude/skills/orchestrator/SKILL.md:225 heading). | .claude/skills/orchestrator/SKILL.md:225 |
| b7-orchestrator | Harness posture: cc-native-with-fallback — Agent-tool subagent dispatch is portable; Skill-tool invocation degrades to direct… | .claude/skills/orchestrator/SKILL.md:6 |
| b7-orchestrator | - **USES:** superpowers:subagent-driven-development for the executor loop; superpowers:using-git-worktrees for isolation mechanics; channel definitions in… | SKILL.md:17 |
| b7-orchestrator | - **ADAPTS:** the portable worker-discipline subset that travels into aif containers — packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md (named… | SKILL.md:17 |
| b7-orchestrator | - **ADDS:** the Mode A/B choice rule, quota zones, Phase -1 dual-review, and Queue-mode… | page-level (see page Anchors) |
| b7-orchestrator | - Census family satellites: **A4** (installer tiers/lanes context). | page-level (see page Anchors) |
| b9-reviewer | **Status:** shipped-beta | page-level (see page Anchors) |
| b9-reviewer | **Ships to:** env+ tier arm (GETFF_SKILLS_ENV, setup.d/lib.sh:62) | setup.d/lib.sh:62 |
| b9-reviewer | **Fires at:** Claude Code skill auto-activation on review-ask triggers («проверь», «ревью», «вердикт», is this correct?, verify… | page-level (see page Anchors) |
| b9-reviewer | The interactive review-session skill: You are the orchestrator's interactive QA partner: they build →… | .claude/skills/reviewer/SKILL.md:21 |
| b9-reviewer | Its description scopes the deliverable as a GO/REVISE/STOP verdict or a verified answer, not… | .claude/skills/reviewer/SKILL.md:3 |
| b9-reviewer | The header pins what it layers over: reviewer-discipline role rules and the severity contract… | .claude/skills/reviewer/SKILL.md:9 |
| b9-reviewer | Evidence discipline is explicit: claims are verified through tools (file:line quotes, real command runs),… | .claude/skills/reviewer/SKILL.md:22-23 |
| b9-reviewer | The ## Modes section (.claude/skills/reviewer/SKILL.md:25) defines at least Question mode — answer YES /… | .claude/skills/reviewer/SKILL.md:25 |
| b9-reviewer | A ## Verdict shape (severity contract binding) section (.claude/skills/reviewer/SKILL.md:42) binds output to the severity… | .claude/skills/reviewer/SKILL.md:42 |
| b9-reviewer | Harness posture: portable — prose review protocol over file reads + git (.claude/skills/reviewer/SKILL.md:6) | .claude/skills/reviewer/SKILL.md:6 |
| b9-reviewer | - **USES:** .claude/rules/reviewer-discipline.md (role separation + severity contract) — layered over, not re-described (SKILL.md:9… | SKILL.md:9 |
| b9-reviewer | - **ADAPTS:** the reviewer role for interactive sessions, as distinct from the dispatched cold… | page-level (see page Anchors) |
| b9-reviewer | - **ADDS:** the session choreography — modes, economy defaults, verdict output shape — plus… | page-level (see page Anchors) |
| b9-reviewer | - Census family satellites: **C19** (shipped-agent-liveness-prober — the probe class that exercises shipped agents)… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | **Status:** shipped-beta | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | **Ships to:** npm lane, --profile factory only (or legacy --with-aif-suite; an existing copy is refreshed in… | setup.d/20-agents.sh:39 |
| c1-orchestrator-worker-discipline | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | The portable worker/orchestrator prompt carried into aif dispatches: > **Authoritative for:** orchestrator-worker discipline for… | agents/orchestrator-worker-discipline.md:9 |
| c1-orchestrator-worker-discipline | Scope is deliberately condensed: > **NOT authoritative for:** project goal — see consumer's README.md.… | agents/orchestrator-worker-discipline.md:10 |
| c1-orchestrator-worker-discipline | Entry assumption: You are a Claude Code agent dispatched into a project via runtime-bridge/dispatch.ts.… | agents/orchestrator-worker-discipline.md:17 |
| c1-orchestrator-worker-discipline | - REPORT on completion: ## REPORT schema (mandatory on task completion) (agents/orchestrator-worker-discipline.md:26), status vocabulary… | agents/orchestrator-worker-discipline.md:26, agents/orchestrator-worker-discipline.md:32 |
| c1-orchestrator-worker-discipline | - Forks: ## Park-vs-proceed contract (agents/orchestrator-worker-discipline.md:41) — park via - Run: npx tsx packages/runtime-bridge/src/cli/park.ts… | agents/orchestrator-worker-discipline.md:41, agents/orchestrator-worker-discipline.md:46 |
| c1-orchestrator-worker-discipline | - Judgment-call blocks use the advisor-consult sub-form inside the existing BLOCKER field (line 57:… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | - Stage gates: ## Stage-gate check (agents/orchestrator-worker-discipline.md:97) — Before starting Stage N+1 work, verify… | agents/orchestrator-worker-discipline.md:97 |
| c1-orchestrator-worker-discipline | - When the kickoff asks for planning or review, two extra layers attach: ##… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | - **USES:** the runtime-bridge dispatch surface it is read before (line 17, quoted above)… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | - **ADAPTS:** night-mode's advisor pattern for non-overnight dispatch — line 91 carries the verbatim… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | - **ADDS:** the worker-side REPORT/park/stage-gate grammar plus the advisor-consult routing table (lines 76-81) and… | page-level (see page Anchors) |
| c1-orchestrator-worker-discipline | - Census family satellites: **B10** (dispatcher — the operator-side loop whose dispatches this prompt… | page-level (see page Anchors) |
| c10-review-sidecar | **Status:** shipped-beta | page-level (see page Anchors) |
| c10-review-sidecar | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c10-review-sidecar | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c10-review-sidecar | > **Authoritative for:** review-sidecar sub-agent prompt — adversarial diff review as external reviewer; reporting-only.… | agents/review-sidecar.md:9 |
| c10-review-sidecar | The seat is memory-free by construction: You are reviewing this diff as if you… | agents/review-sidecar.md:19 |
| c10-review-sidecar | It is the formalization of the **two-AI review pattern**: one model writes, a different… | agents/review-sidecar.md:23 |
| c10-review-sidecar | The install story is the collision-resolution case: # - review-sidecar — still collides with… | setup.d/20-agents.sh:15-17, setup.d/20-agents.sh:22 |
| c10-review-sidecar | A plugin twin at plugin/agents/review-sidecar.md is a generated byte-identical copy for the plugin marketplace… | page-level (see page Anchors) |
| c10-review-sidecar | - Anti-tautology content still reaches AIF's aif-review pipeline without overwriting AIF's agent — via… | agents/review-sidecar.md:13-17, setup.d/20-agents.sh:58 |
| c10-review-sidecar | - ## What to look for (line 29) — eight categories: ### 1. Tautological… | page-level (see page Anchors) |
| c10-review-sidecar | - The tautology heuristic: **Heuristic:** for each expect(...) in the diff, ask if I… | agents/review-sidecar.md:61 |
| c10-review-sidecar | - Severity: - **BLOCKER** — security/correctness/data integrity (allows silent breakage; e.g., tautological test on… | page-level (see page Anchors) |
| c10-review-sidecar | - Final verdict: ## Two-AI Review Summary with BLOCK MERGE — fix BLOCKER before… | page-level (see page Anchors) |
| c10-review-sidecar | - **USES:** the severity contract + triage rubric from .claude/rules/reviewer-discipline.md §6/§6.1 (lines 158-160). | page-level (see page Anchors) |
| c10-review-sidecar | - **ADAPTS:** itself into two other channels without losing the SSOT — the plugin… | page-level (see page Anchors) |
| c10-review-sidecar | - **ADDS:** the eight-category anti-tautology catalogue and the two-AI summary verdict — the diff-correctness… | agents/compliance-verifier.md:139 |
| c10-review-sidecar | - Census family satellites: **C22** (the aif-review skill-context override — census E16 records the… | page-level (see page Anchors) |
| c11-memory-codification-auditor | **Status:** shipped-beta | page-level (see page Anchors) |
| c11-memory-codification-auditor | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c11-memory-codification-auditor | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c11-memory-codification-auditor | > **Authoritative for:** memory-codification-auditor sub-agent prompt — semantic triage of user-scope agent-memory entries …… | agents/memory-codification-auditor.md:17-18 |
| c11-memory-codification-auditor | The gap it fills: a deterministic grep can flag entries lacking a codification pointer,… | agents/memory-codification-auditor.md:22 |
| c11-memory-codification-auditor | - Why the agent exists at all: User-scope memory (~/.claude/projects/<slug>/memory/*.md) lives **outside the repo… | agents/memory-codification-auditor.md:30 |
| c11-memory-codification-auditor | - ## Input (line 32): Read every feedback_*.md and project_*.md entry (these are the… | agents/memory-codification-auditor.md:40 |
| c11-memory-codification-auditor | - ## The triage test (per memory-codification rule §2) (line 42): For each entry,… | agents/memory-codification-auditor.md:44 |
| c11-memory-codification-auditor | - Verdicts: | **CODIFY** | Durable behavioural rule: always/never X, when Y do Z,… | page-level (see page Anchors) |
| c11-memory-codification-auditor | - ## Method (no prose-only findings — per ai-laziness-traps.md T3) (line 52): 1. Enumerate… | page-level (see page Anchors) |
| c11-memory-codification-auditor | - Output grammar (line 59): POPULATION: <M> entries reviewed of <total> (coverage %) (line… | page-level (see page Anchors) |
| c11-memory-codification-auditor | - **USES:** .claude/rules/memory-codification.md — the SSOT discipline (line 18: > [.claude/rules/memory-codification.md](../.claude/rules/memory-codification.md) (SSOT).). | page-level (see page Anchors) |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:2 — name: memory-codification-auditor | agents/memory-codification-auditor.md:2 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:3 — description: Audits user-scope agent memory for durable conventions that live only… | agents/memory-codification-auditor.md:3 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:17 — > **Authoritative for:** memory-codification-auditor sub-agent prompt — semantic triage of user-scope… | agents/memory-codification-auditor.md:17 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:30 — User-scope memory (~/.claude/projects/<slug>/memory/*.md) lives **outside the repo and outside CI by… | agents/memory-codification-auditor.md:30 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:32 — ## Input | agents/memory-codification-auditor.md:32 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:42 — ## The triage test (per memory-codification rule §2) | agents/memory-codification-auditor.md:42 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:44 — For each entry, ask: **would a fresh session on a different… | agents/memory-codification-auditor.md:44 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:52 — ## Method (no prose-only findings — per ai-laziness-traps.md T3) | agents/memory-codification-auditor.md:52 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:59 — ## Output format | agents/memory-codification-auditor.md:59 |
| c11-memory-codification-auditor | - agents/memory-codification-auditor.md:62 — POPULATION: <M> entries reviewed of <total> (coverage %) | agents/memory-codification-auditor.md:62 |
| c11-memory-codification-auditor | - setup.d/20-agents.sh:24 — for f in $PKG_ROOT/agents/*.md; do | setup.d/20-agents.sh:24 |
| c11-memory-codification-auditor | All anchors at framework pin b069c59328aa8e08671d3a19fd25efa618dfc1c5 (fetched 2026-09-11 from artyhoo/getff staging; ancestry of census… | page-level (see page Anchors) |
| c13-rule-test-author | **Status:** shipped-beta | page-level (see page Anchors) |
| c13-rule-test-author | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c13-rule-test-author | **Fires at:** dispatched as a Claude Code sub-agent | page-level (see page Anchors) |
| c13-rule-test-author | Sub-agent that writes or repairs the **firing test material** for a rule the framework… | agents/rule-test-author.md:22 |
| c13-rule-test-author | Frontmatter scope: material for an EXISTING rule, verified without re-running the full research pass;… | agents/rule-test-author.md:9 |
| c13-rule-test-author | - **Edit surface.** npm lane: the negative-test entry of a rule in .ai-factory/synthesizer-output/rules-manifest-additions.json; astgrep/ruff… | agents/rule-test-author.md:28 |
| c13-rule-test-author | - **Never the rule.** You NEVER edit the emitted rule artifact — it is… | agents/rule-test-author.md:29 |
| c13-rule-test-author | - **Protocol.** Read the delivered rule artifact → write/repair the material → run the… | agents/rule-test-author.md:44 |
| c13-rule-test-author | - **Single-rule isolation is binding.** Reported diagnostic codes alias across rules on two lanes… | agents/rule-test-author.md:50 |
| c13-rule-test-author | - **Also carries** the per-lane honesty map v0 (what each lane's verification actually proves… | agents/rule-test-author.md:74 |
| c13-rule-test-author | - **USES:** each lane's deterministic verifier (npm validator gates, ast-grep scan --json, ruff check… | page-level (see page Anchors) |
| c13-rule-test-author | - **ADAPTS:** the write/repair half of the rule-tests protocol; it composes with /rule-research, the… | agents/rule-test-author.md:24 |
| c13-rule-test-author | - **ADDS:** the hash-exemption argument — canonicalRuleHash covers only a rule's identity fields, so… | agents/rule-test-author.md:31 |
| c13-rule-test-author | - Census satellite: **B4**. Carries @dual-pair: rule-tests-protocol (agents/rule-test-author.md:15). | agents/rule-test-author.md:15 |
| c14-adapter-jig-reviewer | **Status:** shipped-beta (framework-side authoring tool) | page-level (see page Anchors) |
| c14-adapter-jig-reviewer | **Ships to:** clone — excluded from consumer delivery (setup.d/20-agents.sh:30 case-skip) | setup.d/20-agents.sh:30 |
| c14-adapter-jig-reviewer | **Fires at:** framework authoring/review sessions only | page-level (see page Anchors) |
| c14-adapter-jig-reviewer | Sub-agent prompt for the session-bound review half of the adapter-jig process rig — the… | agents/adapter-jig-reviewer.md:30-33 |
| c14-adapter-jig-reviewer | Dispatched as a fresh sub-agent to review an ecosystem-adapter wiring stage; it reports and… | agents/adapter-jig-reviewer.md:35-37 |
| c14-adapter-jig-reviewer | Not a GitHub Action, makes no LLM API call, bills no tokens beyond the… | agents/adapter-jig-reviewer.md:27-28 |
| c14-adapter-jig-reviewer | - **Cold input contract.** Only the diff (or a base..head range resolved with git… | agents/adapter-jig-reviewer.md:58-60, agents/adapter-jig-reviewer.md:62 |
| c14-adapter-jig-reviewer | - **Eight groups, one verdict each** (GO / REVISE / INSUFFICIENT) with per-arm evidence:… | agents/adapter-jig-reviewer.md:74 |
| c14-adapter-jig-reviewer | - **Judge the real lane, not a fixture (T-AJ-A).** A dimension is GO only… | agents/adapter-jig-reviewer.md:68 |
| c14-adapter-jig-reviewer | - **Output grammar.** Structured review block with per-group verdict lines, a roll-up («N GO… | agents/adapter-jig-reviewer.md:95 |
| c14-adapter-jig-reviewer | - **USES:** the §3 conformance-group + arm-ID definitions from the adapter-jig design spec (its… | agents/adapter-jig-reviewer.md:7, agents/adapter-jig-reviewer.md:24-25 |
| c14-adapter-jig-reviewer | - **PEER:** same skip-loop classification as backward-sweep-auditor.md (agents/adapter-jig-reviewer.md:38). | agents/adapter-jig-reviewer.md:38 |
| c14-adapter-jig-reviewer | - **ADDS:** PR-blindness by construction — cold context means you never saw the PR… | agents/adapter-jig-reviewer.md:47 |
| c15-backward-sweep-auditor | **Status:** shipped-beta (framework-side authoring tool) | page-level (see page Anchors) |
| c15-backward-sweep-auditor | **Ships to:** clone — excluded from consumer delivery (setup.d/20-agents.sh:28 case-skip) | setup.d/20-agents.sh:28 |
| c15-backward-sweep-auditor | **Fires at:** framework authoring sessions — dispatched by an author about to write a ### §1.7… | agents/backward-sweep-auditor.md:27 |
| c15-backward-sweep-auditor | Sub-agent prompt for the cold, PR-blind enumeration of every codebase surface where a given… | agents/backward-sweep-auditor.md:11-13 |
| c15-backward-sweep-auditor | Reporting-only — no fix, edit, or commit; classification is operator-only (authoring-only), not shipped to… | agents/backward-sweep-auditor.md:29 |
| c15-backward-sweep-auditor | - **Cold mechanism.** The §1.7 Backward-check fails as restatement (T21) when the author's context… | agents/backward-sweep-auditor.md:42-43 |
| c15-backward-sweep-auditor | - **Input contract.** Only the change's class/logic — a content predicate abstracted from where… | agents/backward-sweep-auditor.md:64-66 |
| c15-backward-sweep-auditor | - **Method.** State the class as a one-sentence predicate → enumerate the complete surface… | agents/backward-sweep-auditor.md:68 |
| c15-backward-sweep-auditor | - **Output.** Per-surface rows plus overall token GO/REVISE/STOP: any GAP-FOUND → REVISE; incomplete population… | agents/backward-sweep-auditor.md:88-90 |
| c15-backward-sweep-auditor | - **USES:** the §1.7 backward-check discipline (SSOT: phase-research-coverage.md §1.7) and the T21 trap definition… | agents/backward-sweep-auditor.md:7 |
| c15-backward-sweep-auditor | - **PEER:** shares the reviewer-discipline clauses and the GO/REVISE/STOP verdict vocab sourced from dispatch-input-checker.md… | agents/backward-sweep-auditor.md:21 |
| c15-backward-sweep-auditor | - **ADDS:** the incident-grounded cold-seat construction — PR #857 shipped a restatement backward-check; the… | agents/backward-sweep-auditor.md:38-40 |
| c16-dispatch-input-checker | **Status:** shipped-beta (framework-side authoring tool) | page-level (see page Anchors) |
| c16-dispatch-input-checker | **Ships to:** clone — excluded from consumer delivery (setup.d/20-agents.sh:31 case-skip; the skip comment names it an… | setup.d/20-agents.sh:31 |
| c16-dispatch-input-checker | **Fires at:** every aif-dispatch boundary in framework authoring work — the dispatching session invokes it on… | agents/dispatch-input-checker.md:16 |
| c16-dispatch-input-checker | Cold dispatch-input reality-check — the bottom seat of the arch-v2-context-pipeline contract v2, class B… | agents/dispatch-input-checker.md:11 |
| c16-dispatch-input-checker | It answers ONE question: is this dispatch input fit for an executor to burn… | agents/dispatch-input-checker.md:42-43 |
| c16-dispatch-input-checker | Classification: operator-only (authoring-only), not shipped to consumers — consumers do not author aif-dispatch inputs… | agents/dispatch-input-checker.md:36 |
| c16-dispatch-input-checker | - **Inputs.** The dispatch input text, the kickoff's permitted-file list (K1 anchor resolution), and… | agents/dispatch-input-checker.md:54-62 |
| c16-dispatch-input-checker | - **Five EQUAL classes (ADR-6 — no primary/background split).** K1 anchors exist; K2 quoted… | agents/dispatch-input-checker.md:64 |
| c16-dispatch-input-checker | - **K6 is a split check.** This agent emits candidates only (framing-bias lexicon hits,… | agents/dispatch-input-checker.md:81-88 |
| c16-dispatch-input-checker | - **Output grammar is machine-consumed.** A paste-ready ledger row whose first line is DISPATCH-INPUT:… | agents/dispatch-input-checker.md:165-168, agents/dispatch-input-checker.md:181, agents/dispatch-input-checker.md:186-188 |
| c16-dispatch-input-checker | - **Grammar source.** The S-D′ map row records that this agent IS the GO/REVISE/STOP… | agents/dispatch-input-checker.md:33 |
| c16-dispatch-input-checker | - **USES:** the calibration ledger and the ADR-5 shadow-A/B threshold pre-registered in its header… | agents/dispatch-input-checker.md:13-15 |
| c16-dispatch-input-checker | - **PEER:** the other cold auditors (backward-sweep, dual-channel-drift, adapter-jig) borrow its GO/REVISE/STOP verdict vocabulary. | page-level (see page Anchors) |
| c16-dispatch-input-checker | - **ADDS:** measured candidate-emission economics — e.g. 63 candidates across the 11 contract-bearing kickoffs… | agents/dispatch-input-checker.md:146-148 |
| c17-dual-channel-drift-auditor | **Status:** shipped-beta (framework-side authoring tool) | page-level (see page Anchors) |
| c17-dual-channel-drift-auditor | **Ships to:** clone — excluded from consumer delivery (setup.d/20-agents.sh:29 case-skip) | setup.d/20-agents.sh:29 |
| c17-dual-channel-drift-auditor | **Fires at:** framework authoring/review sessions — dispatched with one @dual-pair anchor name, or with the instruction… | agents/dual-channel-drift-auditor.md:51-52 |
| c17-dual-channel-drift-auditor | Cold, PR-blind pairwise audit of a declared @dual-pair anchor group, reporting one INTENTIONAL-TWIN /… | agents/dual-channel-drift-auditor.md:3 |
| c17-dual-channel-drift-auditor | Reporting-only; classification operator-only (authoring-only), not shipped to consumers (agents/dual-channel-drift-auditor.md:23-24) | agents/dual-channel-drift-auditor.md:23-24 |
| c17-dual-channel-drift-auditor | - **Why no tool replaces it.** #two-prompts-drift and #sync-by-copy-paste are judgment anti-patterns; surveyed clone… | agents/dual-channel-drift-auditor.md:28-31, agents/dual-channel-drift-auditor.md:36-41 |
| c17-dual-channel-drift-auditor | - **Method.** Enumerate the group's members via git grep over the anchor and state… | agents/dual-channel-drift-auditor.md:62-71, agents/dual-channel-drift-auditor.md:73-77 |
| c17-dual-channel-drift-auditor | - **Classification.** INTENTIONAL-TWIN (high overlap by construction — evidence required: a regenerating hook, a… | agents/dual-channel-drift-auditor.md:79-87, agents/dual-channel-drift-auditor.md:89 |
| c17-dual-channel-drift-auditor | - **Output.** ANCHOR/OVERLAP/DIVERGENCE/MECHANISM/VERDICT/COVERAGE block with OVERALL GO/REVISE/STOP: any COPY-RISK or DRIFT → REVISE; any… | agents/dual-channel-drift-auditor.md:100-101 |
| c17-dual-channel-drift-auditor | - **USES:** dual-implementation-discipline.md §7-§8 as SSOT (agents/dual-channel-drift-auditor.md:14-15); the GO/REVISE/STOP tokens per dispatch-input-checker.md §Output grammar… | agents/dual-channel-drift-auditor.md:14-15, agents/dual-channel-drift-auditor.md:100 |
| c17-dual-channel-drift-auditor | - **PEER:** audits the same @dual-pair anchors the skill-context overrides carry — e.g. @dual-pair:… | page-level (see page Anchors) |
| c17-dual-channel-drift-auditor | - **ADDS:** the semantic half of the drift check that the channel-coverage probe (dangling… | page-level (see page Anchors) |
| c18-manual-rule-liveness-prober | **Status:** shipped-beta (framework-side authoring tool) | page-level (see page Anchors) |
| c18-manual-rule-liveness-prober | **Ships to:** clone — excluded from consumer delivery (setup.d/20-agents.sh:26 case-skip, #552) | setup.d/20-agents.sh:26 |
| c18-manual-rule-liveness-prober | **Fires at:** operator-run in a framework session, top-level only (claude --agent, not a dispatched subagent —… | agents/manual-rule-liveness-prober.md:130 |
| c18-manual-rule-liveness-prober | Session-bound RED→GREEN liveness probe for manifest manual rules (check.type==='manual'): dispatch a fresh subagent without… | agents/manual-rule-liveness-prober.md:11 |
| c18-manual-rule-liveness-prober | It closes the gap principle 02 leaves open — the mechanical gate proves structural… | agents/manual-rule-liveness-prober.md:18 |
| c18-manual-rule-liveness-prober | Reporting-only: no edits to manifest, rule text, or source; the only artefact is a… | agents/manual-rule-liveness-prober.md:20 |
| c18-manual-rule-liveness-prober | - **Why not CI.** A fresh subagent per pass is an LLM dispatch on… | agents/manual-rule-liveness-prober.md:26 |
| c18-manual-rule-liveness-prober | - **Input.** A single manual rule id or the keyword all; the manual rules… | agents/manual-rule-liveness-prober.md:32-43 |
| c18-manual-rule-liveness-prober | - **Two-source scenario lookup.** Pressure-scenarios read first from .ai-factory/generated-scenarios.json (validated generated scenarios), falling back… | agents/manual-rule-liveness-prober.md:47-50 |
| c18-manual-rule-liveness-prober | - **Demoability split.** code-grep-shaped rules run the full RED→GREEN dispatch; runtime-shaped rules report structural-validation-only… | agents/manual-rule-liveness-prober.md:66-69 |
| c18-manual-rule-liveness-prober | - **Verdicts.** Exactly one of LIVE (the only verdict that proves liveness), BASELINE-DIDN'T-FAIL (T-V3-B… | agents/manual-rule-liveness-prober.md:90-95 |
| c18-manual-rule-liveness-prober | - **USES:** the pressure-scenario contract (rules-manifest.schema.json + principle 02) and the manifest's fixed pressure… | agents/manual-rule-liveness-prober.md:57 |
| c18-manual-rule-liveness-prober | - **ADAPTS:** Superpowers writing-skills pressure-scenario methodology — same RED→GREEN mechanism, different artifact: a SKILL… | agents/manual-rule-liveness-prober.md:125 |
| c18-manual-rule-liveness-prober | - **ADDS:** the behavioural channel of two-channel liveness — principle 02 is the structural… | agents/manual-rule-liveness-prober.md:140-141 |
| c18-manual-rule-liveness-prober | - Census satellite: **B3**. The two later probers (shipped-agent C19, getff-cold-run C20) reuse its… | page-level (see page Anchors) |
| c19-shipped-agent-liveness-prober | **Status:** shipped-beta (framework-side authoring tool) | page-level (see page Anchors) |
| c19-shipped-agent-liveness-prober | **Ships to:** clone — excluded from consumer delivery (setup.d/20-agents.sh:27 case-skip, M2 probe, #552 sibling) | setup.d/20-agents.sh:27 |
| c19-shipped-agent-liveness-prober | **Fires at:** operator-initiated only — header status DORMANT, never a CI gate, never a required merge… | agents/shipped-agent-liveness-prober.md:14-19 |
| c19-shipped-agent-liveness-prober | Session-bound RED→GREEN behavioural liveness probe for the framework's shipped sub-agents: dispatch a fresh subagent… | agents/shipped-agent-liveness-prober.md:11 |
| c19-shipped-agent-liveness-prober | Principle 21's M1 gate (shipped #576) form-checks tools: NAMES are CC-canonical; this M2 probe… | agents/shipped-agent-liveness-prober.md:29 |
| c19-shipped-agent-liveness-prober | Built build-only under T-M2PROBE-A: the RED→GREEN deltas are a design specification, not a verified… | agents/shipped-agent-liveness-prober.md:21-25 |
| c19-shipped-agent-liveness-prober | - **Dormancy.** Promotion trigger (§5.2): a 2nd dispatch-fabrication incident (after #551) OR #550 post-install… | agents/shipped-agent-liveness-prober.md:14-19 |
| c19-shipped-agent-liveness-prober | - **Shipped surface — derived, never hardcoded.** The authoritative shipped surface is install.sh §2's… | agents/shipped-agent-liveness-prober.md:43, agents/shipped-agent-liveness-prober.md:71 |
| c19-shipped-agent-liveness-prober | - **Per-agent fixtures.** For each agent: read agents/<slug>.md frontmatter (tools:, description) and the fixture… | agents/shipped-agent-liveness-prober.md:88-95 |
| c19-shipped-agent-liveness-prober | - **Two passes, fresh contexts.** Pass 1 tool-less (tools: [] — the #551 state)… | agents/shipped-agent-liveness-prober.md:111-130 |
| c19-shipped-agent-liveness-prober | - **Verdicts.** LIVE / BASELINE-DIDN'T-FAIL / WITH-TOOLS-DIDN'T-COMPLY / DISPATCH-INFEASIBLE (PARK) (agents/shipped-agent-liveness-prober.md:138-141). | agents/shipped-agent-liveness-prober.md:138-141 |
| c19-shipped-agent-liveness-prober | - **USES:** principle 21's M1 form-gate as the CI floor it complements; install.sh §2… | agents/shipped-agent-liveness-prober.md:12 |
| c19-shipped-agent-liveness-prober | - **ADAPTS:** manual-rule-liveness-prober (#115) — same fresh-subagent-per-pass, isolated-context machinery, retargeted from does this rule… | agents/shipped-agent-liveness-prober.md:195 |
| c19-shipped-agent-liveness-prober | - **ADDS:** the behavioural counterfactual to #551 — M1 caught it by form; this… | agents/shipped-agent-liveness-prober.md:207-211 |
| c2-reviewer-discipline | **Status:** shipped-beta | page-level (see page Anchors) |
| c2-reviewer-discipline | **Ships to:** npm lane, --profile factory only (or legacy --with-aif-suite; an existing copy is refreshed in… | setup.d/20-agents.sh:39 |
| c2-reviewer-discipline | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c2-reviewer-discipline | The dispatched reviewer-session prompt: > **Authoritative for:** reviewer-discipline sub-agent prompt — the review-session protocol… | agents/reviewer-discipline.md:12-14 |
| c2-reviewer-discipline | It is a pointer, not a copy — the rule file stays SSOT and… | agents/reviewer-discipline.md:17 |
| c2-reviewer-discipline | Its whole role in one line: You report. You do **not** decide. (line 85) | page-level (see page Anchors) |
| c2-reviewer-discipline | - §1: ## §1 — The discipline (do NOT cross into orchestrator-role decisions mid-session)… | page-level (see page Anchors) |
| c2-reviewer-discipline | - §2: ## §2 — Surface-as-decision-needed pattern (line 56) — 1. **Name the decision… | page-level (see page Anchors) |
| c2-reviewer-discipline | - §3: ## §3 — Self-check before posting your verdict (line 65) — converts… | page-level (see page Anchors) |
| c2-reviewer-discipline | - §4: ## §4 — Anti-patterns (see [.claude/rules/reviewer-discipline.md §3](../.claude/rules/reviewer-discipline.md) for full definitions) (line 75),… | page-level (see page Anchors) |
| c2-reviewer-discipline | - **USES:** .claude/rules/reviewer-discipline.md — the SSOT rule whose §1 discipline + §2 pattern this… | agents/review-sidecar.md:158 |
| c2-reviewer-discipline | - **ADAPTS:** the rule into a run-moment session protocol (line 14: pattern), condensed for… | page-level (see page Anchors) |
| c2-reviewer-discipline | - **ADDS:** the DECISION-NEEDED output grammar plus the §3 self-check and §4 anti-pattern tags… | page-level (see page Anchors) |
| c2-reviewer-discipline | - Census family satellites: **B9** (reviewer — the interactive env+-tier review skill layered over… | agents/orchestrator-worker-discipline.md:137 |
| c20-getff-cold-run-prober | **Status:** shipped-beta | page-level (see page Anchors) |
| c20-getff-cold-run-prober | **Ships to:** clone — framework-only; run BY the framework against a consumer, never shipped (setup.d/20-agents.sh:32) | setup.d/20-agents.sh:32 |
| c20-getff-cold-run-prober | **Fires at:** operator-run in a framework session — header status DORMANT: shipped once at umbrella closure… | agents/getff-cold-run-prober.md:14 |
| c20-getff-cold-run-prober | Session-bound one-beat cold-run acceptance probe for the getff-any-stack-trace umbrella: dispatch a fresh subagent with… | agents/getff-cold-run-prober.md:11 |
| c20-getff-cold-run-prober | Single-pass journey-completion, NOT RED→GREEN two-pass — the rule has not been authored yet, which… | agents/getff-cold-run-prober.md:11 |
| c20-getff-cold-run-prober | It closes the gap the deterministic W6 cell leaves open: that cell proves the… | agents/getff-cold-run-prober.md:18 |
| c20-getff-cold-run-prober | - **Cold-start conditions (all verifiable; any failure invalidates the run).** Fresh consumer project (framework… | agents/getff-cold-run-prober.md:30-39 |
| c20-getff-cold-run-prober | - **Flow.** Verify the cold-start checks before dispatch (agents/getff-cold-run-prober.md:61-85) → compose the smallest realistic… | agents/getff-cold-run-prober.md:61-85, agents/getff-cold-run-prober.md:109 |
| c20-getff-cold-run-prober | - **GREEN requires ALL of:** a firing stack-specific rule landed; the rule fires on… | agents/getff-cold-run-prober.md:137-139 |
| c20-getff-cold-run-prober | - **Never edit the protocol to force a pass** (spec §9.3 T-S4-C): a RED… | agents/getff-cold-run-prober.md:211 |
| c20-getff-cold-run-prober | - **USES:** the W6 python-unfamiliar-stack-cell.sh fixture as a valid cold-start input, and the delivered… | agents/getff-cold-run-prober.md:34 |
| c20-getff-cold-run-prober | - **ADAPTS:** the operational class of manual-rule-liveness-prober (#115) + shipped-agent-liveness-prober — session-bound, DORMANT, reporting-only,… | agents/getff-cold-run-prober.md:198 |
| c20-getff-cold-run-prober | - **ADDS:** the umbrella's only recursive-self-application artefact — the framework probing whether its own… | agents/getff-cold-run-prober.md:218-220 |
| c21-skill-context-aif-orchestrator-discipline | **Status:** shipped-beta (AIF-native skill-context override) | page-level (see page Anchors) |
| c21-skill-context-aif-orchestrator-discipline | **Ships to:** npm lane — copied into the consumer's .ai-factory/skill-context/aif-orchestrator-discipline/SKILL.md | page-level (see page Anchors) |
| c21-skill-context-aif-orchestrator-discipline | **Fires at:** mandatory-read by AIF's own background sidecars when dispatched into this project | page-level (see page Anchors) |
| c21-skill-context-aif-orchestrator-discipline | Covers census rows C21 and E15 — the same file rows in both families | page-level (see page Anchors) |
| c21-skill-context-aif-orchestrator-discipline | Skill-context override at packages/core/templates/shared/skill-context/aif-orchestrator-discipline/SKILL.md (frontmatter name: aif-orchestrator-discipline) | page-level (see page Anchors) |
| c21-skill-context-aif-orchestrator-discipline | It is the condensed portable subset of orchestrator-worker discipline for agents dispatched into a… | /aif-orchestrator-discipline/SKILL.md:13-14 |
| c21-skill-context-aif-orchestrator-discipline | The FULL operator-side orchestrator workflow does NOT travel into the container — quota zones,… | /aif-orchestrator-discipline/SKILL.md:8 |
| c21-skill-context-aif-orchestrator-discipline | - **Delivery mechanism.** setup.d/20-agents.sh §3c: skill-context overrides are the AIF-native extend a vendored sub-agent… | setup.d/20-agents.sh:55-57, setup.d/20-agents.sh:74 |
| c21-skill-context-aif-orchestrator-discipline | - **Factory-profile gate.** aif-orchestrator-discipline pairs with the gated orchestrator-worker-discipline agent (F7 companion split): copied… | setup.d/20-agents.sh:70-72 |
| c21-skill-context-aif-orchestrator-discipline | - **Worker layer.** REPORT schema mandatory on task completion — Status DONE|BLOCKED|PARTIAL, Deliverable, Evidence… | /aif-orchestrator-discipline/SKILL.md:27, /aif-orchestrator-discipline/SKILL.md:42, /aif-orchestrator-discipline/SKILL.md:52 |
| c21-skill-context-aif-orchestrator-discipline | - **Planner + reviewer layers** (applied when the kickoff asks for planning or review).… | /aif-orchestrator-discipline/SKILL.md:62, /aif-orchestrator-discipline/SKILL.md:92 |
| c21-skill-context-aif-orchestrator-discipline | - **PEER:** the other two skill-context overrides (aif-review C22/E16, aif-rules-check C23/E17) ride the same… | page-level (see page Anchors) |
| c21-skill-context-aif-orchestrator-discipline | - Census satellite: **B7**. | page-level (see page Anchors) |
| c22-skill-context-aif-review | **Status:** shipped-beta (AIF-native skill-context override) | page-level (see page Anchors) |
| c22-skill-context-aif-review | **Ships to:** npm lane — copied into the consumer's .ai-factory/skill-context/aif-review/SKILL.md by the SHIPPED_DOCS-derived §3c copy loop… | setup.d/20-agents.sh:74 |
| c22-skill-context-aif-review | **Fires at:** mandatory-read by AIF's own background sidecars (setup.d/20-agents.sh:56) — concretely, AIF's aif-review skill and its… | setup.d/20-agents.sh:56 |
| c22-skill-context-aif-review | Covers census rows C22 and E16 — the same file rows in both families | page-level (see page Anchors) |
| c22-skill-context-aif-review | Skill-context override at packages/core/templates/shared/skill-context/aif-review/SKILL.md | page-level (see page Anchors) |
| c22-skill-context-aif-review | File name aif-review/SKILL.md; frontmatter name: aif-review-project-context — the name E16's census row quotes | page-level (see page Anchors) |
| c22-skill-context-aif-review | H1: aif-review skill-context — anti-tautology two-AI review conventions | page-level (see page Anchors) |
| c22-skill-context-aif-review | It carries project-specific review conventions injected into AI Factory's aif-review skill (and its background… | /aif-review/SKILL.md:7 |
| c22-skill-context-aif-review | The generic correctness/security/performance review stays owned by AIF's aif-review SKILL.md; this file augments it… | /aif-review/SKILL.md:8 |
| c22-skill-context-aif-review | The delivery route is deliberate: rather than ship a colliding review-sidecar agent, aif-review gets… | setup.d/20-agents.sh:58 |
| c22-skill-context-aif-review | - **Premise.** The highest-value review signal is test quality, not just code correctness; apply… | /aif-review/SKILL.md:16 |
| c22-skill-context-aif-review | - **Stance.** Review the diff as a cold external reviewer — read the changed… | /aif-review/SKILL.md:18 |
| c22-skill-context-aif-review | - **The seven MUST-checks.** Tautological tests (assertions true by construction — if I removed… | /aif-review/SKILL.md:22-36 |
| c22-skill-context-aif-review | - **Output augmentation.** A ### Test-Quality Review section listing each finding with severity (BLOCKER/MAJOR/MINOR),… | /aif-review/SKILL.md:38-40 |
| c22-skill-context-aif-review | - **ADAPTS:** agents/review-sidecar.md (census C10) — same anti-tautology spec, different delivery channel; the AIF-native… | page-level (see page Anchors) |
| c22-skill-context-aif-review | - **USES:** AIF's aif-review skill + review-sidecar as the host pipeline whose output this… | setup.d/20-agents.sh:56-58 |
| c22-skill-context-aif-review | - **ADDS:** the two-AI rationale — the implementer wrote code and tests in one… | /aif-review/SKILL.md:20 |
| c22-skill-context-aif-review | - Census satellites: **B35, C10**. | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | **Status:** shipped-beta (AIF-native skill-context override) | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | **Ships to:** npm lane — copied into the consumer's .ai-factory/skill-context/aif-rules-check/SKILL.md by the SHIPPED_DOCS-derived §3c copy loop… | setup.d/20-agents.sh:74 |
| c23-skill-context-aif-rules-check | **Fires at:** mandatory-read by AIF's own background sidecars (setup.d/20-agents.sh:56) — concretely, AIF's aif-rules-check skill and its… | setup.d/20-agents.sh:56 |
| c23-skill-context-aif-rules-check | Covers census rows C23 and E17 — the same file rows in both families | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | Skill-context override at packages/core/templates/shared/skill-context/aif-rules-check/SKILL.md | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | File name aif-rules-check/SKILL.md; frontmatter name: aif-rules-check-project-context | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | H1: aif-rules-check skill-context — naming + test-existence residue | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | It carries project-specific rule checks injected into AI Factory's aif-rules-check skill (and its rules-sidecar)… | /aif-rules-check/SKILL.md:7 |
| c23-skill-context-aif-rules-check | This is the residue of the removed best-practices-sidecar: aif-rules-check gets the R10-naming + test-existence… | setup.d/20-agents.sh:59 |
| c23-skill-context-aif-rules-check | - **No paired agent.** The file is the standalone SSOT for the R10/R4/R17 residue;… | /aif-rules-check/SKILL.md:14-15, /aif-rules-check/SKILL.md:14 |
| c23-skill-context-aif-rules-check | - **Scope discipline.** rules-sidecar already reads .ai-factory/RULES.md for the full R1–R20 corpus; do not… | /aif-rules-check/SKILL.md:18 |
| c23-skill-context-aif-rules-check | - **R10 — naming conventions.** RULES.md marks R10 manual review only with no probe:… | /aif-rules-check/SKILL.md:20-29 |
| c23-skill-context-aif-rules-check | - **R4 / R17 — test-existence for new code.** ESLint cannot assert a test… | /aif-rules-check/SKILL.md:31-38 |
| c23-skill-context-aif-rules-check | - **Output augmentation.** Append a ### Project Residue Checks (R10 / R4 / R17)… | /aif-rules-check/SKILL.md:40-42 |
| c23-skill-context-aif-rules-check | - **ADAPTS:** the removed best-practices-sidecar.md — its surviving residue is carried here in full… | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | - **USES:** AIF's aif-rules-check skill + rules-sidecar as the host verify-time pass whose RULES.md… | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | - **ADDS:** exactly the two checks with no earlier deterministic channel — the residue… | page-level (see page Anchors) |
| c23-skill-context-aif-rules-check | - Census satellite: **B38**. | page-level (see page Anchors) |
| c3-aif-init | **Status:** shipped-beta | page-level (see page Anchors) |
| c3-aif-init | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c3-aif-init | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c3-aif-init | The project-passport generator: > **Authoritative for:** aif-init sub-agent prompt — passport generation for consumer… | agents/aif-init.md:9 |
| c3-aif-init | Input is repo observation only: Reads the consumer repo's package.json(s), directory layout, and config… | page-level (see page Anchors) |
| c3-aif-init | Output is two draft files, never authoritative on write (line 23: Both files are… | page-level (see page Anchors) |
| c3-aif-init | - ## What this does (line 16) names the two targets, including - .ai-factory/DESCRIPTION.md… | page-level (see page Anchors) |
| c3-aif-init | - Step 1 detection: ### Detection table (line 64) — Apply this table to… | page-level (see page Anchors) |
| c3-aif-init | - Step 2 grounds every claim: Using the detected values, write .ai-factory/DESCRIPTION.md. Ground every… | page-level (see page Anchors) |
| c3-aif-init | - Step 3 picks the architecture template by framework — - next detected →… | page-level (see page Anchors) |
| c3-aif-init | - Step 4 never clobbers human work: **Do NOT overwrite** if the target file… | page-level (see page Anchors) |
| c3-aif-init | - Degradation path exists: The installer already copies these templates. Never error; always provide… | page-level (see page Anchors) |
| c3-aif-init | - **USES:** deterministic repo signals only — package.json(s), config globs, directory layout (line 18);… | page-level (see page Anchors) |
| c3-aif-init | - **ADAPTS:** the two shipped architecture templates (ARCHITECTURE.react-next.md / ARCHITECTURE.ts-server.md, lines 157-158) into a… | page-level (see page Anchors) |
| c3-aif-init | - **ADDS:** the DRAFT review gate (line 197: Both files are written as DRAFT.… | page-level (see page Anchors) |
| c3-aif-init | - Census family satellites: **B17** (aif — the setup skill whose .ai-factory/ suite this… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | **Status:** shipped-beta | page-level (see page Anchors) |
| c4-capability-reuse-auditor | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c4-capability-reuse-auditor | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | > **Authoritative for:** capability-reuse-auditor sub-agent prompt — the semantic overlap triage of a proposed/just-authored… | agents/capability-reuse-auditor.md:11-13 |
| c4-capability-reuse-auditor | The gap it fills: F1 can confirm a Prior-art: trailer exists but carries a… | agents/capability-reuse-auditor.md:30 |
| c4-capability-reuse-auditor | Motivating incident: Origin: PR #858 shipped .claude/skills/night-mode/SKILL.md re-describing the executor + dual- reviewer loop… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - ## Input (line 43) — either a proposed capability or a just-authored file:… | agents/capability-reuse-auditor.md:46 |
| c4-capability-reuse-auditor | - ## Method (no prose-only findings — per T3) (line 50): name the problem-class… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - Trailer check (step 4, line 66: 4. **Trailer↔body consistency** (if a trailer/verdict is… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - Coverage honesty: 5. **Distinguish «no overlap» from «low coverage»** (T14): partial coverage reported… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - ## Verdicts you recommend (with GO/REVISE/STOP overlay per dispatch-input-checker.md §Output grammar) (line 74)… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - **USES:** the prior-art SSOT (docs/meta-factory/prior-art-evaluations.md, line 55) and the reviewer-discipline clauses it imports… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - **ADAPTS:** the dispatch-input-checker GO/REVISE/STOP verdict overlay (line 74; also line 22: > overlay… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - **ADDS:** the reuse-vs-reinvent judgment the deterministic F1 gate cannot make (line 30) and… | page-level (see page Anchors) |
| c4-capability-reuse-auditor | - Census family satellites: **C2** (reviewer-discipline — its §1+§2 clauses are imported verbatim at… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | **Status:** shipped-beta | page-level (see page Anchors) |
| c5-claims-conformance-auditor | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c5-claims-conformance-auditor | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | > **Authoritative for:** the claims-conformance audit protocol — claim taxonomy, inputs, per-claim verification method,… | agents/claims-conformance-auditor.md:21-22 |
| c5-claims-conformance-auditor | Class B cold detection layer: > **Class:** B — the named cold-agent DETECTION layer… | agents/claims-conformance-auditor.md:10-11 |
| c5-claims-conformance-auditor | Fires before merging or publishing any change that touches docs which assert facts about… | agents/claims-conformance-auditor.md:15, agents/claims-conformance-auditor.md:19-20 |
| c5-claims-conformance-auditor | - Cold seat: You are a COLD conformance auditor. You are dispatched with ONLY… | agents/claims-conformance-auditor.md:31 |
| c5-claims-conformance-auditor | - ## Claim taxonomy (what is in scope) (line 45): - **counts** — «10… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | - ## Method (no prose-only findings — per the [AI-laziness traps](../.claude/rules/ai-laziness-traps.md) cited below) (line… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | - 3. **Verdict per claim:** (line 74) — VERIFIED / GAP (quote both doc… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | - ## Output format (line 84): per-claim rows (line 95: - <file:line> «<claim, verbatim,… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | - **USES:** reviewer-discipline clauses (line 38 heading) and the live-source posture from destination-environment-verification §1b… | page-level (see page Anchors) |
| c5-claims-conformance-auditor | - **ADAPTS:** the dispatch-input-checker GO/REVISE/STOP verdict grammar (line 86-87). | page-level (see page Anchors) |
| c5-claims-conformance-auditor | - **ADDS:** the claim taxonomy + per-claim live-probe evidence rule; the dispatching session folds… | agents/claims-conformance-auditor.md:102-103 |
| c5-claims-conformance-auditor | - Census family satellites: **E6** (the encyclopedia's own claims-conformance pass dispatches this agent at… | page-level (see page Anchors) |
| c6-compliance-verifier | **Status:** shipped-beta | page-level (see page Anchors) |
| c6-compliance-verifier | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c6-compliance-verifier | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c6-compliance-verifier | > **Authoritative for:** compliance-verifier sub-agent prompt — PR description §1.7 section substance review; reporting-only… | agents/compliance-verifier.md:9-10 |
| c6-compliance-verifier | It reviews PR §1.7 Forward-check/Backward-check evidence: file:line citations, sweep completeness, exemption quality (frontmatter description,… | page-level (see page Anchors) |
| c6-compliance-verifier | Division of labour with the deterministic layer: The point of this role: Wave 8.1's… | agents/compliance-verifier.md:23-27 |
| c6-compliance-verifier | A plugin twin exists at plugin/agents/compliance-verifier.md — a generated byte-identical copy for the plugin… | page-level (see page Anchors) |
| c6-compliance-verifier | - ## What you check (line 39) — five YES/NO items over the PR… | page-level (see page Anchors) |
| c6-compliance-verifier | - Forward-check per-layer coverage (line 44 heading): For each applicable layer (R1-R20 code-level rules… | page-level (see page Anchors) |
| c6-compliance-verifier | - Citation integrity: Pick 2-3 of the file.ext:line citations; Read the cited locations. Does… | page-level (see page Anchors) |
| c6-compliance-verifier | - Backward-check sweep completeness: The Backward-check must enumerate the **complete set** of existing artefacts… | page-level (see page Anchors) |
| c6-compliance-verifier | - Exemption mechanism needs a paired negative test (line 82: without a paired negative… | page-level (see page Anchors) |
| c6-compliance-verifier | - Anti-patterns (line 91 heading), including - **#discipline-theatre** — §1.7 section contains ≥40 chars… | page-level (see page Anchors) |
| c6-compliance-verifier | - **USES:** reviewer-discipline clauses (line 33 heading) and the §1.7 discipline owned by .claude/rules/phase-research-coverage.md… | page-level (see page Anchors) |
| c6-compliance-verifier | - **ADAPTS:** the dispatch-input-checker verdict vocabulary — line 16: > Reach + restoration trigger… | page-level (see page Anchors) |
| c6-compliance-verifier | - **ADDS:** the substance layer over the regex gate — This is the **two-AI… | page-level (see page Anchors) |
| c6-compliance-verifier | - Census family satellites: **C10** (review-sidecar — the diff-correctness peer this agent defers to);… | page-level (see page Anchors) |
| c7-docplan-auditor | **Status:** shipped-beta | page-level (see page Anchors) |
| c7-docplan-auditor | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c7-docplan-auditor | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c7-docplan-auditor | > **Authoritative for:** the docplan-auditor sub-agent prompt — cold, PR-blind semantic judgment of a… | agents/docplan-auditor.md:11-13 |
| c7-docplan-auditor | It is the semantic complement to the composition gate: the gate mechanizes the structural… | agents/docplan-auditor.md:30-32 |
| c7-docplan-auditor | - Cold-seat rationale: ## Why a COLD, PR-blind agent is the mechanism (line 43)… | page-level (see page Anchors) |
| c7-docplan-auditor | - ## Input contract (line 51): 1. **The DocPlan** — its sections[] (each {… | page-level (see page Anchors) |
| c7-docplan-auditor | - **Hard rule — refuse the PR narrative.** If dispatched with the diff, the… | page-level (see page Anchors) |
| c7-docplan-auditor | - ## Dimensions (judge every section on all four; no prose-only findings — quote… | page-level (see page Anchors) |
| c7-docplan-auditor | - ## Method (line 89) — enumerate the population first (line 91: 1. **Enumerate… | page-level (see page Anchors) |
| c7-docplan-auditor | - Output (line 100): Per-section verdicts: CLEAN / GAP (GAP = REVISE-class). Overall verdict… | page-level (see page Anchors) |
| c7-docplan-auditor | - **USES:** the composition gate + doc-plan schema as the structural layer it complements… | page-level (see page Anchors) |
| c7-docplan-auditor | - **ADAPTS:** reviewer-discipline clauses (line 37 heading) and the dispatch-input-checker verdict grammar — line… | page-level (see page Anchors) |
| c7-docplan-auditor | - **ADDS:** the four judgment dimensions a regex cannot run, the PR-narrative refusal, and… | page-level (see page Anchors) |
| c7-docplan-auditor | - Census family satellites: peer cold auditors **C8** (fidelity-auditor, dialogue-blind) and **C5** (claims-conformance-auditor, narrative-blind)… | page-level (see page Anchors) |
| c8-fidelity-auditor | **Status:** shipped-beta | page-level (see page Anchors) |
| c8-fidelity-auditor | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c8-fidelity-auditor | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c8-fidelity-auditor | > **Authoritative for:** the fidelity-audit protocol — inputs, question, output grammar. (agents/fidelity-auditor.md:19) | agents/fidelity-auditor.md:19 |
| c8-fidelity-auditor | Class B detection layer of the acceptance contour: > **Class:** B — the named… | agents/fidelity-auditor.md:11-14 |
| c8-fidelity-auditor | Fires > **Fires:** at every stage-PR boundary — /harvest §4 fidelity step, /dispatcher §2.4… | agents/fidelity-auditor.md:17-18 |
| c8-fidelity-auditor | One question: is this diff WHAT the kickoff asked for (agents/fidelity-auditor.md:35-36) — design altitude… | agents/fidelity-auditor.md:35-36 |
| c8-fidelity-auditor | - ## Role — cold by construction (line 32): You are a COLD design-altitude… | agents/fidelity-auditor.md:34 |
| c8-fidelity-auditor | - ## Inputs (paths/text only — never chat context, never implementation logs) (line 45):… | page-level (see page Anchors) |
| c8-fidelity-auditor | - ## Protocol (line 54): read the kickoff fully — 1. Read the kickoff/spec… | page-level (see page Anchors) |
| c8-fidelity-auditor | - ## Output grammar (mandatory, machine-consumed) (line 73): FIDELITY: GO | REVISE | STOP… | page-level (see page Anchors) |
| c8-fidelity-auditor | - **Severity contract ([reviewer-discipline.md §6](../.claude/rules/reviewer-discipline.md)):** gates which findings may trigger a round (line 91). | page-level (see page Anchors) |
| c8-fidelity-auditor | - **USES:** the pr-body-fidelity gate as transport (line 13) and reviewer-discipline §6 severity contract… | page-level (see page Anchors) |
| c8-fidelity-auditor | - **ADAPTS:** the GO/REVISE/STOP vocabulary — line 30: > vocabulary** per dispatch-input-checker.md §Output grammar… | page-level (see page Anchors) |
| c8-fidelity-auditor | - **ADDS:** the machine-consumed FIDELITY verdict block and the Watch-list: Every round emits a… | page-level (see page Anchors) |
| c8-fidelity-auditor | - Census family satellites: peer cold auditors **C7** (docplan-auditor — PR-blind vs this agent's… | page-level (see page Anchors) |
| c9-living-docs-auditor | **Status:** shipped-beta | page-level (see page Anchors) |
| c9-living-docs-auditor | **Ships to:** npm lane — delivered into the consumer's .claude/agents/ by the setup delivery loop (setup.d/20-agents.sh:24) | setup.d/20-agents.sh:24 |
| c9-living-docs-auditor | **Fires at:** dispatched as a Claude Code sub-agent (frontmatter name:; the session's agent list carries its… | page-level (see page Anchors) |
| c9-living-docs-auditor | > **Authoritative for:** living-docs-auditor sub-agent prompt — runs audit-ai-docs.sh and reports backward Living-Documentation drift… | agents/living-docs-auditor.md:10 |
| c9-living-docs-auditor | The job in one line: You enforce **code-vs-docs consistency**: rules declared in AGENTS.md must… | agents/living-docs-auditor.md:13 |
| c9-living-docs-auditor | The name is the de-collision record: # - docs-auditor — RENAMED to living-docs-auditor (de-collides… | setup.d/20-agents.sh:14 |
| c9-living-docs-auditor | - Mechanism: The mechanism is scripts/audit-ai-docs.sh (or scripts/audit-ai-docs.react-next.sh for UI projects). … (agents/living-docs-auditor.md:15). | agents/living-docs-auditor.md:15 |
| c9-living-docs-auditor | - ### Step 1: Detect which audit script applies (line 23) — Next.js/React detection… | page-level (see page Anchors) |
| c9-living-docs-auditor | - ### Step 2: Verify the script exists (line 37): [ -f $SCRIPT ]… | agents/living-docs-auditor.md:39 |
| c9-living-docs-auditor | - ### Step 4: Parse output (line 53): - PASS: R<N>: <rule name> —… | page-level (see page Anchors) |
| c9-living-docs-auditor | - Auxiliary drift checks (§5.1-5.5, line 128 heading) run even when the script is… | page-level (see page Anchors) |
| c9-living-docs-auditor | - ## Rules of engagement (line 167): - **You don't modify code.** You don't… | page-level (see page Anchors) |
| c9-living-docs-auditor | - **USES:** scripts/audit-ai-docs.sh / audit-ai-docs.react-next.sh (line 15) and .ai-factory/RULES.md / RULES.react-next.md probe mappings (lines… | page-level (see page Anchors) |
| c9-living-docs-auditor | - **ADAPTS:** the AIF installer's script population in consumer projects — in the source… | page-level (see page Anchors) |
| c9-living-docs-auditor | - **ADDS:** the translation layer from raw probe output to PASS/FAIL/WARN verdicts plus the… | page-level (see page Anchors) |
| c9-living-docs-auditor | - Census family satellites: **F28** (audit script family — the audit-ai-docs.sh scripts this agent… | page-level (see page Anchors) |
