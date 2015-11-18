require 'rails_helper'

RSpec.describe ReactWebpackRails::ViewHelpers, type: :helper do
  describe '#react_component' do
    subject { helper.react_component('Todo', {todos: ['write tests', 'write moar']}, tag: 'li') }

    it { expect(helper).to respond_to(:react_component) }

    it 'renders html tag' do
      expect(subject).to be_an_instance_of(ActiveSupport::SafeBuffer)
      expect(subject).to eq(
        "<li data-react-class=\"Todo\" "\
        "data-react-props=\"{&quot;todos&quot;:[&quot;write tests&quot;,&quot;write moar&quot;]}\" "\
        "data-react-router=\"null\"></li>"
      )
    end

    context 'when props are passed as String' do
      subject { helper.react_component('Todo', 'not even a json') }

      it 'does not cast to JSON' do
        expect(subject).to include("data-react-props=\"not even a json\"")
      end
    end

    context 'when props are not passed' do
      subject { helper.react_component('Todo') }

      it 'sets an empty object as default' do
        expect(subject).to include "data-react-props=\"{}\""
      end
    end

    context 'when route option is passed' do
      subject { helper.react_component('Todo', {}, react_router: true) }

      it 'sets proper data attribute' do
        expect(subject).to include "data-react-router=\"true\""
      end
    end

    context 'when html tag is not passed' do
      subject { helper.react_component('Todo') }

      it 'uses \'div\' as default tag' do
        expect(subject).to start_with('<div')
        expect(subject).to end_with('</div>')
      end
    end
  end

  describe '#react_router' do
    it { expect(helper).to respond_to(:react_router) }

    it 'wraps #react_component with proper options' do
      expect(helper).to receive(:react_component).with('TodoRouter', {}, react_router: true).once
      helper.react_router('TodoRouter')
    end
  end
end
