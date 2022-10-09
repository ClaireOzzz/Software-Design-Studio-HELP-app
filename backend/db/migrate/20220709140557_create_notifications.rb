class CreateNotifications < ActiveRecord::Migration[7.0]
  def change

    create_table :notifications do |t|
      t.integer :user_id
      t.integer :from_id
      t.string :type
      t.string :message
      t.integer :connection_id

      t.timestamps
    end
  end
end
