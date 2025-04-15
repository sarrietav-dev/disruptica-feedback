Feature: Public Feedback Form
  As a customer
  I want to submit feedback about products I've purchased
  So that the store can improve their offerings

  Scenario: Submit feedback as a customer
    Given I am on the public feedback page
    When I select a product "Summer Linen Shirt"
    And I provide my feedback:
      | Field       | Value                               |
      | Name        | John Smith                          |
      | Email       | john.smith@example.com              |
      | Rating      | 5                                   |
      | Comment     | Perfect fit and very comfortable    |
    And I click "Submit Feedback"
    Then I should see a thank you message
    And my feedback should be saved in the system

  Scenario: Submit feedback with product verification
    Given I am on the public feedback page
    When I enter my order number "ORD-12345"
    Then the system should verify my purchase
    And pre-populate the product selection with items from my order
