class AddContactDetailsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :contacts, :text ,default: {}.to_yaml
  end
end
