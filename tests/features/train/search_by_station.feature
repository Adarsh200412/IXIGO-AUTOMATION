Feature: Search a train by station name

    Scenario: Book a train by station name
        Given proceed to "https://www.ixigo.com/"
        When select train option on dashboard
        And select search by station name section
        And enter staion name to get desired results "<Station_name_or_code>"
        And click search button
        And click Book button to buy tickets
        And check for available and book tickets
        And add new traveller and enter their details
        And enter payment details
        Then payment page should load successfully

        Examples:
            | Station_name_or_code |
            | Surat                |
            | GFD                  |