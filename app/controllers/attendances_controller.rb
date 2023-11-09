class AttendancesController < ApplicationController

    def create
      attendance = Attendance.new(attendance_params)
      attendance.event_id = params[:event_id]
      attendance.user_id = session[:user_id]
      attendance.save!
      render json: attendance, status: :created
    end

    def update
      attendance = Attendance.find(params[:id])
      if session[:user_id] == attendance.user_id
        attendance.update!(attendance_params)
        render json: attendance
      end
    end

    def destroy
      attendance = Attendance.find(params[:id])
      if session[:user_id] == attendance.user_id
        attendance.destroy
        head :no_content
      end
    end
    
    private
    
    def attendance_params
      params.require(:attendance).permit(:total_attendees)
    end
      
end
