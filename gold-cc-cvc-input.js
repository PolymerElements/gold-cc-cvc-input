/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-input/paper-input-error.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

/**
`gold-cc-cvc-input` is a single-line text field with Material Design styling
for entering a credit card's CVC (Card Verification Code). It supports both
4-digit Amex CVCs and non-Amex 3-digit CVCs

    <gold-cc-cvc-input></gold-cc-cvc-input>

    <gold-cc-cvc-input card-type="amex"></gold-cc-cvc-input>

It may include an optional label, which by default is "CVC".

    <gold-cc-cvc-input label="Card Verification Value"></gold-cc-cvc-input>

It can be used together with a `gold-cc-input` by binding the `cardType`
property:

    <gold-cc-input card-type="{{cardType}}"></gold-cc-input>
    <gold-cc-cvc-input card-type="[[cardType]]"></gold-cc-cvc-input>

### Validation

The input considers a valid amex CVC to be 4 digits long, and 3 digits
otherwise. The `amex` attribute can also be bound to a `gold-cc-input`'s
`card-type` attribute.

The input can be automatically validated as the user is typing by using
the `auto-validate` and `required` attributes. For manual validation, the
element also has a `validate()` method, which returns the validity of the
input as well sets any appropriate error messages and styles.

See `Polymer.PaperInputBehavior` for more API docs.

### Styling

See `Polymer.PaperInputContainer` for a list of custom properties used to
style this element.

Custom property | Description | Default
----------------|-------------|----------
`--gold-cc-cvc-input-icon` | Mixin applied to the icon | `{}`

@group Gold Elements
@demo demo/index.html
*/
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }

      iron-icon {
        margin-left: 10px;
        @apply --gold-cc-cvc-input-icon;
      }

      iron-icon[hidden] {
        display: none !important;
      }

      .container {
        @apply --layout-horizontal;
      }

      input {
        @apply --layout-flex;
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: bottom;
        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;
        @apply --paper-font-subhead;
        @apply --paper-input-container-input;
      }
      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
    </style>

    <paper-input-container id="container" disabled$="[[disabled]]" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" invalid="[[invalid]]">

      <label slot="label" hidden$="[[!label]]">[[label]]</label>

      <iron-input id="input" slot="input" bind-value="{{value}}" allowed-pattern="[0-9]" invalid="{{invalid}}">
        <input id="nativeInput" aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" required$="[[required]]" type="tel" autocomplete="cc-csc" name$="[[name]]" disabled$="[[disabled]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" maxlength$="[[_requiredLength]]" size$="[[size]]">
      </iron-input>
      <div class="icon-container" slot="suffix">
        <iron-icon id="icon" src="[[resolveUrl('cvc_hint.png')]]" hidden$="[[_amex]]" alt="cvc"></iron-icon>
        <iron-icon id="amexIcon" hidden$="[[!_amex]]" src="[[resolveUrl('cvc_hint_amex.png')]]" alt="amex cvc"></iron-icon>
      </div>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

    </paper-input-container>
  `,
  is: 'gold-cc-cvc-input',

  importMeta: import.meta,

  properties: {

    /**
     * The label for this input.
     */
    label: {
      type: String,
      value: 'CVC',
    },

    /**
     * The type of card that the CVC is for.
     */
    cardType: {
      type: String,
      value: '',
    },

    _requiredLength: {
      type: Number,
      computed: '_computeRequiredLength(cardType)',
    },

    _amex: {
      type: Boolean,
      computed: '_computeIsAmex(cardType)',
    },

    value: {
      type: String,
      observer: '_onValueChanged',
    }

  },

  behaviors: [PaperInputBehavior, IronFormElementBehavior],

  observers: ['_onFocusedChanged(focused)'],

  ready: function() {
    if (!this.value) {
      this.value = '';
    }
  },

  /**
   * Returns a reference to the focusable element. Overridden from
   * PaperInputBehavior to correctly focus the native input.
   */
  get _focusableElement() {
    return this.inputElement._inputElement;
  },

  // Note: This event is only available in the 2.0 version of this element.
  // In 1.0, the functionality of `_onIronInputReady` is done in
  // PaperInputBehavior::attached.
  listeners: {'iron-input-ready': '_onIronInputReady'},

  _onIronInputReady: function() {
    // Only validate when attached if the input already has a value.
    if (!!this.inputElement.bindValue) {
      this._handleAutoValidate();
    }
  },

  /**
   * A handler that is called on input
   */
  _onValueChanged: function(value, oldValue) {
    // The initial property assignment is handled by `ready`.
    if (oldValue == undefined) {
      return;
    }
    this._handleAutoValidate();
  },

  _computeRequiredLength: function(cardType) {
    return this._computeIsAmex(cardType) ? 4 : 3;
  },

  _computeIsAmex: function(cardType) {
    return cardType.toLowerCase() == 'amex';
  },

  /**
   * Returns true if the element has a valid value, and sets the visual
   * error state.
   *
   * @return {boolean} Whether the input is currently valid or not.
   */
  validate: function() {
    // Empty, non-required input is valid.
    var valid = (this.$.input.validate() &&
                 this.value.length == this._requiredLength) ||
        !this.required && this.value == '';

    this.invalid = !valid;
    // Update the container and its addons (i.e. the custom error-message).
    this.$.container.invalid = !valid;
    this.$.container.updateAddons(
        {inputElement: this.$.input, value: this.value, invalid: !valid});

    return valid;
  },

  /**
   * Overidden from Polymer.IronControlState.
   */
  _onFocusedChanged: function(focused) {
    if (!this._focusableElement) {
      return;
    }
    if (!focused) {
      this._handleAutoValidate();
    }
  }
})
