@Booking 
Feature: Flight Booking 

Background: Login
Given User should be logged in

Scenario: Search and book a flight

Given user launches ixigo website 
When user selects "DEL" as origin city 
And user selects "MUM" as destination city 
And user selects departure date 
And user clicks search button 
And user applies filters 
And user books first available flight 
Then user fills passenger details 
And user confirms booking details
And user selects seats
And user selects meals
And user continues to payment page