# Boilerplate

This repository is a boilerplate to use in future

## Stacks

- Frontend: React(TypeScript), Tailwind

- Backend: Node/Express(TypeScript), TypeORM

- Database: PostgreSQL

- Devops: Docker

- Method: TDD

## Feature

### Frontend

- [ ] authLayout:

  - [ ] when user doesn't have valid token in cookie => redirect to "/sign-in"

- [ ] signin/signup:

  - [ ] redirect to "/" if user have a accessToken in cookie.

### Backend

- [x] auth router, service, controller:

  - [x] POST "/signin": verify exist user then send a token by cookie

  - [x] POST "/signup": create user then then send a token by cookie

- add a Mapper(Handler) class like ExceptionHandler in nest or spring to uniformize Error message(ValidationError or etc)
