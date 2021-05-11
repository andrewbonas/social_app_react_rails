class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  
  def index
    @users = User.all
  end
  
  def show
    user = User.find(params[:id])
    if user.avatar.present?
      avatar = rails_blob_path(user.avatar)
    else
      avatar = ActionController::Base.helpers.asset_path('default_profile.jpg')
    end
    render json: {user: user, current_user: current_user, avatar: avatar}
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
end
