Feature: Ecommerce validation
    @ui
    Scenario Outline: Ecommerce web ete test
        Given i want to login on my website using this username "<username>" and password  "<password>"
        Then any product name that is matching with this name "ZARA COAT 3" click the add to cart button
        Then after landing into cart section click on it user should see the thankyou message
        When click on the orderhistory button to see the order summary
     
     Examples: Test data for ecommerce web test
     | username             | password    |
     |anshika@gmail.com     | Iamking@000 |
     |rahulshettyacademy.com| Iamking@000 |

