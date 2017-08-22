import '../polymer/polymer.js';
import { PaperInputBehavior } from '../paper-input/paper-input-behavior.js';
import '../paper-input/paper-input-container.js';
import '../paper-input/paper-input-error.js';
import '../iron-input/iron-input.js';
import '../iron-icon/iron-icon.js';
import { IronFormElementBehavior } from '../iron-form-element-behavior/iron-form-element-behavior.js';
import '../iron-flex-layout/iron-flex-layout.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
import { Element } from '../polymer/polymer-element.js';
import { DomModule } from '../polymer/lib/elements/dom-module.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="gold-cc-cvc-input">
  <template>
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
      }
      input {
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

    <paper-input-container id="container" disabled\$="[[disabled]]" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" invalid="[[invalid]]">

      <label slot="label" hidden\$="[[!label]]">[[label]]</label>

      <span id="template-placeholder"></span>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

    </paper-input-container>
  </template>


  <template id="v0">
    <div class="container">
      <input is="iron-input" id="input" slot="input" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" bind-value="{{value}}" prevent-invalid-input="" allowed-pattern="[0-9]" required\$="[[required]]" type="tel" autocomplete="cc-csc" name\$="[[name]]" disabled\$="[[disabled]]" invalid="{{invalid}}" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" maxlength\$="[[_requiredLength]]" size\$="[[size]]">
      <div class="icon-container" slot="suffix">
        <iron-icon id="icon" src="cvc_hint.png" hidden\$="[[_amex]]" alt="cvc"></iron-icon>
        <iron-icon id="amexIcon" hidden\$="[[!_amex]]" src="cvc_hint_amex.png" alt="amex cvc"></iron-icon>
      </div>
   </div>
  </template>

  <template id="v1">
    <iron-input id="input" slot="input" bind-value="{{value}}" allowed-pattern="[0-9]" invalid="{{invalid}}">
      <input id="nativeInput" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" required\$="[[required]]" type="tel" autocomplete="cc-csc" name\$="[[name]]" disabled\$="[[disabled]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" maxlength\$="[[_requiredLength]]" size\$="[[size]]">
    </iron-input>
      <div class="icon-container" slot="suffix">
        <iron-icon id="icon" src="[[resolveUrl('cvc_hint.png')]]" hidden\$="[[_amex]]" alt="cvc"></iron-icon>
        <iron-icon id="amexIcon" hidden\$="[[!_amex]]" src="[[resolveUrl('cvc_hint_amex.png')]]" alt="amex cvc"></iron-icon>
      </div>
    </template>

  
</dom-module>`;

document.head.appendChild($_documentContainer);
Polymer({

  is: 'gold-cc-cvc-input',

  properties: {

    /**
     * The label for this input.
     */
    label: {
      type: String,
      value: 'CVC'
    },

    /**
     * The type of card that the CVC is for.
     */
    cardType: {
      type: String,
      value: ''
    },

    _requiredLength: {
      type: Number,
      computed: '_computeRequiredLength(cardType)'
    },

    _amex: {
      type: Boolean,
      computed: '_computeIsAmex(cardType)'
    },

    value: {
      type: String,
      observer: '_onValueChanged'
    }

  },

  behaviors: [
    PaperInputBehavior,
    IronFormElementBehavior
  ],

  observers: [
    '_onFocusedChanged(focused)'
  ],

  ready: function() {
    if (!this.value && Element) {
      this.value = '';
    }

    else if (this.value && !Element) {
       this._handleAutoValidate();
    }
  },

  beforeRegister: function() {
    var template = DomModule.import('gold-cc-cvc-input', 'template');
    var version = Element ? 'v1' : 'v0';
    var inputTemplate = DomModule.import('gold-cc-cvc-input', 'template#' + version);
    var inputPlaceholder = template.content.querySelector('#template-placeholder');
    if (inputPlaceholder) {
      inputPlaceholder.parentNode.replaceChild(inputTemplate.content, inputPlaceholder);
    }
  },

  /**
  * Returns a reference to the focusable element. Overridden from PaperInputBehavior
  * to correctly focus the native input.
  */
  get _focusableElement() {
    return Element ? this.inputElement._inputElement : this.inputElement;
  },

  // Note: This event is only available in the 2.0 version of this element.
  // In 1.0, the functionality of `_onIronInputReady` is done in
  // PaperInputBehavior::attached.
  listeners: {
    'iron-input-ready': '_onIronInputReady'
  },

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
    var valid =
        (this.$.input.validate() &&
        this.value.length == this._requiredLength) ||
        !this.required && this.value == '';

    this.invalid = !valid;
    // Update the container and its addons (i.e. the custom error-message).
    this.$.container.invalid = !valid;
    this.$.container.updateAddons({
      inputElement: this.$.input,
      value: this.value,
      invalid: !valid
    });

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
