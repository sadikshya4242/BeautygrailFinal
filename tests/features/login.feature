Feature: Login Page
  As a salon user
  I want to be able to log So that I can access the salon dashboard

  Scenario: Invalid email format
    Given I navigate to the login page
    When I enter "invalidemail" in the email field
    And I click on the password field
    Then I should see an error message "Must be a valid email"
  
  Scenario: Sign in with empty fields
    Given I navigate to the login page
    When I click on the "Sign in" button without entering email and password
    Then I should see an error message for empty fields

  Scenario: Invalid credentials
    Given I navigate to the login page
    When I login with email "sadikshya.bhusal+uat@ebpearls.com" and password "WrongPassword"
    Then I should see an error message "Invalid login credentials"

  Scenario: Valid credentials
    Given I navigate to the login page
    When I login with email "sadikshya.bhusal+uat2@ebpearls.com" and password "Sadikshya@123"
    Then I should be navigated to dashboard page
    And I should see my username "Hi Jennifer Sharma"
