import { GlobalConfig } from 'payload/types';

const WhyChooseUs: GlobalConfig = {
  slug: 'why-choose-us',
  access: {
    read: () => true,
  },
  label: 'Why Choose Us Section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: "Why we're the preferred choice"
    },
    {
      name: 'highlightedText',
      type: 'text',
      required: true,
      defaultValue: "for moving"
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true
        }
      ],
      defaultValue: [
        { benefit: "Timely service with no hidden fees." },
        { benefit: "Safe, secure transport for your belongings." },
        { benefit: "Customized moving plans to fit your needs." },
        { benefit: "Eco-friendly practices for a sustainable move." }
      ]
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: "request a quote"
    },
    {
      name: 'moveTypes',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          name: 'value',
          type: 'text',
          required: true
        }
      ],
      defaultValue: [
        { label: "Residential Moving", value: "residential_moving" },
        { label: "Commercial Moving", value: "commercial_moving" },
        { label: "Specialty Item Moving", value: "specialty_item" }
      ]
    },
    {
      name: 'serviceTypes',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          name: 'value',
          type: 'text',
          required: true
        }
      ],
      defaultValue: [
        { label: "Residential Moving", value: "residential_moving" },
        { label: "Commercial Moving", value: "commercial_moving" },
        { label: "Specialty Item Moving", value: "specialty_item" }
      ]
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: "contact us now"
    }
  ]
};

export default WhyChooseUs;