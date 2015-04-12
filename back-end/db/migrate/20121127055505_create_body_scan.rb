#Created with the following command:
# => rake db:create_migration NAME=create_model
class CreateBodyScan < ActiveRecord::Migration
  def up
  	  create_table :body_scans, {:primary_key => :id} do |t|
	    t.integer  :user_id
	    t.string  :sensor
	    t.string  :value
	    t.string :UOM
	    t.datetime :created_at
	  end

	  add_index "body_scans", ["user_id"], name: "index_body_scan_user_id", using: :btree
  end

  def down
  	drop_table :body_scans
  end
end
