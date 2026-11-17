import type { Schema, Struct } from '@strapi/strapi';

export interface SharedContentSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_sections';
  info: {
    displayName: 'Content section';
    icon: 'file';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_images';
  info: {
    displayName: 'Gallery image';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_links';
  info: {
    displayName: 'Navigation link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'file';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 170;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
    icon: 'file';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: 'Step';
    icon: 'file';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.content-section': SharedContentSection;
      'shared.gallery-image': SharedGalleryImage;
      'shared.navigation-link': SharedNavigationLink;
      'shared.seo': SharedSeo;
      'shared.stat': SharedStat;
      'shared.step': SharedStep;
    }
  }
}
