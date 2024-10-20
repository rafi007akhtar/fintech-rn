const API_KEY = process.env.CRYPTO_API_KEY!;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${id}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    const result = await response.json();
    return Response.json(result.data);
  } catch (e: any) {
    console.warn(
      "Something went wrong while fetching crypto response:",
      e.toString()
    );
  }
}
