import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')!,
  },
  apiToken: {
    salt: env('API_TOKEN_SALT')!,
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // "Preview" button in the content editor: opens the draft on the Next.js site.
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'http://localhost:3000') as string],
      async handler(uid: string, { documentId }: { documentId: string }) {
        const routes: Record<string, string> = {
          'api::news-article.news-article': 'news-article',
          'api::page.page': 'page',
        };
        const type = routes[uid];
        if (!type) return null; // No preview for other content types.

        const document = await strapi.documents(uid as any).findOne({ documentId, fields: ['slug'] } as any);
        if (!document?.slug) return null;

        const clientUrl = env('CLIENT_URL', 'http://localhost:3000');
        const secret = env('PREVIEW_SECRET', 'change-me-preview');
        return `${clientUrl}/preview/${type}/${document.slug}?secret=${encodeURIComponent(secret)}`;
      },
    },
  },
});

export default config;
