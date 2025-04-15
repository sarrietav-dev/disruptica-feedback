Feature: Product Management
  As a store manager
  I want to manage products in the system
  So that customers can provide feedback on specific items

  Background:
    Given I am logged in as an admin user

  Scenario: View all products
    When I navigate to the products page
    Then I should see a list of all products
    And each product should display its name, category, price, and availability status

  Scenario: Add a new product
    When I click on "Add New Product"
    And I fill in the product details:
      | Field       | Value              |
      | Name        | Summer Linen Shirt |
      | Description | Breathable fabric  |
      | Price       | 49.99              |
      | Category    | Clothing           |
      | SKU         | CLT-SLS-001        |
    And I click "Save"
    Then I should see a success message
    And the new product should appear in the products list

  Scenario: Edit an existing product
    Given there is a product "Winter Jacket" in the system
    When I select to edit "Winter Jacket"
    And I change the price to "89.99"
    And I click "Update"
    Then I should see a success message
    And the product "Winter Jacket" should show the updated price of "89.99"

  Scenario: Delete a product
    Given there is a product "Discontinued Item" in the system
    When I select to delete "Discontinued Item"
    And I confirm the deletion
    Then I should see a success message
    And "Discontinued Item" should no longer appear in the products list
