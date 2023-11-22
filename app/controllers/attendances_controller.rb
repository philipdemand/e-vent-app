class AttendancesController < ApplicationController

  skip_before_action :authorized, only: :min

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
      else
        render json: { error: 'Unauthorized: You do not have permission to update this attendance record.' }, status: :unauthorized
      end
    end

    def destroy
      attendance = Attendance.find(params[:id])
      if session[:user_id] == attendance.user_id
        attendance.destroy
        head :no_content
      else
        render json: { error: 'Unauthorized: You do not have permission to delete this attendance record.' }, status: :unauthorized
      end
    end
    
    private
    
    def attendance_params
      params.require(:attendance).permit(:total_attendees)
    end
      
end
