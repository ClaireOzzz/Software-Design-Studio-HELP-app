require 'rails_helper'

RSpec.describe NotificationService do

    before(:each) do 
        # Precondition to accept request and create the notification
        request_params = {
            :id => 99,
            :user_id => 1, 
            :username => "OksanaKovalenko", 
            :title => "MOCKTITLE", 
            :request_type => "food", 
            :status => "pending", 
            :expiry => DateTime.now + 3.days
        }
        r = Request.new(request_params)
        r.save
        puts r.expiry

        requestService = RequestService.new(r)
        result = requestService.accept_request(4)
        @notification = result[1]
        @service = NotificationService.new(@notification)
    end
  
    describe "check_type(expected_class) " do
        it "is given the correct class" do
            expect(@service.check_type(ConnectionNotification)).to eq(true)
            expect(@service.check_type(Notification)).to eq(true)
        end
        it "is given the incorrect class" do
            expect{ @service.check_type(Connection) }.to raise_error(TypeError)
        end
    end

    it "accept_connection()" do

        c = @notification.connection

        expect { @service.accept_connection() }
        .to change { @notification.connection.status }.from(false).to(true)
        .and change { @notification.connection.request.status }.from("accepted").to("completed")
        # Test User.update_outreach_statusin its own unit test

        expect { Notification.find(@notification.id) }.to raise_error(ActiveRecord::RecordNotFound)

    end
    
    it "reject_connection()" do
        expect { @service.reject_connection() }
        .to change { @notification.connection.request.status }.from("accepted").to("pending")
        expect { Notification.find(@notification.id) }.to raise_error(ActiveRecord::RecordNotFound)
        expect { Connection.find(@notification.connection.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end

end
