class BodyScan < ActiveRecord::Base
	validates_presence_of :user_id, message: "user id cannot be blank."
	validates_presence_of :sensor, message: "sensor cannot be blank."
	validates_presence_of :value, message: "value cannot be blank."
	validates_presence_of :UOM, message: "UOM cannot be blank."
	has_one :User
end