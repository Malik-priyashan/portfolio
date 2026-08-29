import * as XLSX from "xlsx";

function getSheetUrl(url) {
  if (!url) return "";

  const publishedMatch = url.match(/docs\.google\.com\/spreadsheets\/d\/e\/([^/]+)/);
  if (publishedMatch) {
    const publishedId = publishedMatch[1];
    const gid = url.match(/[?#&]gid=(\d+)/)?.[1];
    const exportUrl = new URL(`https://docs.google.com/spreadsheets/d/e/${publishedId}/pub`);
    exportUrl.searchParams.set("output", "csv");
    if (gid) exportUrl.searchParams.set("gid", gid);

    return exportUrl.toString();
  }

  const match = url.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/);
  if (!match) return url;

  const sheetId = match[1];
  const gid = url.match(/[?#&]gid=(\d+)/)?.[1];
  const exportUrl = new URL(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`);
  exportUrl.searchParams.set("tqx", "out:csv");
  if (gid) exportUrl.searchParams.set("gid", gid);

  return exportUrl.toString();
}

export async function GET() {
  try {
    const sourceUrl = process.env.NEXT_PUBLIC_SHEET_URL;

    if (!sourceUrl) {
      return new Response(
        JSON.stringify({ error: "NEXT_PUBLIC_SHEET_URL is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch(getSheetUrl(sourceUrl), { cache: "no-store" });

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch sheet data. Google returned ${res.status}. Make sure the sheet is shared with anyone who has the link.`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const contentType = res.headers.get("content-type") || "";

    const workbook = contentType.includes("text/csv")
      ? XLSX.read(await res.text(), { type: "string" })
      : XLSX.read(await res.arrayBuffer(), { type: "array" });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return new Response(JSON.stringify({ error: "No sheets were found in the workbook." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, cause: error.cause?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
