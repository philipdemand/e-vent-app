class AttendancesController < ApplicationController

    def create
      event = Event.find(params[:event_id])
      attendance = event.attendances.new(attendance_params)
      attendance.save!
      render json: attendance, status: :created
    end

    def update
      event = Event.find(params[:event_id])
      attendance = event.attendances.find(params[:id])
      if session[:user_id] == attendance.user_id
        attendance.update!(attendance_params)
        render json: attendance
      else
        render json: { errors: ["Unauthorized"] }, status: :unauthorized
      end
    end

    def destroy
      attendance = Attendance.find(params[:id])
      if session[:user_id] == attendance.user_id
        attendance.destroy!
        head :no_content
      else
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

    # def index
    #   attendances = Attendance.all
    #   render json: attendances
    # end
    
    private
    
    def attendance_params
      params.require(:attendance).permit(:user_id, :total_attendees)
    end
      
end
