module ReactWebpackRails
  module ApplicationHelper
    def reset_node
      ReactWebpackRails::NodeResetter.run
    end
  end
end
