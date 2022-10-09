class AddOutreachsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :outreachs, :text, default: {}.to_yaml
  end
end
