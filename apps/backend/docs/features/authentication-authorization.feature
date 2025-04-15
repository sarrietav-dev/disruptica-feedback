Feature: User Authentication and Authorization
  As a system administrator
  I want to control access to the feedback system
  So that only authorized users can access specific features

  Scenario: User login
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in successfully
    And I should be redirected to the dashboard

  Scenario: Failed login attempt
    Given I am on the login page
    When I enter invalid credentials
    Then I should see an error message
    And I should remain on the login page

  Scenario: Password reset
    Given I am on the login page
    When I click on "Forgot Password"
    And I enter my email address
    And I click "Reset Password"
    Then I should see a confirmation message
    And I should receive an email with password reset instructions

  Scenario: Role-based access control
    Given the system has the following user roles:
      | Role          | Access Level                                        |
      | Admin         | Full access to all features                         |
      | Manager       | Access to dashboard, reports, and feedback management|
      | Staff         | Limited to viewing and adding feedback              |
    When a user with role "<Role>" logs in
    Then they should only see features appropriate for their "<Access Level>"
