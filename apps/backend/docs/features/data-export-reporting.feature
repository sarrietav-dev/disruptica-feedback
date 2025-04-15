Feature: Data Export and Reporting
  As a manager
  I want to export feedback data
  So that I can perform additional analysis or create reports

  Background:
    Given I am logged in as a manager

  Scenario: Export feedback data to CSV
    When I navigate to the export page
    And I select format "CSV"
    And I select date range "Last 30 days"
    And I click "Generate Export"
    Then a CSV file should be downloaded
    And the file should contain all feedback from the last 30 days

  Scenario: Generate PDF report
    When I navigate to the reports page
    And I select report type "Monthly Summary"
    And I select month "April 2025"
    And I click "Generate Report"
    Then a PDF report should be generated
    And the report should contain summary statistics and visualizations
