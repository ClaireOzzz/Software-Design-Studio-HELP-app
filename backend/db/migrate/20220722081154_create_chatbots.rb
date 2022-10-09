class CreateChatbots < ActiveRecord::Migration[7.0]
  def change
    create_table :chatbots do |t|

      t.timestamps
    end
  end
end
