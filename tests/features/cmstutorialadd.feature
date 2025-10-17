@cms_tutorials
Feature: Add a new tutorial
  As a CMS admin
  I want to add a new tutorial
  So that it appears in the CMS tutorials list

  Background:
    Given I am logged in as a CMS
    And I navigate to the Tutorials page for adding a new tutorial

  Scenario: Add a new tutorial successfully
    When I click on "Add new" tutorial
    And I enter tutorial name "Playwright Intro", description "This is a Playwright basics tutorial", educator "Test Test", category "Styling", and rich text "This is a rich text description"
    And I upload a cover picture "C:/Users/Asus/OneDrive/Desktop/Final project/BDD/Images/coverimage.jpg"
    And I upload a tutorial PDF "C:/Users/Asus/OneDrive/Desktop/Final project/BDD/Images/Invoice.pdf"
    And I submit the tutorial "Playwright Intro"
    Then I should see the new tutorial "Playwright Intro" in the tutorials list
