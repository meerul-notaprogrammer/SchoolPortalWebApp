# [Anime.js | JavaScript Animation Engine](https://animejs.com) 4.5.0 3.2.2 2.1.0

- [Docs](https://animejs.com/documentation 'Documentation')
- [Easings](https://animejs.com/easing-editor 'Easing functions editor')
- [Learn](https://animejs.com/learn 'Learn')
- [Examples](https://codepen.io/collection/Poerqa?cursor=eyJwYWdlIjoxfQ==/ 'CodePen')
- [GitHub](https://github.com/juliangarnier/anime 'GitHub')
- [Sponsor](https://github.com/sponsors/juliangarnier 'Sponsor Julian Garnier on GitHub')

## All-in-one 
animation 
engine.

A fast and flexible JavaScript 
library to animate the web.

```
npm i animejs
```

Learn more

Sponsored by [Become a sponsor](https://github.com/sponsors/juliangarnier?ref=animejs 'Become a sponsor')

## The complete 
animator's toolbox

Break free from browser limitations and animate anything on the web with a single API.

## Intuitive API

Animate faster with an easy-to-use, yet powerful animation API.

- [Per property parameters](https://animejs.com/documentation/animation/tween-parameters/composition)
- [Flexible keyframes system](https://animejs.com/documentation/animation/tween-parameters/composition)
- [Built-in easings](https://animejs.com/documentation/animation/tween-parameters/composition)

## Enhanced transforms

Smoothly blend individual CSS transform properties with a versatile composition API.

- [Individual CSS Transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms)
- [Function based values](https://animejs.com/documentation/animation/tween-value-types/function-based)
- [Blend composition](https://animejs.com/documentation/animation/tween-parameters/composition)

## Scroll Observer

Synchronise and trigger animations on scroll with the Scroll Observer API.

- [Multiple synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes)
- [Advanced thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds)
- [Complete set of callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks)

## Advanced staggering

Create stunning effects in seconds with the built-in Stagger utility function.

- [Time staggering](https://animejs.com/documentation/stagger/time-staggering)
- [Values staggering](https://animejs.com/documentation/stagger/values-staggering)
- [Timeline positions staggering](https://animejs.com/documentation/stagger/timeline-positions-staggering)

## SVG toolset

Morph shapes, follow motion paths, and draw lines easily with the built-in SVG utilities.

- [Shape morphing](https://animejs.com/documentation/svg/morphto)
- [Line drawing](https://animejs.com/documentation/svg/createdrawable)
- [Motion path](https://animejs.com/documentation/svg/createmotionpath)

## Springs and draggable

Drag, snap, flick and throw HTML elements with the fully-featured Draggable API.

- [Versatile settings](https://animejs.com/documentation/draggable/draggable-settings)
- [Comprehensive callbacks](https://animejs.com/documentation/draggable/draggable-callbacks)
- [Useful methods](https://animejs.com/documentation/draggable/draggable-methods)

## Runs like 
clockwork

Orchestrate animation sequences and keep callbacks in sync with the powerful Timeline API.

- [Synchronise animations](https://animejs.com/documentation/timeline/add-animations)
- [Advanced time positions](https://animejs.com/documentation/timeline/time-position)
- [Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings)

## Responsive animations

Make animations respond to media queries easily with the Scope API.

- [Media queries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries)
- [Custom root element](https://animejs.com/documentation/scope/scope-parameters/root)
- [Scopped methods](https://animejs.com/documentation/scope/register-method-function)

## A lightweight 
and modular API

Keep your bundle size small by only importing the parts you need.

## Our sponsors

Anime.js is 100% free and is only made possible with the help of our sponsors.

 [Become a sponsor](https://github.com/sponsors/juliangarnier?ref=animejs 'Become a sponsor')

 [TestMu AI](https://www.testmuai.com/?utm_medium=sponsor&utm_source=animejs?ref=animejs 'TestMu AI')

- [Become a sponsor](https://github.com/sponsors/juliangarnier)

## Start animating

Get started quickly with our in-depth documentation.

- [Getting started](https://animejs.com/documentation/getting-started)
- [Timer](https://animejs.com/documentation/timer)
- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)
- [Animatable](https://animejs.com/documentation/animatable)
- [Draggable](https://animejs.com/documentation/draggable)
- [Scope](https://animejs.com/documentation/scope)
- [Scroll](https://animejs.com/documentation/events/onscroll)
- [SVG](https://animejs.com/documentation/svg)
- [Utils](https://animejs.com/documentation/utilities)
- [Easings](https://animejs.com/documentation/easings)
- [WAAPI](https://animejs.com/documentation/web-animation-api)

```
animate('.square', {
  rotate: 90,
  loop: true,
  ease: 'inOutExpo',
});
```

```
animate('.shape', {
  x: random(-100, 100),
  y: random(-100, 100),
  rotate: random(-180, 180),
  duration: random(500, 1000),
  composition: 'blend',
});
```

```
animate('.car', {
  ...createMotionPath('.circuit'),
});

animate(createDrawable('.circuit'), {
  draw: '0 1',
});

animate('.circuit-a', {
  d: morphTo('.circuit-b'),
});
```

```
animate(createDrawable('path'), {
  draw: ['0 0', '0 1', '1 1'],
  delay: stagger(40),
  ease: 'inOut(3)',
  autoplay: onScroll({ sync: true }),
});
```

```
const options = {
  grid: [13, 13],
  from: 'center',
};

createTimeline()
  .add('.dot', {
    scale: stagger([1.1, .75], options),
    ease: 'inOutQuad',
  }, stagger(200, options));
```

```
createDraggable('.circle', {
  releaseEase: createSpring({
    stiffness: 120,
    damping: 6,
  })
});
```

```
createTimeline()
  .add('.tick', {
    y: '-=6',
    duration: 50,
  }, stagger(10))
  .add('.ticker', {
    rotate: 360,
    duration: 1920,
  }, '<');
```

```
createScope({
  mediaQueries: {
    portrait: '(orientation: portrait)',
  }
})
.add(({ matches }) => {
  const isPortrait = matches.portrait;
  createTimeline().add('.circle', {
    y: isPortrait ? 0 : [-50, 50, -50],
    x: isPortrait ? [-50, 50, -50] : 0,
  }, stagger(100));
});
```

### Bundle size

24.50 KB

- Timer 5.60 KB
- Animation +5.20 KB
- Timeline +0.55 KB
- Animatable +0.40 KB
- Draggable +6.41 KB
- Scroll +4.30 KB
- Scope +0.22 KB
- SVG 0.35 KB
- Stagger +0.48 KB
- Spring 0.52 KB
- WAAPI 3.50 KB

### Funding goal

13%

[Glauber](https://github.com/glauber-sampaio) [RickEvry](https://github.com/rickevry) [Eric Van Holtz](https://github.com/vonscriptor) [michelducker](https://github.com/michelducker) [Joseph Clay](https://github.com/JosephClay) [Charles](https://github.com/chrlsdesign) [Eric Yang](https://github.com/Ehriqhck) [TestMu AI Open Source Office (Formerly LambdaTest)](https://github.com/LambdaTest-Inc) [Daniel Cruz](https://github.com/ddanielcruzz) [Sören Meier](https://github.com/soerenmeier) [yellow1912](https://github.com/yellow1912) [David Lapointe Gilbert](https://github.com/davidwebca) [Stephane Demotte](https://github.com/stephanedemotte) [bparrillo](https://github.com/bparrillo) [Miguel Bermudez](https://github.com/miguelbermudez) [Niklas Lepistö](https://github.com/laznic) [Artisann](https://github.com/ImArtisann) [Maddison Cohodas](https://github.com/b0o) [Oliver Tacke](https://github.com/otacke) [Tyler Fahey](https://github.com/twfahey1) [Astral\_rider](https://github.com/Aurora-creeper) [Aaron Iker](https://github.com/aaroniker) [Henrik Stridsman](https://github.com/henrik377) [Justin Hall](https://github.com/jhalljhall) [Jérémy Vienney](https://github.com/jeremyvienney) [Vitalii Nevidomyi](https://github.com/nevidomy) [Makio64](https://github.com/Makio64) [Robert Stark](https://github.com/iamrobert) [devqrofertas](https://github.com/devqrofertas) [Mase Graye](https://github.com/masegraye) [Neil Gardose](https://github.com/nkpgardose) [Atle Selbek](https://github.com/Nolux) [Tim Kang](https://github.com/illestrater) [Chuck Dries](https://github.com/chuckdries) [Kristen](https://github.com/pzuraq) [Johan Viberg](https://github.com/johanviberg) [Qonvoy](https://github.com/qonvoy) [csskiller](https://github.com/csskiller) [AliGGGG](https://github.com/Azizultra32) [emvibrand](https://github.com/emvibrand) [Ricardo Gonzalez](https://github.com/BGS-RGonzalez) [Nicolaj Andersen](https://github.com/spartanberserker) [Michael Shumakov](https://github.com/m-shum) [Stefan](https://github.com/okydk) [Dylan](https://github.com/dyl-kh) [willmcinnis](https://github.com/willmcinnis) [Onur Oztaskiran](https://github.com/onuro) [origamisage](https://github.com/origamisage) [Dalton Gray](https://github.com/daltongray) [Aaron Wade](https://github.com/areus)

Support the project, [become a sponsor](https://github.com/sponsors/juliangarnier).

###### Sponsors

 [Cut Data Warehouse Costs by 54% Sub-second maintenance. 2x read/write performance. Built-in vector search for AI apps.](https://srv.carbonads.net/ads/click/x/GTND427YFTAILK3UCKBLYKQUFTAIV23LCTYD4Z3JCAADL2QYCKBDV27KCE7IPK3ECEAIP2JNCA7DP2JNCKYDK2QKC6SIE537CKSI6K3EHJNCLSIZ)

[ads via Carbon](http://carbonads.net/?utm_source=animejscom&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon)

- [Become a sponsor](https://github.com/sponsors/juliangarnier 'Become a sponsor')

###### Site

- [Home](https://animejs.com 'Documentation')
- [Documentation](https://animejs.com/documentation 'Documentation')
- [Easings editor](https://animejs.com/easing-editor 'Easing functions editor')
- [Learn](https://animejs.com/learn 'Learn')

###### Socials

- [X / Twitter](https://x.com/juliangarnier)
- [Bluesky](https://bsky.app/profile/animejs.com)
- [GitHub](https://github.com/juliangarnier/anime)
- [CodePen](https://codepen.io/collection/Poerqa)

 [Anime.js | JavaScript Animation Engine](https://animejs.com)

© 2026 [Julian Garnier](https://juliangarnier.com)

###### Stay in the loop

 Thanks! Check your inbox to confirm your subscription.

Something went wrong. Please try again later or email me directly at [julian@animejs.com](mailto:julian@animejs.com)