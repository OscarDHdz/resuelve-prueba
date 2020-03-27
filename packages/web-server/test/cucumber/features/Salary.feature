Feature: Players Salary Calculation
  As an user of the Resuelve Salary Calculation App
  I want to to know the total salary of some team players

  Background: Team Goals are set
    Given level "A" with minimun goals 5
    And level "B" with minimun goals 10
    And level "C" with minimun goals 15
    And level "Cuauh" with minimun goals 20
    When goals are set for team "rojo"
    And "rojo" team goals for team are saved
    Then response status code should be 200

  Scenario: Calculate Player Total Salary
    Given player with data "{\"nombre\":\"Juan\",\"nivel\":\"A\",\"goles\":6,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    And player with data "{\"nombre\":\"Pedro\",\"nivel\":\"B\",\"goles\":7,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    And player with data "{\"nombre\":\"Martin\",\"nivel\":\"C\",\"goles\":16,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    And player with data "{\"nombre\":\"Luis\",\"nivel\":\"Cuauh\",\"goles\":19,\"sueldo\":50000,\"bono\":10000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    When players salary is calculated
    Then response status code should be 200
    Then salary response should contain data from 4 players
    And "Juan" from "rojo" team total salary should be 77000
    And "Pedro" from "rojo" team total salary should be 70750
    And "Martin" from "rojo" team total salary should be 75333.33
    And "Luis" from "rojo" team total salary should be 59550

  Scenario: Salary calculation fails as team goals are not set
    Given player with data "{\"nombre\":\"Juan\",\"nivel\":\"A\",\"goles\":6,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"azul\"}"
    When players salary is calculated
    Then response status code should be 404
  
  Scenario: Salary calculation fails as level goals are not set
    Given player with data "{\"nombre\":\"Juan\",\"nivel\":\"Z\",\"goles\":6,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    When players salary is calculated
    Then response status code should be 404

  Scenario: Salary calculation fails player is missing an attributes (goles)
    Given player with data "{\"nombre\":\"Juan\",\"nivel\":\"A\",\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    When players salary is calculated
    Then response status code should be 400