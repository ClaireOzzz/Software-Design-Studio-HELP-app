class AddRelationsToNotification < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :notification_id, :integer
    add_foreign_key :users, :notifications

    add_foreign_key :notifications, :users, column: :user_id

    add_foreign_key :notifications, :connections, column: :connection_id
    
  end
end
