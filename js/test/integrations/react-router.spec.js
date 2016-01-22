import expect, { spyOn } from 'expect';
import ReactDOM from 'react-dom';
import subject from '../../src/integrations/react-router';

const HelloRouter = {};

describe('ReactIntegration', function () {
  afterEach(function () {
    subject.routers = {};
    subject.enabled = false;
  });

  describe('.constructor', function () {
    it('intializes empty components dictionary', function () {
      expect(subject.routers).toEqual({});
    });

    it('by default sets router presence flag to false', function () {
      expect(subject.enabled).toBe(false);
    });
  });

  describe('#registerRouter', function () {
    it('adds router to the routers storage', function () {
      subject.registerRouter('HelloRouter', HelloRouter);
      expect(subject.routers.HelloRouter).toBe(HelloRouter);
    });
  });

  describe('#getRouter', function () {
    it('returns route by name', function () {
      subject.registerRouter('HelloRouter', HelloRouter);
      expect(subject.getRouter('HelloRouter')).toBe(HelloRouter);
    });

    it('returns undefined if route is not found', function () {
      expect(subject.getRouter('HelloRouter')).toBe(undefined);
    });
  });

  describe('#renderRouter', function () {
    beforeEach(function () {
      subject.registerRouter('HelloRouter', HelloRouter);
    });

    context('when router is present', function () {
      it('throws an error', function () {
        expect(function () {
          subject.renderRouter('HelloRouter', { node: 'someNode' });
        })
        .withContext(subject.enabled = true)
        .toThrow(/Error when rendering HelloRouter/);
      });
    });

    context('when router does not exist', function () {
      let ReactDOMSpy;
      beforeEach(function () {
        ReactDOMSpy = spyOn(ReactDOM, 'render');
      });

      afterEach(function () {
        expect.restoreSpies();
      });

      it('sets router presence flag to true', function () {
        subject.renderRouter('HelloRouter', { node: 'someNode' });

        expect(subject.enabled).toBe(true);
      });

      it('calls ReactDOM renderer once', function () {
        subject.renderRouter('HelloRouter', { node: 'someNode' });

        expect(ReactDOMSpy.calls.length).toEqual(1);
        expect(ReactDOMSpy).toHaveBeenCalledWith(HelloRouter, { node: 'someNode' });
      });
    });
  });

  describe('#unmountRouter', function () {
    let ReactDOMSpy;
    beforeEach(function () {
      ReactDOMSpy = spyOn(ReactDOM, 'unmountComponentAtNode');
    });

    afterEach(function () {
      expect.restoreSpies();
    });

    it('unmounts router component at specified node', function () {
      subject.unmountRouter({ node: 'someNode' });

      expect(ReactDOMSpy.calls.length).toEqual(1);
      expect(ReactDOMSpy).toHaveBeenCalledWith({ node: 'someNode' });
    });

    it('allows to add new router', function () {
      subject.unmountRouter({ node: 'someNode' });
      expect(subject.enabled).toBe(false);
    });
  });

  describe('#integrationWrapper', function () {
    describe('function mount', function () {
      it('calls renderComponent', function () {
        const mountSpy = spyOn(subject, 'renderRouter');
        const config = { node: { node: 'someNode' } };
        const options = { name: 'routerName' };
        subject.integrationWrapper.mount(config, options);

        expect(mountSpy.calls.length).toEqual(1);
        expect(mountSpy).toHaveBeenCalledWith(
          'routerName',
          { node: 'someNode' }
        );
      });
    });

    describe('function unmount', function () {
      it('calls unmountComponent', function () {
        const unmountSpy = spyOn(subject, 'unmountRouter');
        const config = { node: { node: 'someNode' } };
        subject.integrationWrapper.unmount(config);

        expect(unmountSpy.calls.length).toEqual(1);
        expect(unmountSpy).toHaveBeenCalledWith({ node: 'someNode' });
      });
    });
  });
});
