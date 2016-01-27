require 'rails_helper'

RSpec.describe ReactWebpackRails::ApplicationHelper, type: :helper do
  describe '#reset_node' do
    it 'calls ReactWebpackRails::NodeResetter.run' do
      allow(ReactWebpackRails::NodeResetter).to receive(:run) {}
      expect(ReactWebpackRails::NodeResetter).to receive(:run)
      reset_node
    end
  end
end
