Feature: Search tutorials in CMS

  As an admin user,
  I want to search tutorials by name, educator, and category
  So that I can easily locate them and view their information.

  Background:
    Given I am logged in as an admin in CMS
    And I navigate to the Tutorials page

  @search
  Scenario Outline: Search tutorials using various filters
    When I search for tutorials by "<criteria>" with value "<value>"
    Then I should see tutorials related to "<value>"

    Examples:
      | criteria   | value             |
      | name       | Playwright Intro  |
      | educator   | John Doe          |
      | category   | Hair Styling      |
