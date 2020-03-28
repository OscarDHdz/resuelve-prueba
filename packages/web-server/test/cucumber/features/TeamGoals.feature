Feature: Team Goals CRUD
  As an user of the Resuelve Salary Calculation App
  I want to perform all RESTful operation for Team Goals

  Background: Set initial set of goals
    Given level "X" with minimun goals 1
    When goals are set for team "azul"
    And "azul" team goals are saved

  Scenario: POST Team Goals
    Given level "A" with minimun goals 5
    And level "B" with minimun goals 10
    And level "C" with minimun goals 15
    And level "Cuauh" with minimun goals 20
    When goals are set for team "rojo"
    And "rojo" team goals are saved
    Then response status code should be 200

  Scenario: POST should fail if team goals already set
    Given level "Y" with minimun goals 2
    When goals are set for team "azul"
    And "azul" team goals are saved
    Then response status code should be 409

  Scenario: GET Team Goals
    Given team "azul" goals are fetched
    Then response status code should be 200
    And retrieved goals should be from team "azul"
    And level "X" should have minimun goals 1

  Scenario: GET Team Goals should fail if team data has not been set
    Given team "rojo" goals are fetched
    Then response status code should be 404

  Scenario: PUT Team Goals
    Given level "X" with minimun goals 5
    And level "Y" with minimun goals 10
    And goals are set for team "azul"
    When "azul" team goals are updated
    Then response status code should be 200
    When team "azul" goals are fetched
    Then response status code should be 200
    And level "X" should have minimun goals 5
    And level "Y" should have minimun goals 10

  Scenario: PUT Team Goals shuold fail if team data does not exists
    Given level "X" with minimun goals 5
    And level "Y" with minimun goals 10
    And goals are set for team "verde"
    When "verde" team goals are updated
    Then response status code should be 404

  Scenario: DELETE Team Goals
    Given team "azul" goals are deleted
    Then response status code should be 200
    Given team "azul" goals are fetched
    Then response status code should be 404

  Scenario: DELETE Team Goals should fail if team does not exists
    Given team "green" goals are deleted
    Then response status code should be 404

  Scenario: POST Multiple Team Goals (Batch)
    Given level "A" with minimun goals 5
    And level "B" with minimun goals 10
    And level "C" with minimun goals 15
    And level "Cuauh" with minimun goals 20
    And goals are set for team "rojo"
    Given level "X" with minimun goals 1
    And level "Y" with minimun goals 2
    And level "Z" with minimun goals 3
    And goals are set for team "white"
    When all team goals are saved
    Then response status code should be 200
    Then response body should be empty

  Scenario: POST Multiple Team Goals but add fails
    Given level "A" with minimun goals 5
    And level "B" with minimun goals 10
    And level "C" with minimun goals 15
    And level "Cuauh" with minimun goals 20
    And goals are set for team "rojo"
    Given level "X" with minimun goals 500
    And goals are set for team "azul"
    When all team goals are saved
    Then response status code should be 200
    Then respone should contain which team goals failed to be added
    Then "azul" team goals should have failed due 409 error code

