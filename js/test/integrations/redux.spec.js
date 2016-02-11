import expect, { spyOn } from 'expect';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

import subject from '../../src/integrations/redux';

const fakeReducer = function() {};
const validStore = function(initialState) {
  return createStore(fakeReducer, initialState)
};

describe('ReduxIntegration', function () {
  afterEach(function() {
    subject.stores = {};
    subject.mountedStores = {};
    subject.containers = {};
  });

  describe('.constructor', function() {
    it('intializes empty stores, mountedStores and containers dictionaries', function () {
      expect(subject.stores).toEqual({});
      expect(subject.mountedStores).toEqual({});
      expect(subject.containers).toEqual({});
    });
  });

  describe('#registerStore', function() {
    it('throws an error', function() {
      expect(function() {
        const invalidStore = {};
        subject.registerStore('InvalidStore', invalidStore);
      })
      .toThrow(/Error when registering 'InvalidStore' store: must be a function./);
    });

    it('adds valid store to the storage', function() {
      subject.registerStore('ValidStore', validStore);

      expect(subject.stores.ValidStore).toBe(validStore);
    });
  });

  describe('#mountStore', function() {
    it('throws an error when store is not a function', function(){
      expect(function() {
        subject.mountStore('InvalidStore', {});
      })
      .toThrow(/Error when mounting 'InvalidStore' store: must be a function./);
    });

    it('throws an error when store does not returns valid object', function(){
      subject.registerStore('InvalidStore', function() { return 'store' });
      expect(function() {
        subject.mountStore('InvalidStore', {});
      })
      .toThrow(/Error when mounting 'InvalidStore' store: must be a valid Redux store./);
    });

    it('ads store to mountedStores storage', function() {
      subject.registerStore('ValidStore', validStore);
      const initialState = {};
      subject.mountStore('ValidStore', initialState);

      expect(subject.mountedStores.ValidStore).toEqual(validStore(initialState));
    });
  });
});
