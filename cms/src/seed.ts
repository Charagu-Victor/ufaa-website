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

  type FaqCategory = 'General' | 'Claims' | 'Beneficiaries' | 'Holders';
  const faqs: [FaqCategory, string, string][] = [
    [
      'General',
      'What is Unclaimed Financial Assets?',
      `These are assets that:

1. Have been presumed abandoned and have become unclaimed assets under sections 4 to 18 of the Unclaimed Financial Assets Act.
2. Have been transferred to the Authority as unclaimed assets.
3. Have been deemed under another law to be unclaimed assets payable to the Authority. This includes income, dividends and interest, but excludes lawful charges.`,
    ],
    [
      'General',
      'How far back does the Unclaimed Financial Assets Law apply?',
      'Although the Law was enacted in 2011, it applies retrospectively to the date the holding institution was incorporated.',
    ],
    [
      'General',
      'What are examples of unclaimed assets?',
      `Examples include:

1. Dormant accounts at banks.
2. Unclaimed deposits and benefits from collapsed institutions.
3. Unclaimed dividends and interest earned from stocks and shares.
4. Unclaimed utility deposits held by power and water companies.
5. Unclaimed retirement benefits in pension funds.
6. Unclaimed death benefits and annuities from insurance companies.
7. Unclaimed bail and bond money deposited in courts of law.
8. Uncollected prize money, for example from a lottery.`,
    ],
    [
      'Claims',
      'Do I lose my money once it is turned over to UFAA?',
      "No. You do not lose unclaimed financial assets once they are remitted to the Authority. UFAA holds assets on behalf of the Government in the public interest and guarantees an indefinite right of reunification. Next of kin should regularly check the status of their deceased relatives' assets.",
    ],
    [
      'General',
      'Who bears the cost for opening a safe deposit box?',
      'If a safe deposit box is forced open, the Authority bears the cost of opening the box and repairing it.',
    ],
    [
      'General',
      'Who has unclaimed financial assets?',
      'Anyone can have unclaimed financial assets.',
    ],
    [
      'Claims',
      'How long does it take to process a claim?',
      'After receiving a fully supported claim, UFAA processes an original-owner claim within 30 days and a beneficiary claim within 90 days. See the [Service Charter](/publications?category=Service%20Charter) for more details.',
    ],
    [
      'Claims',
      'Is there a deadline for lodging a claim?',
      'There is no deadline for filing a claim with UFAA. Owners can claim their assets at any time.',
    ],
    [
      'General',
      'How do assets become "unclaimed"?',
      `Under sections 3 to 18 of the Unclaimed Financial Assets Act, 2011, assets may be deemed unclaimed when:

1. The owner has not communicated with the holder beyond the dormancy period prescribed in the Act.
2. The holder's records do not show the identity of the person entitled to the assets.
3. The owner has not transacted with the holder within the prescribed dormancy period.
4. The holder has not previously paid or delivered the assets to the owner.

Other causes may include forgetfulness, poor record-keeping, relocation within or outside the region, and death.`,
    ],
    [
      'Holders',
      'Who is a holder?',
      'A holder is an entity that is in possession of a financial asset on behalf of an owner.',
    ],
    [
      'Holders',
      'What are the duties of holders?',
      `Holders of unclaimed assets are required to:

- Make reasonable efforts to locate the owner and notify them about the assets.
- Send written notice to the apparent owner at their last known address, informing them that the holder has the assets.
- Report the assets to the Unclaimed Financial Assets Authority.
- Remit qualifying cash assets to the Unclaimed Assets Trust Fund account at the Central Bank of Kenya.
- Report qualifying non-cash assets through the [holders reporting portal](/holders/login).`,
    ],
    [
      'Holders',
      'How long do different types of assets take before being considered unclaimed?',
      `| Asset | Period before considered unclaimed |
| --- | --- |
| Money order or similar written financial or monetary instrument | 2 years from the date of issuance |
| Traveller's cheque | 2 years from the date of issuance |
| Cheque, draft or similar instrument | 2 years after it became payable or was issued |
| Demand, savings or matured time deposits; funds paid towards a share, mutual investment certificate or other interest in a financial institution | 5 years |
| Life or endowment insurance policy or annuity contract | 2 years after the funds become due |
| Assets resulting from demutualisation of an insurance policy | 2 years after demutualisation |
| Utility service deposit, such as electricity or water | 2 years after service termination |
| Court order for a refund by the holder | 2 years after it became payable |
| Ownership interest | 3 years |
| Assets from a dissolved business entity | 2 years |
| Assets held in a fiduciary capacity | 2 years after they become payable |
| Gift certificate, gift card or credit memo/note | 5 years |
| Unpaid wages | 1 year after they become payable |
| Assets held in a safe deposit box or repository | 2 years after the lease or rental period expires |`,
    ],
    [
      'Claims',
      'How do I search for and lodge a claim on unclaimed assets?',
      `Dial *361# or visit [Find & Claim](/find-claim) to search for assets.

You can also visit UFAA at Pacis Centre, 2nd Floor, Slip Road, off Waiyaki Way, Westlands, Nairobi, or post mail to:

UNCLAIMED FINANCIAL ASSETS AUTHORITY
P.O. Box 28235-00200, City Square, Nairobi

Call 020 4023 000 or +254 706 866 984, or email [info@ufaa.go.ke](mailto:info@ufaa.go.ke). You can also visit a Huduma Centre or lodge a claim on eCitizen.`,
    ],
    [
      'Claims',
      "Claimant's basic checklist",
      `Complete the appropriate claim forms, available online at [ufaa.go.ke](https://www.ufaa.go.ke) or from UFAA offices. Forms should be witnessed by a Commissioner of Oaths where required:

- Form 4A - Original Owner Claim
- Form 4B - Beneficiary Claim (deceased cases)
- Form 4C - Business Entity Claim
- Form 4D - Agent for Owner Claim
- Form 5 - Indemnity Agreement
- Claimant's bank details form and a one-page copy of a recent bank statement, deposit slip or withdrawal slip confirming the bank account details provided
- Original official letter from the holder confirming remittance of the unclaimed financial assets to the Authority
- Copy of the claimant's National ID card or passport, certified by a lawyer or magistrate
- Copy of the claimant's KRA PIN certificate
- Original affidavit if names differ between the National ID, KRA PIN and holder's documents, or if a name is initialled in any document`,
    ],
    [
      'General',
      'What is the Unclaimed Financial Assets Authority?',
      'The Unclaimed Financial Assets Authority (UFAA) is a State Corporation established under the Unclaimed Financial Assets Act, No. 40 of 2011 to receive, safeguard and reunite unclaimed financial assets with their rightful owners.',
    ],
    [
      'Claims',
      'Does it cost anything to search for or claim assets?',
      'The search and claim service is free.',
    ],
    [
      'Claims',
      'Can I check for unclaimed assets without visiting an office?',
      'Yes. You can search through the [Find & Claim](/find-claim) service or dial the USSD code *361#.',
    ],
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
