// @ts-check
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // Use KV for ISR cache
  isr: {
    cacheBucket: {
      bucketName: 'cinawalletkit-isr-cache',
    },
  },
});
