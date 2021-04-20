class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def index
    @users = User.all
  end
  
  def show
    @user = current_user
  end

  def follow
    @user = User.find(params[:id])
    current_user.follow(@user)
    @follow = Follow.find_by(follower: @current_user, followable: @user)
    respond_to :json
  end

  def unfollow
    @user = User.find(params[:id])
    current_user.stop_following(@user)
    respond_to :json
  end

  def create
  end
  def update
  end
  def destroy
  end
  private
   
end
