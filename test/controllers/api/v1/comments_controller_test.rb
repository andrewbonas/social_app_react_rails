require "test_helper"

class Api::V1::CommentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do 
    get '/users/sign_in'
    sign_in users(:user_001)
    post user_session_url
  end

  test "should get comments for post 1" do
    get '/api/v1/posts/1/comments'
    assert_response :success
  end

  test "should show 1st comment for post 1" do
    get "/api/v1/posts/4/comments", params: {comment: {body: "test", post_id: 2, user_id: 2}}
    assert_response :success
  end
end

