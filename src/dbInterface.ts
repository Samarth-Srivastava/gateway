interface apiModelData extends Document {
    TENANT: string;
    METHOD: string;
    UPSTREAM_PROTOCOL: string;
    UPSTREAM_DOMAIN: string;
    UPSTREAM_PORT: number;
    UPSTREAM_ENDPOINT: string;
    DOWNSTREAM_ENDPOINT: string;
  }

export default apiModelData;