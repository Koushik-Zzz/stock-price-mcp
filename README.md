## Project Overview

This project is an MCP server that provides real-time stock information. When given a stock symbol (like AAPL, MSFT, GOOG), it returns:
- Stock symbol
- Opening price
- High price
- Low price
- Current price
- Change in price (amount)
- Change in price (percentage)

## Installing and Running the MCP Locally


```bash
git clone https://github.com/Koushik-Zzz/stock-price-mcp.git

cd stock-price-mcp

npm install
```
## Don't forget to add your mcp to claude_desktop_config.json
This is how your claude config.json should look like.
Example below is for Linux:

```json
{
  "mcpServers": {
    "get-stock-prices": {
      "command": "node",
      "args": [
        "/home/{username}/Desktop/Stock-Price-MCP/index.js"
      ]
    }
  }
}
```