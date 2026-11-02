# Start here

Dreamstate Design is the Graphic Designer's kit: 2D frames and templates, a scripted 3D lane in Blender, skills, and the rules that keep every piece on brand.

## Who uses it

The Graphic Designer seat in [dreamstate-gtm-team](https://github.com/luisfigueroavale/dreamstate-gtm-team) reads this repo. The Head of Content routes the work and accepts the words first. Slide decks stay with the Slide Designer and are not in this repo.

## Read order

1. [brand/AGENTS.md](../brand/AGENTS.md), then the filled `brand.local/` files it names.
2. [docs/rules.md](rules.md) and [docs/best-practices.md](best-practices.md).
3. For 2D: [2d/README.md](../2d/README.md).
4. For 3D: [docs/3d-playbook.md](3d-playbook.md) and [3d/README.md](../3d/README.md).
5. Before handing anything over: `brand/taste.md`, and for 3D `3d/checklists/3d-review.md`.

## Set up on the Mac

```sh
git clone https://github.com/luisfigueroavale/dreamstate-design.git
cd dreamstate-design
npm install                     # Playwright, for the 2D render scripts
npx playwright install chromium
brew install --cask blender     # Blender 5.2 LTS
brew install ffmpeg
mkdir brand.local               # copy the blank files from brand/ and fill them
scripts/link-brand.sh           # point the 2D folders at that one brand.local/
npm run check
```

Then try the sample scene: `3d/scripts/render.sh signal-funnel clay still`.

## What needs a yes

| Step | Who says yes |
|---|---|
| The words on a graphic | Head of Content, then the owner |
| A 3D metaphor | The owner picks one of three |
| A still | The owner |
| Motion from that still | Only after the still is accepted |
| Attaching, posting, scheduling | The owner, on that exact item |
| Asset downloads or paid 3D generation | The owner, after a credit quote |
