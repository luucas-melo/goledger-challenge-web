import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
html {
  box-sizing: border-box !important;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/*******************
 Core body defaults
 @see https://hankchizljaw.com/wrote/a-modern-css-reset/
 *******************/
body {
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  overflow: overlay;
  font-family: Roboto;
}

::-webkit-scrollbar {
  width: 10px;
  background: rgba(255, 255, 255, 0);
  opacity: 0;
}
::-webkit-scrollbar-thumb {
  background: var(--secondary-color);
  border-radius: 5px;
}

/****************************
 Generic Margins and Paddings
 ****************************/
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
figcaption,
hr,
dl,
dd {
  margin: 0;
  padding: 0;
}

/*******************
 Lists
 *******************/
ul {
  list-style: none;
}

/*******************
 Forms and buttons
 *******************/
input,
textarea,
select,
button {
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
}

/* I usually expand input and textarea to full-width */
input[type="text"],
textarea {
  width: 100%;
}

/* More friendly border */
input,
textarea,
button {
  border: 1px solid gray;
}

/* Some defaults for one-liner buttons */
button {
  padding: 0.75em 1em;
  line-height: inherit;
  border-radius: 0;
  background-color: transparent;
}

button * {
  pointer-events: none;
}

/***********************************
 Easy responsive for media elements
 ***********************************/
img,
iframe,
video,
object,
embed {
  display: block;
  max-width: 100%;
}

svg {
  max-width: 100%;
}

/*******************
 Useful table styles
 *******************/
table {
  table-layout: fixed;
  width: 100%;
}

/*******************
 The hidden attribute
 *******************/
[hidden] {
  opacity: 0;
  visibility: hidden;
}

/*******************
 Noscript
 *******************/
noscript {
  display: block;
  margin-bottom: 1em;
  margin-top: 1em;
}

/*******************
 Tabindex
 *******************/
[tabindex="-1"] {
  outline: none !important;
}

/*******************
 Remove animations and transitions
 @see https://hankchizljaw.com/wrote/a-modern-css-reset/
 *******************/
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/*******************
 * Screen-ready only class to hide content visually
 * Solution by Joe Watkins.
 * @see https://zellwk.com/blog/hide-content-accessibly/
 *******************/
.sr-only {
  position: absolute;
  width: 1px;
  height: auto;
  margin: 0;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
  white-space: nowrap;
  font-family: Roboto, sans-serif, 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a{
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

p {
  ${props => props.theme.colors.text};
}


`
