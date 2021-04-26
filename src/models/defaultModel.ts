import mongoose, { Schema, Document } from "mongoose";
import { OptionBoolean } from "../enums/NumberBooleanStringObject";

export interface DefaultModelInterface extends Document {
  Key: any;
  Value: any;
  exists: OptionBoolean;
}

const DefaultModelSchema: Schema = new Schema({
  Key: Schema.Types.Mixed,
  Value: Schema.Types.Mixed,
  exists: Schema.Types.Boolean,
});

export default mongoose.model<DefaultModelInterface>(
  "defaultmodel",
  DefaultModelSchema
);
