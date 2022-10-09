class CreateConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :connections do |t|
      t.integer :request_id
      t.integer :donor_id
      t.integer :donee_id
      t.boolean :status
      t.integer :notification_id

      t.timestamps
    end
  end
end
