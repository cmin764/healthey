# PR Review Exercise: Add Worker ratings

This repository contains an intentionally simplified project, and a single Pull Request (PR) for you to review. Instructions on how to run the project locally are included in the main [README.md](../README.md). Note that testing is not included in this repository, and although this would be a concern in a real-life scenario, it will not be considered in-scope for this exercise.

## Brief

As context, assume you work at a company that powers a marketplace app for healthcare facilities to hire healthcare providers (a.k.a. workers). You are the Engineering Manager for the team that owns the backend service responsible for worker shift management. Your team is working on a new feature to allow healthcare facilities to rate the job performed by the workers of the facility's shifts.

![Architecture Diagram](/assets/pr-review-diagram.png)

Your task is to review the PR submitted by a member of your team to implement new feature requirements below, and provide them with concise, specific, and actionable comments, including a top-level comment with your general assessment of their work (e.g. approve the submission, recommend or request changes, etc.).

## New Feature Requirements

* Description
  - Create interfaces to allow healthcare facilities to rate a worker's performance on a given shift, and potentially block the worker from applying to shifts posted by the healthcare facility in the future.
* Acceptance Criteria
  - The new interface to rate a worker's performance should be a REST endpoint that requires the following parameters as part of the JSON request body:
    - `shiftUuid`
    - `workerUuid`
    - `rating`
  - The value of `rating` should be an integer between 1 and 5, inclusive.
  - The new interface to block a worker from applying to a healthcare facility's future shifts should be a REST endpoint that requires the following parameters as part of the JSON request body:
    - `shiftUuid`
    - `workerUuid`
    - `blockReason`
  - Workers who have been blocked from applying to a healthcare facility's shifts should not be able to apply to shifts from the facility that blocked them

## Tips to be successful

- Keep in mind that we are a fully remote and globally distributed engineering team, and it is not uncommon for PR authors and reviewers to be separated by many time zones. As a result, we've found it is crucial that PR comments and feedback are structured for efficient communication (minimizing back-and-forth), that they are clearly justified and expose the reviewer's mental model, and that they are actionable for the author (often recommending a specific "at least as good as _this_"-style solution that is passable, but that the author may also improve upon). If your written feedback meets our expectations, you'll be invited to a live interview to expand on your thoughts and discuss the submission with a member of our team.
- Don't be afraid to explore the project code beyond the diff, by downloading and exploring the code, running and debugging it locally, and/or using Github's '.' keyboard shortcut to open the pull request in the github.dev editor so you can see the surrounding unmodified code and to ensure you have full context on existing libraries and project settings.
- Focus your feedback on the changes in the Pull Request. Remember, the project is intentionally simplified, and some aspects that would conventionally be present in a real production application are not included (e.g. authentication/authorization, test automation, etc.).
- The project already has certain design patterns in place, while they may not be ideal or follow best practices, avoid focusing on these subpar patterns for your review. Feel free to comment on them, but don't make it the focal part of your code review.
- The application uses [Prisma](https://www.prisma.io/) as an ORM layer; don't worry if you have never used Prisma before, the Prisma APIs used in this exercise are very intuitive. Most importantly, Prisma's approach to modeling the data schema should be easy to follow, you can check the project's [data schema here](../prisma/schema.prisma).

**Don't forget to click "Submit" to Hatchways when you're done!**
![Submit to Hatchways](/assets/submit-to-hatchways.png)

## Helpful links

- As mentioned above, make sure you take a look to [the data schema](../prisma/schema.prisma) so you have this reference handy.
- The application exposes a REST API, which is defined in an Open API (formerly known as Swagger) schema, also [included in the project](../src/rest/v1/openapi.yml).
- The [Swagger Editor](https://editor.swagger.io/) is a great resource for exploring the Open API schema, copy and paste it the contents of the Open API schema in the editor to easily navigate it. 
