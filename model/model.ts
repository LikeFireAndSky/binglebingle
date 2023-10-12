import mongoose, { Schema } from 'mongoose';

export interface BINGLEC extends mongoose.Document {
	title: string;
	content: string;
}

const BINGLECSchema = new Schema<BINGLEC>(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'binglebingle_collection',
	},
);

export default mongoose.models.BINGLEC ||
	mongoose.model<BINGLEC>('BINGLEC', BINGLECSchema);
