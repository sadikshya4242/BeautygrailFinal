@cms_login
Feature: CMS Login Page
  As a CMS admin
  I want to be able to log in
  So that I can access the CMS dashboard

  Scenario: Invalid email format
    Given I navigate to the cms login page
    When I enter "invalidemail" in the cms email field
    And I click on the cms password field
    Then I should see a cms email error message "Email must be a valid email"

  Scenario: Sign in with empty fields
    Given I navigate to the cms login page
    When I click on the "Sign in" button on cms without entering email and password
    Then I should see a cms error message for empty fields

  Scenario: Invalid credentials
    Given I navigate to the cms login page
    When I login to cms with email "sadikshya.bhusal@ebpearls.com" and password "WrongPassword"
    Then I should see a cms login error message "Username or Password doesn't match"

  Scenario: Valid credentials
    Given I navigate to the cms login page
    When I login to cms with email "sadikshya.bhusal+uat2@ebpearls.com" and password "Sadikshya@123"
    Then I should be navigated to the cms dashboard page
   
