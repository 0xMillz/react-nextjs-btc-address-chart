# Time Series of Tiered Crypto Balances over Time --- A Next.js PoC using Nivo charts & Dynamic SSR

## Table of Contents

- [Notes](#introductory-notes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running locally](#running-locally)
- [Usage](#usage)
- [Original Challenge Prompt](#original-challenge-prompt)

## Notes:
1. I decided to try [Nivo](https://github.com/plouc/nivo) for the charting library. In the past, I've used chart.js the most, but it does not work well if SSR is a goal. I chose Nivo because it has an active developer community with over 11k stars on GitHub, is very customizable, and offers HTML + SVG charts that can be server-side rendered.
1. I used the [Coin Metrics API](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesAssetMetrics) to scrape the time-series data into a JSON file in the ./data directory.
1. I hit my time-box (got bored) for this PoC, so I did not get to add functionality to filter the chart by YTD, 12M, 3M and/or 1M. I would have also liked to make the components a little more generic, so you could show ETH, LTC, DOGE, ETC with little code duplication. And lastly, as a color-blind person, I would have liked to customize each line with a pattern or texture to make it easier to distinguish between them.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js >= v16.20.0 (needed for Next.js v13.x.x) - [Install Node.js](https://nodejs.org)
- npm >= v9.7.1 - comes pre-installed with Node.js.

### Running locally

1. Install dependencies:

   ```shell
   npm i
   ```

### Usage

1. Start the development server:

   ```shell
   npm run dev
   ```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

# Original Goals of PoC:

1) Create an area or line chart that displays an all-time historic view on btc address balances

2) Draw 5 lines in different colors displaying balances

- over $1k
- over $10k
- over $100k
- over $1M
- over $10M

3) Display a legend that labels each line color.

## Stretch Goals

- Add buttons and filter functionality to filter the chart by YTD, 12M, 3M and 1M.
- <b>Improve performance by leveraging server side rendering (SSR)</b>

## Example Implementation (Design examples to imitate)

![chart1.png](chart1.png)

![chart2.png](chart2.png)

![chart3.png](chart3.png)
