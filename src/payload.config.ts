import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import Slides from './collections/Slides';
import AboutUs from './globals/AboutUs';
import WorkProcess from './collections/WorkProcess';
import Testimonials from './collections/Testimonials';
import Services from './collections/Services';
import Projects from './collections/Projects';
import Skills from './globals/Skills';
import WhyChooseUs from './globals/WhyChooseUs';
import Faqs from './collections/Faqs';
import FaqSettings from './globals/FaqSettings';
import TickerSettings from './globals/TickerSettings';
import TeamMembers from './components/TeamMembers';
import TeamSettings from './globals/TeamSettings';
import BlogPosts from './collections/BlogPosts';
import BlogCategories from './collections/BlogCategories';
import BlogSettings from './globals/BlogSettings';
import ContactInfo from './globals/ContactInfo';
import FaqCategories from './collections/FaqCategories';
import GalleryImages from './collections/GalleryImages';
import GalleryVideos from './collections/GalleryVideos';
import GallerySettings from './globals/GallerySettings';
import ServiceCategories from './collections/ServiceCategories';
import Navigation from './collections/Navigation';
import Footer from './collections/Footer';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Slides,
    WorkProcess,
    Testimonials,
    Services,
    ServiceCategories,
    Projects,
    Faqs,
    TeamMembers,
    BlogPosts,
    BlogCategories,
    FaqCategories,
    GalleryImages,
    GalleryVideos,
    Navigation,
    Footer,
  ],
  globals: [
    AboutUs,
    Skills,
    WhyChooseUs,
    FaqSettings,
    TickerSettings,
    TeamSettings,
    BlogSettings,
    ContactInfo,
    GallerySettings,

  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
});
