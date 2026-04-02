import mongoose,{Schema,model} from "mongoose";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  category: {
    type: String,
    enum: ["ثقافه قانونيه", "اخبار المكتب", "شروحات الانظمه"],
    required: true
  },

  author: {
    type: String,
    enum: [
      "د. محمد العتيبي",
      "أ.ليلى خالد",
      "أ.فهد بن سلمان",
      "أ.نورة الحربي",
      "أ.عبدالله الشهري"
    ],
    required: true
  },

  image: String,

  metaDescription: String,

  keywords: {
    type: [String],
    default: []
  },

 
  status: {
    type: String,
    enum: ["published", "draft"],
    default: "draft"
  },

  views: {
    type: Number,
    default: 0
  }

}, { timestamps: true });
const articleModel=mongoose.models.Article||model('Article',articleSchema)
export default articleModel