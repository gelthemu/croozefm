import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        const headers = new Headers();
        headers.set('Content-Type', contentType);
        headers.set('Content-Disposition', 'attachment');
        headers.set('Access-Control-Allow-Origin', '*');

        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        const stream = response.body;
        if (!stream) {
            throw new Error('No response body');
        }

        return new NextResponse(stream, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error('Download error:', error);

        if (error === 'AbortError') {
            return NextResponse.json(
                { error: 'Request timeout' },
                { status: 504 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to download file' },
            { status: 500 }
        );
    }
}