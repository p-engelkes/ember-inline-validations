import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: {
    validators: [
      validator('presence', true),
      validator('length', {
        max: 200
      })
    ]
  },
  firstName: {
    validators: [
      validator('presence', true),
      validator('length', {
        max: 30
      })
    ]
  },
  lastName: {
    validators: [
      validator('presence', true),
      validator('length', {
        min: 5,
        max: 30
      })
    ]
  }
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string')
});
