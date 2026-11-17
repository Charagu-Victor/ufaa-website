import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Strapi webhook target. In Strapi: Settings > Webhooks > Create new webhook
 *   URL:     https://<your-site>/api/revalidate
 *   Headers: x-revalidate-secret = <REVALIDATE_SECRET>
 *   Events:  Entry publish, unpublish, update and delete (plus Media update)
 * The webhook body contains `model` (for example "news-article"), which maps to the cache tag.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret") ?? request.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  let model: string | undefined;
  try {
    const body = await request.json();
    model = typeof body?.model === "string" ? body.model : undefined;
  } catch {
    // An empty body refreshes everything below.
  }

  if (model) {
    revalidateTag(`strapi:${model}`, "max");
    // Navigation and the home page depend on several content types.
    if (model === "page") revalidateTag("strapi:homepage", "max");
  } else {
    revalidateTag("strapi", "max");
  }

  return NextResponse.json({ ok: true, revalidated: model ?? "all", at: new Date().toISOString() });
}
