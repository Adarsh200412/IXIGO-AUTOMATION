@popularFlights
Feature: Popular Flights

Scenario: Checking Whether clicking on particular flight gives desired results
Given User navigated to ixigoFlights
When User clicks on <anyAirline> button

Then verify User gets the desired results and all results of <anyAirline>
