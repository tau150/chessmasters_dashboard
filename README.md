# Solution

<br>

## Approach

The idea was to keep the challenge as simple as possible, but trying to give it a solid structure for future implementations.

<br>

## Architecture and folder structure

I tried to keep the structure simple but prepared to extension in case new features appear in the future.
Inside module folder we will find the key piece of it, that is the domain folder. Our business entity and rules will be defined in it. This will allow us to have a good definition of our entity and always refer to it in the same way in out front end context. At this point and because our app is really simple this doesn't make a huge change, but it is very useful when the app grows.
The Services folder will contain our infrastructure, our in/out communication with external actors. Right now we have just an implementation for http communication, and probably we won't need anything else. But if we think we could have more implementations we could apply a repository pattern to consume abstractions and not punctual implementations in our code.
Finally, we will find our Pages,components, hooks, utils, constants and all things we need four our UI, always scoped to the place where are needed.

<br><br>

## Data fetching and cache

For our data fetching I implemented an util over fetch api to have more control over it and an abstraction layer. Besides that, I took the decision of using react-query to consume our services because it gives us a really good manage effects around our calls to the backend. For our current scenario it could looks as too much, but otherwise I would have to make a custom hook to consume the services and avoid to have that logic in components, so I decided to use react query that already give me that functionality and works pretty well.

<br><br>

## Styles

For styling I chose chakra UI, it's a simple library that gives us a lot of simple components and the chance to customize easily through props. At this point I didn't want to spend to much time writing styles.

<br><br>

## Testing

I know testing wasn't required, but I feel more comfortable writing testing around my code. I used react-testing-library and vitest as test engine.

<br>
I applied unit testing to what I considered the main functionalities of our app. I could go one step further and use msw to override server responses, but because of time constrains I decided to mock the use case implementation of the custom hooks.
<br>
You can check the test running the following command:

<br><br>


```
npm run test
npm run coverage

```

<br><br>

## Linting

I have set some eslint rules to have a consistent style, but this is really opinionated and it can be customized to suit the development team's taste.

<br><br>

## Dates management

For date management I used native dates, in case in the future we will have an extensive use of dates maybe it could be a good idea to consider some library to make dev experience easy.

<br><br>

# Live Preview

https://chessmasters-dashboard.vercel.app/


<br><br>

# How to run the project locally

<br>

### Configuration

<br>

- Create a .env.local file with the following content

```
VITE_BASE_HOST=https://api.chess.com/pub
```

```
  npm install
  npm start

```