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

    context 'when payload is a hash' do
      subject { helper.react_element('react-component', foo: :bar) }
      it 'is does cast to JSON' do
        expect(subject).to include("data-payload=\"{&quot;foo&quot;:&quot;bar&quot;}\"")
      end
    end

    context 'when options without tag given' do
      subject { helper.react_element('react-component', {}, foo: :bar) }
      it 'is renders div' do
        expect(subject).to include('<div ', '></div>')
      end

      it 'pass given options' do
        expect(subject).to include("data-options=\"{&quot;foo&quot;:&quot;bar&quot;}\"")
      end
    end

    context 'when options with tag given' do
      subject { helper.react_element('react-component', {}, { foo: :bar }, { tag: :li }) }
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

    context 'with ssr: false' do
      it 'wraps #react_component with proper options' do
        expect(helper)
          .to receive(:react_element)
          .with('react-component', { foo: 'bar' }, { name: 'Todo' }, {})
          .once
        helper.react_component('Todo', { foo: 'bar' })
      end

      context 'when props are not passed' do
        subject { helper.react_component('Todo') }

        it 'sets an empty object as default' do
          expect(helper).to receive(:react_element)
            .with('react-component', {}, { name: 'Todo' }, {}).once
          helper.react_component('Todo')
        end
      end
    end

    context 'with ssr: true (server-side rendering)' do
      let(:node_renderer) { double('node_renderer') }
      let(:response) { double('response') }
      let(:ssred_component) do
        File.read(Rails.root.join('spec/fixtures/ssred_component.html'))
      end

      before do
        allow(response).to receive(:body) { ssred_component }
        allow_any_instance_of(ReactWebpackRails::NodeRenderer)
          .to receive(:run) { response }
      end

      it 'initializes NodeRenderer with proper args' do
        allow(ReactWebpackRails::NodeRenderer)
          .to receive(:new) { node_renderer }
        allow(node_renderer).to receive(:run) { response }
        expect(ReactWebpackRails::NodeRenderer).to receive(:new)
          .with('react-component', props: { foo: 'bar' }, name: 'Todo')
        helper.react_component('Todo', { foo: 'bar' }, ssr: true)
      end

      it 'calls NodeRenderer instance' do
        expect_any_instance_of(ReactWebpackRails::NodeRenderer)
          .to receive(:run)
        helper.react_component('Todo', { foo: 'bar' }, ssr: true)
      end

      it 'retrieves response body in a block' do
        expect(response).to receive(:body).and_return(ssred_component)
        helper.react_component('Todo', { foo: 'bar' }, ssr: true)
      end
    end
  end

  describe '#react_router' do
    it { expect(helper).to respond_to(:react_router) }

    it 'wraps #react_component with proper options' do
      expect(helper).to receive(:react_element)
        .with('react-router', {}, name: 'TodoRouter').once
      helper.react_router('TodoRouter')
    end
  end
end
