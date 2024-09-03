Shared repository for all functions used across projects.

## Setup dotenv

https://lusbuab.medium.com/using-dotenv-with-jest-7e735b34e55f

Install dotenv
```shell
npm install dotenv --save
```

Add to jest file
```js 
{
    setupFiles: ['dotenv/config']
}
```