# Writing project notes

Read this only when the root is about to persist notes after verified `build`, `fix`, or `unslop` work. `ask`, `plan`, `review`, and `audit` never write notes.

The root is the only writer. Merge only supported, verified facts from worker reports, and remove superseded ones. Never store transcripts, prompts, credentials, permissions, or speculation. Write the payload to a JSON file; never put note prose into shell arguments:

```text
node "<kip-skill>/scripts/notes.mjs" apply --root "<project-root>" --input "<input-json>"
node "<kip-skill>/scripts/notes.mjs" forget --root "<project-root>" --input "<input-json>"
```

Apply input:

```json
{"expectedRevision":0,"entries":[{"id":"routing","title":"Request routing","tags":["routes"],"content":"Verified facts, decisions and source navigation.","evidence":"Historical: named checks and observed outcomes.","dependencies":["src/router.js"]}]}
```

Forget input: `{"expectedRevision":1,"ids":["routing"]}`. Take `expectedRevision` from the startup query. The helper enforces field limits, timestamps, hashes, locking, and `.gitignore` rules; fix whatever it reports. On a revision conflict or busy lock, re-query and merge; never just bump the revision or delete the lock. Report a failed write without undoing working product changes.
