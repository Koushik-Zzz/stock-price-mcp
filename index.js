import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"; // MCPServer to create new mcp server
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"; // Stdio Server Transport to input data from your terminal
import { z } from "zod"; // importing zod for data validation
import 'dotenv/config' // dot env to get the api key
const server = new McpServer({ // creating a mcp server
  name: "get stock prices", // this name identifies your overall MCP
  version: "1.0.0",
});
server.tool( // creating a tool
  "get-stock-prices", // this is the main identifier Claude uses to recognize and call your specific tool if you name it something weird like 'hugabuga' then you have to tell claude use hugabuga tool
  { StockSymbol: z.string() }, // input validation using zod
  async ({ StockSymbol }) => { // creating a function that will do most of your work and passing stock symbol as parameter
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${StockSymbol}&apikey=${process.env.Alpha_Vantage_Api_Key}`); // calling alpha vantage api to get data also passing stock symbol and apikey
      if (!response.ok) { // error handling
        
        return {
          content: [
            { type: "error", error: "API Error Unable to retrieve data" }
          ]
        };
      }

      const data = await response.json();
      if (data) {

        return { // you have to return an object this is required
          content: [
            {
              type: "text", // you have to explicitly tell what type of data you are sending if it was json i have to write json
              text: `
                Symbol: ${data["Global Quote"]["01. symbol"]}
                Open: ${data["Global Quote"]["02. open"]}
                High: ${data["Global Quote"]["03. high"]}
                Low: ${data["Global Quote"]["04. low"]}
                Price: ${data["Global Quote"]["05. price"]}
                Change: ${data["Global Quote"]["09. change"]} (${data["Global Quote"]["10. change percent"]})`
            }
          ]
        };
      }

      else {

        return {
          content: [
            { type: "error", error: "API Error Unable to Fetch data" }
          ]
        };
      }
    }
    catch (error) {

      return {
        content: [{ type: "error", error: error.message }]
      };
    }
  }
);
const transport = new StdioServerTransport(); // setting up the stdio Transport
await server.connect(transport); // starting mcp server its like server.listen in express js