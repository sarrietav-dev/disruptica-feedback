Feature: Customer Feedback Management
  As a store staff member
  I want to collect and manage customer feedback
  So that we can improve our products and services

  Background:
    Given I am logged in as a staff member

  Scenario: View all feedback
    When I navigate to the feedback page
    Then I should see a list of all customer feedback
    And each feedback entry should display the product name, category, rating, and comment

  Scenario: Create new feedback
    When I click on "Add New Feedback"
    And I fill in the feedback details:
      | Field       | Value                               |
      | Product     | Summer Linen Shirt                  |
      | Customer    | Jane Doe                            |
      | Rating      | 4                                   |
      | Comment     | Great quality but runs small        |
      | Date        | 2025-04-15                          |
    And I click "Submit"
    Then I should see a success message
    And the new feedback should appear in the feedback list

  Scenario: Filter feedback by product
    Given there are multiple feedback entries for different products
    When I select to filter by product "Summer Linen Shirt"
    Then I should only see feedback for "Summer Linen Shirt"

  Scenario: Filter feedback by category
    Given there are multiple feedback entries for products in different categories
    When I select to filter by category "Clothing"
    Then I should only see feedback for products in the "Clothing" category

  Scenario: Sort feedback by rating
    Given there are multiple feedback entries with different ratings
    When I select to sort by "Rating"
    Then I should see the feedback entries ordered by their rating value

  Scenario: View average product rating
    When I view the product details for "Summer Linen Shirt"
    Then I should see the average rating calculated from all feedback
    And I should see how many feedback entries contribute to that rating
