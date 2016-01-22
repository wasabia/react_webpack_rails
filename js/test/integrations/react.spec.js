import expect, { spyOn } from 'expect';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import subject from '../../src/integrations/react';

class HelloComponent extends React.Component {
  static propTypes() {
    return {
      name: PropTypes.string.isRequired,
    };
  }

  render() {
    return (<div>Hello World! {this.props.name}</div>);
  }
}

describe('ReactIntegration', function () {
  afterEach(function () {
    subject.components = {};
  });

  describe('.constructor', function () {
    it('intializes empty components dictionary', function () {
      expect(subject.components).toEqual({});
    });
  });

  describe('#registerComponent', function () {
    it('adds component to the components storage', function () {
      subject.registerComponent('HelloWorld', HelloComponent);
      expect(subject.components.HelloWorld).toBe(HelloComponent);
    });
  });

  describe('#getComponent', function () {
    it('returns component by name', function () {
      subject.registerComponent('HelloWorld', HelloComponent);
      expect(subject.getComponent('HelloWorld')).toBe(HelloComponent);
    });

    it('returns undefined if component is not found', function () {
      expect(subject.getComponent('HelloWorld')).toBe(undefined);
    });
  });

  describe('#createComponent', function () {
    it('creates component with given props', function () {
      subject.registerComponent('HelloWorld', HelloComponent);
      const component = subject.createComponent('HelloWorld', { name: 'erwer' });

      expect(component.props).toEqual({ name: 'erwer' });
      expect(component.type).toBe(HelloComponent);
    });
  });

  describe('#unmountComponent', function () {
    it('unmount component at specified node', function () {
      const unmountSpy = spyOn(ReactDOM, 'unmountComponentAtNode');
      subject.unmountComponent({ node: 'someNode' });

      expect(unmountSpy.calls.length).toEqual(1);
      expect(unmountSpy).toHaveBeenCalledWith({ node: 'someNode' });
    });
  });

  describe('#integrationWrapper', function () {
    describe('function mount', function () {
      it('calls renderComponent', function () {
        const mountSpy = spyOn(subject, 'renderComponent');
        const config = { payload: { props: 'erwer' }, node: { node: 'someNode' } };
        const options = { name: 'componentName' };
        subject.integrationWrapper.mount(config, options);

        expect(mountSpy.calls.length).toEqual(1);
        expect(mountSpy).toHaveBeenCalledWith(
          'componentName',
          { props: 'erwer' },
          { node: 'someNode' }
        );
      });
    });

    describe('function unmount', function () {
      it('calls unmountComponent', function () {
        const unmountSpy = spyOn(subject, 'unmountComponent');
        const config = { node: { node: 'someNode' } };
        subject.integrationWrapper.unmount(config);

        expect(unmountSpy.calls.length).toEqual(1);
        expect(unmountSpy).toHaveBeenCalledWith({ node: 'someNode' });
      });
    });
  });
});
