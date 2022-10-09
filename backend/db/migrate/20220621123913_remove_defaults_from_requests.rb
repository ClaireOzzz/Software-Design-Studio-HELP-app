class RemoveDefaultsFromRequests < ActiveRecord::Migration[7.0]
  def change
    change_column :requests, :preferred_mode_of_contact, :text ,default: [].to_yaml
    change_column :requests, :location, :text ,default: {}.to_yaml
    change_column :requests, :tags, :text ,default: [].to_yaml
  end
end
