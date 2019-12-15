# hotelservice

## Overview
This web app is designed to be used by staff in a hotel environment. It allows the staff to manage the rooms and guests while also keeping track of the status of each room. when someone approaches the staff they can add them to the system and they can be assigned a room which the system will find based on the amount of people and what kind of room they want. Once the system finds them a room that room is no longer available and they are considered checked in. When they have finished their stay the system will check them out and assign the room for cleaning. Once the room is clean the staff can make the room available again through the system so it can be assigned to a new guest. the room can also be sent for maintenence if there is a problem which will make that room univailable. once a few guests have been checked out the can all be delted from the system in one go instead of having to delete each person who has checked out.

### Features

* Authentication using bcrypt
* Json Web Tokens
* Chart.js
* Cypress testing
* Authentication testing in cypress
* Database hoting with mongodb atlas
### Cypress test execution
test execution video: https://www.youtube.com/watch?v=nj6vuuf8pnY&feature=youtu.be
![][datamodel]

### Web app hosting

The web app it hoested using surge and the api is hosted using heroku. The database is also using mongodb atlas  
Client side link: http://hotelservice-assignment.surge.sh/  
Api hosting link: https://hotel-api-staging.herokuapp.com/

### references

Json Web Tokens: https://www.youtube.com/watch?v=mbsmsi7l3r4  
Bcrypt athentication: https://www.youtube.com/watch?v=Ud5xKCYQTjM  
Vue-charts: https://vue-chartjs.org/guide/  
Surge hosting: https://medium.com/jubianchi-fr/preview-your-website-with-gitlab-ci-and-surge-5b861d7c9a3a  


[datamodel]: ./img/test.png
