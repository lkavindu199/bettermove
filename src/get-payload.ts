import payload from 'payload';
import config from './payload.config';

export const getPayloadClient = async () => {
  if (!payload.config) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      config,
      local: true,
    });
  }

  return payload;
};
