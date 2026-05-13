@FlightBooking

Feature: Ixigo Flight Reservation Workflow

Background: Login
Given User should be logged in

Scenario: User completes flight reservation journey

    Given user opens ixigo flights application

    When user chooses flight type
    And user enters departure city
    And user enters arrival city
    And user chooses onward journey date
    And user chooses return journey date when required

    And user starts flight search
    And user applies preferred flight filters
    And user selects available flight option

    Then user enters traveller information
    And user verifies booking information
    And user chooses preferred seats
    And user adds meal preferences
    And user proceeds towards payment section