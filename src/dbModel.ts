import mongoose from "mongoose";
import apiModelData from "./dbInterface";

const apiSchema = new mongoose.Schema<apiModelData>({
    TENANT: {
      type: String,
      require: true
    },
    METHOD: {
      type: String,
      require: true
    },
    UPSTREAM_PROTOCOL: {
      type: String,
      require: true
    },
    UPSTREAM_DOMAIN: {
      type: String,
      require: true
    },
    UPSTREAM_PORT: {
      type: Number,
      require: true
    },
    UPSTREAM_ENDPOINT: {
      type: String,
      require: true
    },
    DOWNSTREAM_ENDPOINT: {
      type: String,
      require: true
    }
});

const apiModel =  mongoose.model<apiModelData>('apiData', apiSchema);
export default apiModel;