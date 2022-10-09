require 'rails_helper'

RSpec.describe RequestService do
  
    before(:each) do
        request_params = {
            :id => 99,
            :user_id => 1, 
            :username => "OksanaKovalenko", 
            :title => "MOCKTITLE", 
            :request_type => "food", 
            :status => "pending", 
        }

        @r = User.find(1).requests.create(request_params)
        @r.save

        @service = RequestService.new(@r)
    end

    describe "connect_users(donor_id) " do
        # Creates connection and notification between 2 users
        it "gets a valid donor_id" do
            expect{ @service.connect_users(2) }
            .to change { Notification.all.length }.by(1)
            .and change { Connection.all.length }.by(1)
        end
        it "gets an invalid donor_id" do
            expect{@service.connect_users(0)}
            .to raise_error(ActiveRecord::RecordInvalid)
            .and change { Notification.all.length }.by(0)
            .and change { Connection.all.length }.by(0)
            
        end
    end

    describe "accept_request(donor_id) " do
        it "gets a valid donor_id" do
            expect{ @service.accept_request(2) }
            .to change{ Request.find(@r.id).status }.from("pending").to("accepted")
            .and change { Notification.all.length }.by(1)
            .and change { Connection.all.length }.by(1)

            expect(User.find(2).outreachs).to have_key(99)
            expect(User.find(2).outreachs[99]).to eq("pending")
            
        end
        it "gets an invalid donor_id" do
            expect{ @service.accept_request(0) }.to raise_error(NoMethodError)
        end
    end

    it "destroy_associated()" do
        # setup Precondition for accepted request
        @service.accept_request(2)
        @service.accept_request(3)
        expect{ @service.destroy_associated() }
        .to change { Notification.all.length }.by(-2)
        .and change { Connection.all.length }.by(-2)
    end

end
