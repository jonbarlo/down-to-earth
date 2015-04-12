class User < ActiveRecord::Base
	validates_presence_of :firstname, message: "firstname cannot be blank."
	validates_presence_of :lastname, message: "lastname cannot be blank."
	validates_presence_of :nation, message: "nation cannot be blank."
	validates_presence_of :birthday, message: "birthday cannot be blank."
	belongs_to :BodyScan
end