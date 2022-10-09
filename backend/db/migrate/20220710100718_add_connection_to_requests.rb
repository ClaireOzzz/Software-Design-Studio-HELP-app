class AddConnectionToRequests < ActiveRecord::Migration[7.0]
  def change
    add_column :requests, :connection_id, :integer
    add_foreign_key :requests, :connections

  end
end
