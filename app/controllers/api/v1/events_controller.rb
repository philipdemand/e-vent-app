class Api::V1::EventsController < ApplicationController

    skip_before_action :authorized, only: :index

    def index
        events = Event.all
        render json: events
    end
    
    def show
        event = Event.find(params[:id])
        render json: event
    end

    def create
        event = Event.create!(event_params)
        render json: event, status: :created
    end

    private

    def event_params
        params.permit(:title, :address, :date, :time, :details)
    end

end