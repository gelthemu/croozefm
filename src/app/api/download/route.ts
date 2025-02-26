import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract the URL parameter from the request
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return new Response("Missing file URL", { status: 400 });
    }

    // Fetch the remote file
    const response = await fetch(fileUrl);

    if (!response.ok || !response.body) {
      return new Response(`Failed to fetch file: ${response.statusText}`, {
        status: response.status,
      });
    }

    // Stream response to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="mixtape.mp3"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
