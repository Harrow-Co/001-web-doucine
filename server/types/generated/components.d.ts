import type { Schema, Struct } from '@strapi/strapi';

export interface EventActivity extends Struct.ComponentSchema {
  collectionName: 'components_event_activities';
  info: {
    description: "Activit\u00E9s propos\u00E9es lors de l'\u00E9v\u00E9nement";
    displayName: 'Activity';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventEventDetails extends Struct.ComponentSchema {
  collectionName: 'components_event_event_details';
  info: {
    description: "Informations d\u00E9taill\u00E9es sur l'\u00E9v\u00E9nement";
    displayName: "D\u00E9tails de l'\u00E9v\u00E9nement";
  };
  attributes: {
    activities: Schema.Attribute.Component<'event.activity', true>;
    contact: Schema.Attribute.String;
    destination: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    practicalInfo: Schema.Attribute.Component<'event.practical-info', true>;
    pricing: Schema.Attribute.Component<'event.pricing', true>;
    registration: Schema.Attribute.Date;
  };
}

export interface EventPracticalInfo extends Struct.ComponentSchema {
  collectionName: 'components_event_practical_infos';
  info: {
    description: "Informations pratiques pour l'\u00E9v\u00E9nement";
    displayName: 'Informations pratiques';
  };
  attributes: {
    info: Schema.Attribute.String & Schema.Attribute.Required;
    isImportant: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface EventPricing extends Struct.ComponentSchema {
  collectionName: 'components_event_pricings';
  info: {
    description: "Tarifs pour l'\u00E9v\u00E9nement";
    displayName: 'Pricing';
  };
  attributes: {
    amount: Schema.Attribute.Decimal & Schema.Attribute.Required;
    category: Schema.Attribute.String;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    includes: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'event.activity': EventActivity;
      'event.event-details': EventEventDetails;
      'event.practical-info': EventPracticalInfo;
      'event.pricing': EventPricing;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
