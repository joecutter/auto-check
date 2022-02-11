# AutoCheck

## Packages

Use command to install

```bash
yarn 
```

## Setup

Use command to run

```bash
yarn start
```
### Using docker

```bash
docker build -t nestjs .
docker run -d --name nestjs -d --restart=unless-stopped -p 3111:3111 nestjs
```

## endpoint

To test endpoint

```bash
curl http://localhost:3111/hacker-news/last_25
```

```bash
curl http://localhost:3111/hacker-news/last_week
```

```bash
curl http://localhost:3111/hacker-news/user_with_karma
```