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

- Add fontfaceobserver for [fitty](https://github.com/rikschennink/fitty)
- Make component of `.fx-plate` and `.fx-asparagus` -> DRY
- Lazy load images / low res base64 initial placeholder maybe
- When modal is open show image thumbs or simple navigation between
- Potentially calculate min-height on latest articles description so 'read more' buttons horizontally align. Would require description max length check/cull/ellipsis. Would guard against wall of text from CMS.
- e2e testing of happy path
  - lightbox opens on hero image click with correct content
- `npm run dev` reports `files in the public directory are served at the root path. Instead of /public/stem-1@2x.png, use /stem-1@2x.png`. Following this advice will break the build preview (dev works fine). Might be an alternative pattern to import these dynamic images.
