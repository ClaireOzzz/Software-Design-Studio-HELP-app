class AddRelationsToConnections < ActiveRecord::Migration[7.0]
  def change

    add_foreign_key :connections, :users, column: :donor_id
    add_foreign_key :connections, :users, column: :donee_id

    add_column :users, :donor_connection_id, :integer
    add_column :users, :donee_connection_id, :integer

    add_foreign_key :users, :connections, column: :donor_connection_id
    add_foreign_key :users, :connections, column: :donee_connection_id

    add_foreign_key :connections, :requests
  end
end
