require 'rails_helper'

RSpec.describe ReactWebpackRails::ViewHelpers, type: :helper do
  describe '#react_element' do
    subject { helper.react_element('react-component') }

    it { expect(helper).to respond_to(:react_component) }

    it 'renders html tag' do
      expect(subject).to be_an_instance_of(ActiveSupport::SafeBuffer)
      expect(subject).to eq(
        "<div data-integration-name=\"react-component\" data-options=\"{}\" "\
        "data-payload=\"{}\" data-react-element=\"true\"></div>"
      )
    end

    context 'when payload is a String' do
      subject { helper.react_element('elementName', 'not even a json') }

      it 'does not cast to JSON' do
        expect(subject).to include("data-payload=\"not even a json\"")
      end
    end

    context 'when paload is a hash' do
      subject { helper.react_element('react-component', foo: :bar) }
      it 'is does cast to JSON' do
        expect(subject).to include("data-payload=\"{&quot;foo&quot;:&quot;bar&quot;}\"")
      end
    end

    context 'when options without tag given' do
      subject { helper.react_element('react-component', {}, {foo: :bar}) }
      it 'is renders div' do
        expect(subject).to include('<div ', '></div>')
      end

      it 'pass given options' do
        expect(subject).to include("data-options=\"{&quot;foo&quot;:&quot;bar&quot;}\"")
      end
    end

    context 'when options with tag given' do
      subject { helper.react_element('react-component', {}, {foo: :bar}, {tag: :li}) }
      it 'is renders passed tag' do
        expect(subject).to include('<li ', '></li>')
      end

      it 'pass given options without tag' do
        expect(subject).to include("data-options=\"{&quot;foo&quot;:&quot;bar&quot;}\"")
      end
    end
  end

  describe '#react_component' do
    it { expect(helper).to respond_to(:react_component) }

    it 'wraps #react_component with proper options' do
      expect(helper)
        .to receive(:react_element)
        .with('react-component', { foo: 'bar' }, {name: 'Todo'}, {})
        .once
      helper.react_component('Todo', foo: 'bar')
    end

    context 'when props are not passed' do
      subject { helper.react_component('Todo') }

      it 'sets an empty object as default' do
        expect(helper).to receive(:react_element).with('react-component', {}, {name: 'Todo'}, {}).once
        helper.react_component('Todo')
      end
    end
  end

  describe '#react_router' do
    it { expect(helper).to respond_to(:react_router) }

    it 'wraps #react_component with proper options' do
      expect(helper).to receive(:react_element).with('react-router', {}, name: 'TodoRouter').once
      helper.react_router('TodoRouter')
    end
  end
end
