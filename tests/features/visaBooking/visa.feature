Feature: Visa Booking

  
  Background: Login
  Given User should be logged in

  @Scenario1
  Scenario Outline: Verify visa booking is successful
    Given Navigate to HomePage "https://www.ixigo.com"
    When I open the visa booking page
    When I search for visa using data "<testKey>"
    When I set visa duration using data "<testKey>"
    When I provide visa details using data "<testKey>"
    Then The visa booking flow completes for "<testKey>"

    Examples:
      | testKey |
      | positive_uae |

  @Scenario2
  Scenario Outline: Verify user can edit their details or add details
    Given Navigate to HomePage "https://www.ixigo.com"
    When I open the visa booking page
    When I go to my profile
    When I edit my profile details with data "<testKey>"
    Then The profile edit completes for "<testKey>"

    Examples:
      | testKey |
      | positive_profile_edit |
      | negative_profile_missing_fields |

  @Scenario3
  Scenario Outline: Verify negative visa search cases
    Given Navigate to HomePage "https://www.ixigo.com"
    When I open the visa booking page
    When I search for visa using data "<testKey>"
    Then It should show an error for "<testKey>"

    Examples:
      | testKey |
      | negative_invalid_country |