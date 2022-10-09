class AddRequestToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :request_id, :integer
    add_foreign_key :users, :requests
  end
end
