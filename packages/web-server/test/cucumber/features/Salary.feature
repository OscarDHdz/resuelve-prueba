Feature: Players Salary Calculation
  As an user of the Resuelve Salary Calculation App
  I want to to know the total salary of some team players

  Scenario: Calculate Player Total Salary
    # TODO: Add Team Goals
    Given player with data "{\"nombre\":\"Juan\",\"nivel\":\"A\",\"goles\":6,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    And player with data "{\"nombre\":\"Pedro\",\"nivel\":\"B\",\"goles\":7,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    And player with data "{\"nombre\":\"Martin\",\"nivel\":\"C\",\"goles\":16,\"sueldo\":50000,\"bono\":25000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    And player with data "{\"nombre\":\"Cuauh\",\"nivel\":\"Cuauh\",\"goles\":19,\"sueldo\":50000,\"bono\":10000,\"sueldo_completo\":null,\"equipo\":\"rojo\"}"
    When players salary is calculated successfully
    # Then response should contain data from <NumberOfPlayers> players
    # And <player1> total salary should be <player1Salary>
    # And <player2> total salary should be <player2Salary>
    # And <player3> total salary should be <player3Salary>
    # And <player4> total salary should be <player4Salary>
