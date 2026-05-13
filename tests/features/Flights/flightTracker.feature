@Tracking
Feature: Flight Tracking

Background: Login
Given User should be logged in

Scenario: Tracking Using Number
Given user gets to flight page
When user clicks on flight tracker
When user enters airline 
When user enters flight Number
Then user click search and Screenshot