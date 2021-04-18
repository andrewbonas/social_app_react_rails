class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :user, only: [:show, :edit, :update, :destroy]
  def index
    @users = User.all
  end
  def show
    @user = User.find(params[:id])
  end

  def follow
    @current_user.follow(@user)
    @follow = Follow.find_by(follower: @current_user, followable: @user)
    respond_to :json
  end

  def unfollow
    @current_user.stop_following(@user)
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
