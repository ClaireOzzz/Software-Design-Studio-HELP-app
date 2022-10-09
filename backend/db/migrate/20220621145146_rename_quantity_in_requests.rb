class RenameQuantityInRequests < ActiveRecord::Migration[7.0]
  def change
    rename_column :requests, :family_size, :quantity
  end
end
