# Orchard Technical Task

Given I had the opportunity to build something from scratch I've decided to upskill and learn the new Vite tooling and brush up on my Vue 3 knowledge. I hope this repo demonstrates my competency, desire to always be learning, and of course my eagerness to be a part of the Orchard team!

Start dev

```
$ npm run dev
```

Build for preview/deployment

```
$ npm run build
```

Preview build (_serve from dist_)

```
$ npm run preview
```

### TODO

_Some things on the radar_:

- Latest articles could be a slider @phone
- Lazy load images / low res base64 initial placeholder maybe
- Hero image layout tweaks needed just above @tablet
- Potentially calculate min-height on latest articles description so 'read more' buttons horizontally align. Would require description max length check/cull/ellipsis. Would guard against wall of text from CMS.
- Articles could quickly fade in LTR when reaching viewport @>=tablet
- e2e testing of happy path
  - lightbox opens on hero image click with correct content
