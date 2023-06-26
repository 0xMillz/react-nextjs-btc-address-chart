# Mills McIlroy's Next.js Interview Challenge

## Table of Contents

- [My Notes](#introductory-notes)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Local Installation](#local-installation)
- [Usage](#usage)
- [Original Challenge Prompt](#original-challenge-prompt)

## My Notes:

1. I followed the main implementation instructions as well as the bonus points, using the provided CoinMetrics CSV file as the data source. One abnormaility I noticed is that the "BTC / Addr Cnt of Bal ≥ $1K" column does not fit with the other columns, and should probably not even belong on the same chart. It is an integer count of all addresses that have a USD-value balance >= $1k, while the rest of the numeric columns are a sum of all BTC balances held in addresses with a balance >= the given USD-value tier. Assuming it was an attention-to-detail type of purposeful mistake for the challenge, I decided not to include the data from the "BTC / Addr Cnt of Bal ≥ $1K" column because it would not make sense on a chart where the Y-axis is measured in units of BTC. Additionally, I know from my experience building CoinCap.io that historical BTC data can be quite expensive, so for the purpose of this exercise I will just ignore that column instead of trying to find an alternative data source.
2. Some other honest feedback that I bet you've probably heard before in this new world of AI-assisted-EVERYTHING: I have Github Copilot integrated into my IDE, and I've tried my best to use it on this challenge only in the same way as I would on the job, despite its best efforts to autocomplete almost everything, even as I type this very sentence. Without a doubt it has shown me suggestions based on similar, if not the same, coding challenge. I did my best to avoid "cheating," while still following common React, TypeScript and Next.js best practices and patterns, as well as doing my own research into the latest versions of dependencies that might fit well in a Next.js v13 project like this one, keeping performance and UX in mind.

3. Your original repo for this challenge does not have forking enabled, so I created a new private repo on my GitHub account and copied the files over. I'll make sure to give read permissions to anyone on the Blockworks team who needs it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js >= v16.20.0 (needed for Next.js v13.x.x) - [Install Node.js](https://nodejs.org)
- npm >= v9.7.1 - comes pre-installed with Node.js. I removed the yarn.lock file in favor of npm to avoid the inconsistencies caused when mixing package managers.  

### Local Installation  

1. Clone the repository:

   ```shell
   git clone https://github.com/millsmcilroy/react-nextjs-btc-address-chart-mills.git
   ```  
1. Navigate to the project directory:  

   ```shell
   cd react-nextjs-btc-address-chart-mills
   ```

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
# Original Challenge Prompt:

## BTC Address Balance Chart Challenge

Create an area or line chart that displays an all-time historic view on btc address balances.

Draw 5 lines in different colors displaying balances

- over $1k
- over $10k
- over $100k
- over $1M
- over $10M

Display a legend that labels each line color.

See "Example Implementation" to get an idea of how the chart should look like.
An ideal implementation would include all features you can see in the example.

### Implementation Notes:

- Use a charting engine you feel most comfortable with
- Use the static data provided (`data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv`) to build an API method
  (`pages/api/btc-addresses`)
  - Format the CSV and return JSON timeseries for your charting engine
  - Call the API to load the data inside of your react component
  - Note: The CSV file is now outdated and won't provide any data after 02/2023 but you could compare your implementation with our example screenshot by changing your system clock to February 23.
- Make the chart look nice and clean (either by utilizing the example as a design template or give it your personal UI touch)

## Bonus Points

- Add buttons and filter functionality to filter the chart by YTD, 12M, 3M and 1M.
- Improve performance by leveraging server side rendering

## Example Implementation

![chart1.png](chart1.png)

![chart2.png](chart2.png)

![chart3.png](chart3.png)
