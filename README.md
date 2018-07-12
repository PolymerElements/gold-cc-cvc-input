[![Published on NPM](https://img.shields.io/npm/v/@polymer/gold-cc-cvc-input.svg)](https://www.npmjs.com/package/@polymer/gold-cc-cvc-input)
[![Build status](https://travis-ci.org/PolymerElements/gold-cc-cvc-input.svg?branch=master)](https://travis-ci.org/PolymerElements/gold-cc-cvc-input)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/gold-cc-cvc-input)

## &lt;gold-cc-cvc-input&gt;

`gold-cc-cvc-input` is a single-line text field with Material Design styling
for entering a credit card's CVC (Card Verification Code). It supports both
4-digit Amex CVCs and non-Amex 3-digit CVCs

See: [Documentation](https://www.webcomponents.org/element/@polymer/gold-cc-cvc-input),
  [Demo](https://www.webcomponents.org/element/@polymer/gold-cc-cvc-input/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/gold-cc-cvc-input
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/gold-cc-input/gold-cc-input.js';
      import '@polymer/gold-cc-cvc-input/gold-cc-cvc-input.js';
    </script>
  </head>
  <body>
    <gold-cc-input card-type="{{cardType}}"></gold-cc-input>
    <gold-cc-cvc-input card-type="[[cardType]]"></gold-cc-cvc-input>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/gold-cc-input/gold-cc-input.js';
import '@polymer/gold-cc-cvc-input/gold-cc-cvc-input.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <gold-cc-input card-type="{{cardType}}"></gold-cc-input>
      <gold-cc-cvc-input card-type="[[cardType]]"></gold-cc-cvc-input>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/gold-cc-cvc-input
cd gold-cc-cvc-input
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```