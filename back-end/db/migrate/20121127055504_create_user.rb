#Created with the following command:
# => rake db:create_migration NAME=create_model
class CreateUser < ActiveRecord::Migration
  def up
  	  create_table :users, {:primary_key => :id} do |t|
	    t.string :firstname
	    t.string  :lastname
	    t.string  :nation
	    t.datetime :birthday
	  end
  end

  def down
  	drop_table :users
  end
end
