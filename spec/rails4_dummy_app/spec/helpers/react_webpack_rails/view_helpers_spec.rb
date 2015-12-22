require 'rails_helper'

RSpec.describe ReactWebpackRails::ViewHelpers, type: :helper do
  describe '#react_component' do
    subject { helper.react_component('Todo', {todos: ['write tests', 'write moar']}, tag: 'li') }

    it { expect(helper).to respond_to(:react_component) }

    it 'renders html tag' do
      expect(subject).to be_an_instance_of(ActiveSupport::SafeBuffer)
      expect(subject).to eq(
        "<li data-react-element=\"true\" data-integration-name=\"react-component\" "\
        "data-payload=\"{&quot;todos&quot;:[&quot;write tests&quot;,&quot;write moar&quot;]}\" "\
        "data-options=\"{&quot;tag&quot;:&quot;li&quot;,&quot;name&quot;:&quot;Todo&quot;}\" "\
        "name=\"Todo\"></li>"
      )
    end

    context 'when props are passed as String' do
      subject { helper.react_component('Todo', 'not even a json') }

      it 'does not cast to JSON' do
        expect(subject).to include("data-payload=\"not even a json\"")
      end
    end

    context 'when props are not passed' do
      subject { helper.react_component('Todo') }

      it 'sets an empty object as default' do
        expect(subject).to include "data-payload=\"{}\""
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
