import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CheckinSchema = new mongoose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CheckinSchema.plugin(mongoosePaginate);

export default mongoose.model('Checkins', CheckinSchema);
