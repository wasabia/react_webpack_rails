require 'rails_helper'

RSpec.describe ReactWebpackRails::ApplicationHelper, type: :helper do
  describe '#reset_node' do
    context 'when reset_node_on_every_request is true' do
      it 'calls ReactWebpackRails::NodeResetter.run' do
        Rails.application.config.react.reset_node_on_every_request = true
        allow(ReactWebpackRails::NodeResetter).to receive(:run) {}
        expect(ReactWebpackRails::NodeResetter).to receive(:run)
        reset_node
      end
    end

    context 'when reset_node_on_every_request is false' do
      it 'does not call ReactWebpackRails::NodeResetter.run' do
        Rails.application.config.react.reset_node_on_every_request = false
        expect(ReactWebpackRails::NodeResetter).to_not receive(:run)
        reset_node
      end
    end
  end
end
