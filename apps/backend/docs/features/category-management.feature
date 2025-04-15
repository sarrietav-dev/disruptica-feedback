Feature: Category Management
  As a store administrator
  I want to manage product categories
  So that products can be organized logically

  Background:
    Given I am logged in as an admin user

  Scenario: View all categories
    When I navigate to the categories page
    Then I should see a list of all product categories

  Scenario: Add a new category
    When I click on "Add New Category"
    And I fill in the category details:
      | Field        | Value      |
      | Name         | Accessories|
      | Description  | Small items|
    And I click "Save"
    Then I should see a success message
    And the new category should appear in the categories list

  Scenario: Edit an existing category
    Given there is a category "Home Goods" in the system
    When I select to edit "Home Goods"
    And I change the description to "Kitchen and living room items"
    And I click "Update"
    Then I should see a success message
    And the category "Home Goods" should show the updated description

  Scenario: Delete a category
    Given there is an empty category "Seasonal" in the system
    When I select to delete "Seasonal"
    And I confirm the deletion
    Then I should see a success message
    And "Seasonal" should no longer appear in the categories list
