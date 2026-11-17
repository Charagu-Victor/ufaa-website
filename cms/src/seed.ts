import type { Core } from '@strapi/strapi';

/**
 * Optional starter content. Runs only when SEED_DEMO_DATA=true and the
 * site has not been seeded before. Everything here is a placeholder drawn from
 * public UFAA information: editors must review and replace it before launch.
 */

const SETTINGS_UID = 'api::site-setting.site-setting' as const;
const HOME_UID = 'api::homepage.homepage' as const;

async function isEmpty(strapi: Core.Strapi, uid: any) {
  const count = await strapi.documents(uid).count({});
  return count === 0;
}

export async function seedDemoData(strapi: Core.Strapi) {
  if (!(await isEmpty(strapi, SETTINGS_UID))) {
    strapi.log.info('[seed] Content already present, skipping demo seed.');
    return;
  }
  strapi.log.info('[seed] Seeding UFAA starter content...');

  await strapi.documents(SETTINGS_UID).create({
    status: 'published',
    data: {
      siteName: 'Unclaimed Financial Assets Authority',
      shortName: 'UFAA',
      tagline: 'Receive, Safeguard and Re-unite Unclaimed Financial Assets',
      email: 'info@ufaa.go.ke',
      phones: '020 4023 000\n+254 706 866 984',
      postalAddress: 'P.O. Box 28235-00200, City Square, Nairobi',
      physicalAddress: 'Pacis Centre, 2nd Floor, Slip Road, Off Waiyaki Way, Westlands, Nairobi',
      ussdCode: '*361#',
      eCitizenUrl: 'https://www.ecitizen.go.ke',
      claimPortalUrl: 'https://reunify.ufaa.go.ke',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ufaa.ereunify_mobile',
      appStoreUrl: 'https://apps.apple.com/my/app/ufaa-reunite/id6812353264',
      knowledgeHubLinks: [
        { label: 'Publications and forms', href: '/publications' },
        { label: 'Frequently asked questions', href: '/faqs' },
        { label: 'News', href: '/news' },
        { label: 'Notices', href: '/notices' },
      ],
      aboutLinks: [
        { label: 'About Us', href: '/about/about-ufaa' },
        { label: 'Board Of Directors', href: '/leadership#board-of-directors' },
        { label: 'Management Team', href: '/leadership#management-team' },
        { label: 'Access To Information', href: '/about/access-to-information' },
      ],
      findClaimLinks: [
        { label: 'Find Assets', href: '/find-claim' },
        { label: 'Claiming Instructions', href: '/find-and-claim/claiming-instructions' },
        { label: 'No Objection Notice', href: '/find-and-claim/no-objection-notice' },
        { label: 'Reunification Agency', href: '/find-and-claim/reunification-agency' },
      ],
      reportAssetsLinks: [
        { label: 'Compliance Notice', href: '/holders/compliance-notice' },
        { label: 'Reporting Instructions', href: '/holders/reporting-instructions' },
        { label: 'Bank Details', href: '/publications' },
        { label: 'Asset Codes', href: '/publications' },
        { label: 'Report Assets', href: '/holders/login' },
      ],
      procurementLinks: [
        { label: 'Tenders On EGP', href: '/tenders' },
        { label: 'Procurement Plan', href: '/publications' },
        { label: 'E-Procurement', href: 'https://eprocurement.ufaa.go.ke' },
      ],
      footerNote:
        'A State Corporation established under the Unclaimed Financial Assets Act, No. 40 of 2011.',
    },
  } as any);

  await strapi.documents(HOME_UID).create({
    status: 'published',
    data: {
      heroTitle: 'Is there unclaimed money waiting for you?',
      heroSubtitle:
        'Search for unclaimed financial assets held by the Authority and start your claim. The service is free, and there is no deadline for claiming.',
      stats: [
        { value: '59', label: 'Huduma Centres offering UFAA services' },
        { value: 'KSh 40.7B', label: 'Cash mobilised over the past decade' },
        { value: 'No deadline', label: 'Owners can claim at any time' },
      ],
      introTitle: 'What we do',
      introBody:
        'The Unclaimed Financial Assets Authority receives unclaimed financial assets from the institutions that hold them, safeguards them, and reunites them with their rightful owners.',
      steps: [
        { title: 'Search', description: 'Check whether you or a relative has assets held by the Authority.' },
        { title: 'Prepare documents', description: 'Gather the identification and supporting documents for your type of claim.' },
        { title: 'Lodge your claim', description: 'Submit online, or visit any Huduma Centre for help.' },
        { title: 'Receive your funds', description: 'Approved claims are paid to your bank account or mobile money.' },
      ],
    },
  } as any);

  await strapi.documents('api::page.page').create({
    status: 'published',
    data: {
      title: 'About UFAA',
      slug: 'about-ufaa',
      parent: 'about',
      summary: 'Who we are, our mandate, vision, mission and values.',
      body: [
        'The Unclaimed Financial Assets Authority (UFAA) is a state corporation established under the National Treasury pursuant to the Unclaimed Financial Assets Act, No. 40 of 2011.',
        '',
        '## Our mandate',
        'Our primary mandate is to receive unclaimed financial assets from the holders of such assets, safeguard them, and re-unite them with their rightful owners. The Authority also acts as trustee to the Fund and enforces and administers the Act.',
        '',
        '## Vision',
        'A trusted institution in the management of unclaimed assets.',
        '',
        '## Mission',
        'To receive, safeguard and re-unite unclaimed financial assets for socio-economic prosperity.',
        '',
        '## Core values',
        '- Customer focus',
        '- Transparency and accountability',
        '- Collaboration and partnerships',
        '- Innovativeness',
        '- Professionalism',
      ].join('\n'),
      seo: { metaTitle: 'About UFAA', metaDescription: 'Learn about the Unclaimed Financial Assets Authority, its mandate, vision and mission.' },
    },
  } as any);

  await strapi.documents('api::page.page').create({
    status: 'published',
    data: {
      title: 'Claiming Instructions',
      slug: 'claiming-instructions',
      parent: 'find-and-claim',
      summary: 'What you need to prepare before lodging a claim.',
      body: [
        'Requirements depend on whether you are the original owner or a beneficiary. Confirm the current requirements with the Authority before you submit.',
        '',
        '## Typically required',
        '- A completed claim form (original owner or beneficiary)',
        '- A completed indemnity agreement, where applicable',
        '- National ID or passport, and KRA PIN certificate',
        '- Your bank account details',
        '- An official letter from the holder confirming that the assets were remitted to the Authority',
        '',
        '## Claims on behalf of a deceased person',
        'Beneficiary claims need additional documents such as the death certificate and proof that you are the executor or personal representative.',
        '',
        '## Processing time',
        'A fully supported claim from an original owner is processed within 30 days, and a beneficiary claim within 90 days. See the Service Charter for details.',
      ].join('\n'),
    },
  } as any);

  await strapi.documents('api::page.page').create({
    status: 'published',
    data: {
      title: 'Unclaimed Assets Trust Fund',
      slug: 'trust-fund',
      parent: 'services',
      summary: 'How the Unclaimed Assets Trust Fund receives and pays unclaimed assets.',
      body: [
        '## Status of the Unclaimed Assets Trust Fund',
        'The Unclaimed Assets Trust Fund was created under Section 44 of the Unclaimed Financial Assets Act, No. 40 of 2011. It is vested in, and operated and managed by the Authority.',
        '',
        'The Fund receives remittances from holders for all money that becomes or is deemed to be unclaimed assets and other payments required by the Act or by any other written law to be paid into the Fund.',
        '',
        'Once identified, payments are made out of the Fund to rightful owners of unclaimed assets.',
        '',
        'The Authority has received remittances amounting to KSh 115.03 billion from holders into the Trust Fund Account, including foreign currency in various denominations. Reports have been made for 2.03 billion units of shares, 4,200 safe deposit boxes, and 9.9 million units of trusts.',
        '',
        'The Authority has so far received and paid claims amounting to KSh 2.84 billion from 39,203 claimants.',
        '',
        'The Unclaimed Financial Assets Regulations, 2016 formalize processes relating to the management of unclaimed financial assets.',
      ].join('\n'),
      seo: { metaTitle: 'Unclaimed Assets Trust Fund', metaDescription: 'Learn about the status and role of the Unclaimed Assets Trust Fund.' },
    },
  } as any);

  const faqs = [
    ['General', 'What is the Unclaimed Financial Assets Authority?', 'A state corporation established under the Unclaimed Financial Assets Act, No. 40 of 2011 to receive, safeguard and re-unite unclaimed financial assets with their rightful owners.'],
    ['General', 'Do I lose my assets once they are remitted to UFAA?', 'No. Once remitted, the Authority holds the assets in the public interest and you keep an indefinite right of reunification.'],
    ['Claims', 'Is there a deadline for filing a claim?', 'No. Owners can claim their assets at any time.'],
    ['Claims', 'How long does it take to process a claim?', 'After receipt of a fully supported claim, an original owner claim is processed within 30 days and a beneficiary claim within 90 days.'],
    ['Claims', 'Does it cost anything to search or claim?', 'The search and claim service is free.'],
    ['Claims', 'Can I check for unclaimed assets without visiting an office?', 'Yes. You can search through the UFAA website, or dial the USSD code *361#.'],
    ['Holders', 'How do holders report and surrender unclaimed assets?', 'Cash is remitted to the Unclaimed Assets Trust Fund account at the Central Bank of Kenya, and non-cash assets are reported through the holders reporting portal.'],
  ];
  let order = 10;
  for (const [category, question, answer] of faqs) {
    await strapi.documents('api::faq.faq').create({
      status: 'published',
      data: { category, question, answer, order: (order += 10) },
    } as any);
  }

  await strapi.documents('api::office.office').create({
    status: 'published',
    data: {
      name: 'Head Office',
      address: 'Pacis Centre, 2nd Floor, Slip Road, Off Waiyaki Way, Westlands, Nairobi',
      phone: '020 4023 000',
      email: 'info@ufaa.go.ke',
      isHeadOffice: true,
    },
  } as any);

  await strapi.documents('api::news-article.news-article').create({
    status: 'published',
    data: {
      title: 'Government launches nationwide reunification services through Huduma Centres',
      slug: 'reunification-services-huduma-centres',
      summary:
        'UFAA reunification services are now available at Huduma Centres across the country, bringing the claims process closer to citizens.',
      content:
        'The Principal Secretary for Public Investments and Assets Management presided over the launch at Machakos. Huduma Kenya staff now deliver UFAA reunification services under a one-stop-shop approach, complementing the Authority\'s digital platforms.',
      publishedOn: '2026-02-25',
      category: 'Press Release',
      featured: true,
    },
  } as any);

  strapi.log.info('[seed] Done.');
}
