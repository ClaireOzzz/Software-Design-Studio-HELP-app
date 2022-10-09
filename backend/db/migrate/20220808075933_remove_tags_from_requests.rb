class RemoveTagsFromRequests < ActiveRecord::Migration[7.0]
  def change
    remove_column :requests, :tags, :string
  end
end
