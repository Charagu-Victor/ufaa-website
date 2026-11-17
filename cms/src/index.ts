import type { Core } from '@strapi/strapi';
import { seedDemoData } from './seed';

const PUBLIC_COLLECTIONS = [
  'page',
  'news-article',
  'notice',
  'tender',
  'vacancy',
  'publication',
  'faq',
  'office',
  'team-member',
];
const PUBLIC_SINGLES = ['site-setting', 'homepage'];

/** Give the anonymous "Public" role read-only access to published content. */
async function setPublicPermissions(strapi: Core.Strapi) {
  const role = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!role) return;

  const actions: string[] = [];
  for (const name of PUBLIC_COLLECTIONS) {
    actions.push(`api::${name}.${name}.find`, `api::${name}.${name}.findOne`);
  }
  for (const name of PUBLIC_SINGLES) {
    actions.push(`api::${name}.${name}.find`);
  }

  for (const action of actions) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: role.id } });
    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: role.id } });
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    if (process.env.SEED_DEMO_DATA === 'true') {
      await seedDemoData(strapi);
    }
  },
};
