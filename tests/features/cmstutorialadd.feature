@cms_tutorials
Feature: CMS Tutorials Management
  As a CMS admin
  I want to manage tutorials
  So that I can publish learning content

  Background:
    Given I am logged in to the CMS
    And I navigate to the CMS tutorials page

  Scenario: Add a new tutorial successfully
    When I click on "Add new" tutorial
    And I enter tutorial name "Playwright Intro" and description "This is a Playwright basics tutorial"
    And I select educator "Test Test"
    And I select category "Styling"
    And I enter rich text description
    And I upload a cover picture "tests/fixtures/cover.jpg"
    And I upload a tutorial PDF "tests/fixtures/sample.pdf"
    And I submit the tutorial
    Then I should see the new tutorial "Playwright Intro" in the tutorials list
