Feature: Login Page
  As a user
  I want to login to the application
  So that I can access my dashboard

  Scenario: Invalid email format
    Given I navigate to the login page
    When I enter "invalidemail" in the email field
    And I click on the password field
    Then I should see an error message "Must be a valid email"

  Scenario: Invalid credentials
    Given I navigate to the login page
    When I login with email "sadikshya.bhusal+uat@ebpearls.com" and password "WrongPassword"
    Then I should see an error message "Invalid login credentials"

  Scenario: Valid credentials
    Given I navigate to the login page
    When I login with email "sadikshya.bhusal+uat2@ebpearls.com" and password "Sadikshya@123"
    Then I should see a success alert "Login successful!"
    And I should see my username "Hi Jennifer Sharma"
