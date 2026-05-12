Feature: IXIGO ORDER FOOD ON TRAIN

    Scenario: Order food on train
        Given navi to "https://www.ixigo.com/"
        When select train section on dashboard
        And click on Order food on train section
        And enter valid PNR number "<PNR_no>"
        And select any one of hotels
        And add some filters to sort out desired  results
        And select meals to Order
        And click on next button
        And enter passengers name "<passenger_name>"
        And enter contact details "<contact_no>"
        And select payment button
        # And click on continue button
        Then order page should load successfull

        Examples:
            | PNR_no     | passenger_name | contact_no |
            | 2834441160 | Praburam       | 6383604912 |
            | 8987897897 | Arunachalam    | 6383604943 |