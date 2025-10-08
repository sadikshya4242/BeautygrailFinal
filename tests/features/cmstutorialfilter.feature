@cms_tutorials_filter
Feature: CMS Tutorials Filter
  As a CMS admin
  I want to filter tutorials by status
  So that I can easily view tutorials in a specific state

  Background:
    Given I am logged in as a CMS
    And I navigate to the CMS tutorials page

  Scenario: Verify all status filter options are visible
    When I open the tutorials status filter dropdown
    Then I should see the following filter options:
      | All               |
      | Published         |
      | Unpublished       |
      | Draft             |
      | Awaiting Approval |

  Scenario: Verify Published filter shows only published tutorials
    When I apply the "Published" status filter
    Then I should see only tutorials with status "PUBLISHED"
