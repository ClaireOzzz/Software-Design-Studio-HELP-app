class ChangeFamilySizeForRequests < ActiveRecord::Migration[7.0]
  def change
    change_column :requests, :family_size, :text, default: {}.to_yaml
  end
end