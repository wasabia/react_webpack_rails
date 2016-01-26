import expect from 'expect';
import reactIntegration from '../src/integrations/react';
import reactRouterIntegration from '../src/integrations/react-router';
import subject from '../src/integrations-manager';

describe('IntegrationsManager', function () {
  describe('.constructor', function () {
    it('by default sets react and react-router integrations', function () {
      expect(subject.integrations['react-component']).toEqual(
        reactIntegration.integrationWrapper
      );
      expect(subject.integrations['react-router']).toEqual(
        reactRouterIntegration.integrationWrapper
      );
      expect(Object.keys(subject.integrations).length).toEqual(2);
    });
  });

  describe('#get', function () {
    it('returns integration by name', function () {
      expect(subject.get('react-component')).toEqual(
        reactIntegration.integrationWrapper
      );
    });

    it('returns undefined if name is invalid', function () {
      expect(subject.get('invalidName')).toBe(undefined);
    });
  });

  describe('#register', function () {
    it('registers integration', function () {
      subject.register('newIntegration', {});

      expect(subject.integrations.newIntegration).toEqual({});
    });
  });
});
