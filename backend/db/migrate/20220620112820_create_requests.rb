class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.integer :request_id
      t.integer :user_id
      t.string :username
      t.string :title
      t.date :expiry
      t.string :description
      t.string :request_type
      t.integer :family_size
      t.string :status
      t.timestamp :timestamp

      t.timestamps
    end
  end
end
