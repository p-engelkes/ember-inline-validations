import Ember from 'ember';

const { computed, defineProperty} = Ember;

export default Ember.Component.extend({
  classNames: ['validated-input', 'validate'],
  classNameBindings: ['showErrorClass:invalid', 'isValid:valid'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  isTyping: false,

  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'hasContent', 'validation'),
  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),
  cssErrorClass: computed(function() {
    var cssClass = "validate";
    if (this.isValid) {
      return cssClass + " valid";
    } else {
      return cssClass + " invalid";
    }
  })
});
