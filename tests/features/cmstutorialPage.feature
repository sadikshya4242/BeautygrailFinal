@cms_tutorials
Feature: Tutorials page visibility
  As a CMS admin
  I want to verify that the Tutorials page and its key elements are visible
  So that I can ensure the UI is displayed correctly after login

  Background:
    Given I am logged in to the CMS with email "sadikshya.bhusal@ebpearls.com" and password "Sadikshya@123"

  Scenario: Verify visibility of tutorials page and its elements
    When I navigate to the Tutorials page for tutorialsvisibility 
    Then I should see the "Tutorials" heading
    And I should see the "Search" textbox
    And I should see the "Filter" button
    And I should see the "Add new" button
    And I should see the tutorials list table