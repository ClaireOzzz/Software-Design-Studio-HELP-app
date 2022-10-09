# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_11_111850) do
  create_table "connections", force: :cascade do |t|
    t.integer "request_id"
    t.integer "donor_id"
    t.integer "donee_id"
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id"
    t.integer "from_id"
    t.string "type"
    t.string "message"
    t.integer "connection_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.integer "user_id"
    t.string "username"
    t.string "title"
    t.date "expiry"
    t.string "description"
    t.string "request_type"
    t.text "quantity", default: "--- {}\n"
    t.string "status"
    t.datetime "timestamp", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "preferred_mode_of_contact", default: "--- []\n"
    t.text "location", default: "--- {}\n"
    t.text "tags", default: "--- []\n"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "request_id"
    t.text "outreachs", default: "--- {}\n"
    t.integer "notification_id"
    t.integer "donor_connection_id"
    t.integer "donee_connection_id"
    t.text "contacts", default: "--- {}\n"
  end

  add_foreign_key "connections", "requests"
  add_foreign_key "connections", "users", column: "donee_id"
  add_foreign_key "connections", "users", column: "donor_id"
  add_foreign_key "notifications", "connections"
  add_foreign_key "notifications", "users"
  add_foreign_key "requests", "users"
  add_foreign_key "users", "connections", column: "donee_connection_id"
  add_foreign_key "users", "connections", column: "donor_connection_id"
  add_foreign_key "users", "notifications"
  add_foreign_key "users", "requests"
end
