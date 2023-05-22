# Wyre

- [Wyre](#wyre)
  - [Introduction](##introduction)
  - [Installation](##installation)
  - [Usage](##usage)


## Introduction
Wyre is a cross border payment app.
- Get paid in fiat, Get settled in USDC.

Technology used
1. Frontend: Typescript, NextJS
2. Backend: Typescript, NextJS, Supabase
3. Payment: Circle API

```bash
https://wyre-sh.vercel.app/ -  Wyre dashboard
https://wyre-sh.vercel.app/pay/[id] - Wyre payment page
```

## Installation

Clone the project

```bash
  git clone https://github.com/Iamstanlee/wyre.sh
```

Go to the project directory

```bash
  cd wyre.sh
```

Install dependencies

```bash
  yarn install
```

Create a `.env` file from `.env.example`

```bash
  cp .env.example .env
```

Run the app on your terminal

```bash
  yarn dev
```

## Usage
Wyre uses circle payment and payout APIs to handle fiat payment and transfer to external crypto wallet.


