User Management System
Project Description

#User registration Page with email verification(handle email verification your own way)
Username
Email
Password
Firstname
Lastname

#User Login Page
Username and password

#Functionalities of a User
*view and update profile
*Upload Profile Picture
*create posts
*create comments under posts

Additional Fields for profile update, (not visible on the regisration page)
*Address
*State
\*City

#password reset page
The user should go through email authentication to be able to reset password

#The administrative Page.
The system should have an admin login page where the admin can login and view registered users.
*The admin can view the users details (except password)
*Additional information the admin should see, (last_login_date,registerd_ip_address,last_login_ipaddress,users_posts,Posts_comments)
The admin can be able to activate, or deactivate user as well as modify user profile (But posts should be readonly).

#THIRD PARTY API.
The system should have a json based re-usable api to query data for each user.

1. view user profile

{
"id" : 7
"name": "precious",
"lastname" :"paul",
"phone": "070666666666",
"email": "preciouspaul@email.com",
"address": "plot 6 yaradua road",
"city": "Abuja",
"state" : "fct",
"created": "2021-02-09",
"photo": "https://xyz.abc/profiles/7.png",
"posts": 3
}

2. viewposts
   {
   [
   "id":991,
   "created": "2021-02-09 11:00:32",
   "title": "welcome to my bio",
   "body" : "Lorem Ipsum dolotor",
   "comments" : [
   {"userid" : 9,
   "createdon": "2021-02-09 12:03:11",
   "message" : "Lorem Ipsum dolotor"
   },
   {"userid" : 4,
   "createdon": "2021-02-09 12:03:11",
   "message" : "Lorem Ipsum dolotor"
   },
   {"userid" : 1,
   "createdon": "2021-02-09 12:03:11",
   "message" : "Lorem Ipsum dolotor"
   },
   ]
   ]

}

3. Comments on post via api.
