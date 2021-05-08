require "test_helper"

class Api::V1::PostsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do 
    get '/users/sign_in'
    sign_in users(:user_001)
    post user_session_url
  end

  test "should get index" do 
    get api_v1_posts_path
    assert_response :success
  end
  
  test "should create post" do
    assert_difference("Post.count") do
      post api_v1_posts_path, params: {post: {body: "test", user_id: 1} }
    end
  end

  test "should show post" do
    get api_v1_posts_url(:user_001)
    assert_response :success
  end

end
