Feature: Dashboard and Analytics
  As a store manager
  I want to see feedback analytics and trends
  So that I can make data-driven decisions

  Background:
    Given I am logged in as a manager

  Scenario: View dashboard summary
    When I navigate to the dashboard
    Then I should see summary statistics including:
      | Statistic                         |
      | Total number of feedback entries  |
      | Average rating across all products|
      | Top 5 highest rated products      |
      | Top 5 lowest rated products       |

  Scenario: View feedback trends over time
    When I navigate to the analytics page
    And I select the date range for the last 3 months
    Then I should see a graph showing feedback volume over time
    And I should see a graph showing average ratings over time

  Scenario: View category performance comparison
    When I navigate to the category analysis page
    Then I should see a comparison of average ratings across different categories
    And I should see the volume of feedback for each category
