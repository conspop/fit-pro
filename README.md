<!-- README Requirements
Don't underestimate the value of a well crafted README.md.

The README.md introduces your project to prospective employers and forms their first impression of your work!

Note: Do not include project planning (user stories, wireframes or ERDs) in the README.md.

Include the following sections within the README.md:

☐ App Title: Contains a description of what the app does and optional background info.

☐ Screenshot(s): A screenshot of your app's landing page and any other screenshots of interest.

☐ Technologies Used: List of the technologies used.

☐ Getting Started: That Includes:

A link to the deployed app (Heroku)
A link to the Trello board used for the project's planning that includes user stories, wireframes & an ERD.
☐ Next Steps: Planned future enhancements (icebox items). -->

# FITPRO

## Links

[Github Repo](https://github.com/conspop/fit-pro)

[Deployed App](https://fitproapp.herokuapp.com)

To play with the app:
- Sign up for an account
- Choose Add Classes in the bottom nav menu
- Add a weekly or one-time class
- Choose Weekly Classes or View Schedule
- In View Schedule, tag classes as Taught or as Cancelled

## Description

Group class fitness professionals have a unique career in a few ways:

- Instead of a full or part-time role with their employer, they are contracted to teach specific classes, usually weekly.
- Because of studios' need to provide a varied schedule, one employer is unable to fill an instructors schedule. This means that they are often teaching for multiple employers. Different employers may have different payment terms such as flat or per head rates.
- They are most often independent contractors as opposed to employees and are required to invoice their employers each month.

Due to these factors, existing shift tracking or invoicing software does not adequately meet their needs. Calendars or spreadsheets are often used and accuracy is sacrificed.

FITPRO is a class tracking and invoice creation tool designed specifically for group class fitness professionals.

## Technologies Used

- Mongo DB
- Express
- React JS
- Node JS
- Ant Design CSS (Date and Time Pickers)
- HTML/CSS/Javascript

## Screenshots

### Adding Classes

The user adds their weekly and one-time classes to FITPRO.

<img src='https://github.com/conspop/fit-pro/blob/main/screenshots/Add.png'>

### Weekly Class Summary

The user can view their active or inactive weekly classes. They can also update the end date and estimated number of heads (for classes with per head payment terms) for these classes.

<img src='https://github.com/conspop/fit-pro/blob/main/screenshots/Weekly.png'>

### Schedule View

The user can view their schedule for any period which is populated based on their entered classes. They should tag the classes that they've taught and the classes that they've cancelled as such and the app will update their projected income and number of classes for the period.

<img src='https://github.com/conspop/fit-pro/blob/main/screenshots/Schedule.png'>
<img src='https://github.com/conspop/fit-pro/blob/main/screenshots/Schedule%202.png'>

## Next Steps

- The most important next step is to complete the app by adding the Create Invoice functionality. The user will provide a studio and a timeframe and the app will generate a downloadable invoice for them.
- Give the user more flexibility for adding classes. For example, I will add the ability to choose different frequencies for classes other than weekly. I will also add more types of payment terms like minimums.
- Provide users with notifications. They could select to have a daily schedule sent to their email or be notified when they have classes that have not been tagged.
- I would like to add a tutorial to the app so it is easier for new users to understand.

