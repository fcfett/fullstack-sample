import { serve } from "bun";
import hts from "./data/hts_data_2025.json";

const API_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400",
  "Content-Type": "application/json",
};


const getSourceNotFoundError = (code: unknown) => ({
  statusText: `Source "${code}" Not Found`,
  status: 404
})

const server = serve({
  port: 3000,
  routes: {
    "/": () => {
      return new Response('Hello world!', { headers: API_HEADERS})
    },
    "/api/hts/:code": async req => {
      const { code } = req.params
      const data = (hts as Array<any>).filter(entry => entry.htsno === code)[0]
      const error = getSourceNotFoundError(code)
      return new Response(
        JSON.stringify(data ?? error),
        {
          headers: API_HEADERS,
          ...(!data && error)
        }
      )
    },
  }
});

console.info(`API listening on ${server.url}`);