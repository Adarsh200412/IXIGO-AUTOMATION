@Group-Booking
Feature: Group-Booking 

Background: Login
Given User should be logged in

Scenario:Book or enquire about flights for a group of people

Given User is on ixigo-flights page
When User clicks on Group Booking and navigates to new tab
And Fill details about the group

Then Click on Submit