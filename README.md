# n8n-nodes-google-news-api

An [n8n](https://n8n.io/) community node that searches Google News and returns structured articles: title, source, snippet, date, and link. It is backed by the [Google News API](https://apify.com/johnvc/GoogleNewsAPI?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query, and it returns one item per news article with the title, source, snippet, relative date, and link. It also works as an **AI Agent tool**, so an agent can pull the latest news on demand.

- Search news by query, optionally scoped to a location
- Localize with a country code and language code
- Toggle safe search and fetch multiple pages
- Choose how much data to return per article: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-news-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google News** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Article > Search** returns news articles that match a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to search news for. Required. |
| Location | Location to run the search from. Optional. |
| Country Code / Language Code | Localization, for example `us` and `en`. |
| Safe Search | Active or Off. |
| Maximum Pages | How many result pages to fetch. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each article is returned as its own n8n item. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `position`, `title`, `source`, `snippet`, `date`, and `link`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each article, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `position` | integer | Rank of the article on the page |
| `title` | string | Article headline |
| `link` | string | Article URL |
| `source` | string | Publisher name |
| `snippet` | string | Short excerpt |
| `date` | string | Relative publish time, for example `12 hours ago` |

## Example workflows

### 1. Daily news digest by topic

1. **Schedule Trigger**: run each morning.
2. **Google News**: Search Query your topic, Output `Simplified`.
3. **Send Email** or **Slack**: send the list of `title`, `source`, and `link`.

### 2. Brand or competitor monitoring

1. **Schedule Trigger**: run hourly.
2. **Google News**: Search Query a brand name.
3. **Remove Duplicates** then **Slack**: alert on new coverage.

### 3. Let an AI Agent summarize the news

1. **AI Agent** node.
2. Attach **Google News** as a tool.
3. Ask "What's the latest on electric vehicles?" The agent calls the node (in Simplified mode) and summarizes the headlines.

## Pricing

This node calls the [Google News API](https://apify.com/johnvc/GoogleNewsAPI?fpr=9n7kx3) on Apify, which is billed **pay-per-result**: a small per-search fee (a few cents per page of results) plus a fraction of a cent per article returned, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/GoogleNewsAPI?fpr=9n7kx3) for current rates.

## Resources

- [Google News API on Apify](https://apify.com/johnvc/GoogleNewsAPI?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-news-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
