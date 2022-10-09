class AddUserToRequest < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :requests, :users, column: :user_id
  end
end
