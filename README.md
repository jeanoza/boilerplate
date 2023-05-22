# Boilerplate

This repository is a boilerplate to use in future

## Stacks

- Frontend: React(TypeScript), Tailwind

- Backend: Node/Express(TypeScript), TypeORM

- Database: PostgreSQL

- Devops: Docker

- Method: TDD

## Feature

### Backend

- auth router, service, controller:

- [x] GET "/": verify token then send payload or throw error

- [ ] POST "/signin": verify exist user then send a token by cookie

- [ ] POST "/signup": create user then then send a token by cookie

- add a Mapper(Handler) class like ExceptionHandler in nest or spring to uniformize Error message(ValidationError or etc)
