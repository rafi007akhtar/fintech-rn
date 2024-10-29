export async function GET(request: Request) {
  try {
    const response = await fetch(
      `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d`
    );
    const result = await response.json();
    return Response.json(result);
  } catch (e: any) {
    console.warn(
      "Something went wrong while fetching crypto response:",
      e.toString()
    );
  }
}
