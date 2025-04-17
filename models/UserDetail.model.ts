import mongoose, { Schema, model, models } from "mongoose";

export interface IAddress {
  country: string;
  city: string;
}

export interface IEducation {
  institute: string;
  degree_type: string;
  subject: string;
  start_year: string;
  start_month: string;
  end_year: string;
  end_month: string;
  description: string;
}

export interface IWork {
  job_title: string;
  company_name: string;
  employment_type: string;
  city: string;
  country: string;
  start_year: string;
  start_month: string;
  end_year: string;
  end_month: string;
  description: string

}
export interface ILanguage {
  name: string;
  proficiency: string;
}

export interface IUserDetail {
  user_id: string;
  first_name: string;
  last_name: string;
  headline: string;
  email: string;
  address: IAddress;
  education: IEducation[];
  work: IWork[];
  profile_image: string;
  cover_image: string;
  about: string;
  skill: string[];
  language: ILanguage[];
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const AddressSchema = new Schema<IAddress>({
  country: { type: String },
  city: { type: String },
});

const EducationSchema = new Schema<IEducation>({
  institute: { type: String },
  degree_type: { type: String },
  subject: { type: String },
  start_month: { type: String },
  start_year: { type: String },
  end_month: { type: String },
  end_year: { type: String },
  description: { type: String },
});

const WorkSchema = new Schema<IWork>({
  job_title: { type: String },
  company_name: { type: String },
  employment_type: { type: String },
  city: { type: String },
  country: { type: String },
  start_month: { type: String },
  start_year: { type: String },
  end_month: { type: String },
  end_year: { type: String },
  description: { type: String },
});

const LanguageSchema = new Schema<ILanguage>({
  name: { type: String },
  proficiency: { type: String },
});

const userDetailSchema = new Schema<IUserDetail>(
  {
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    headline: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: AddressSchema },
    education: [EducationSchema],
    work: [WorkSchema],
    profile_image: {
      type: String,
      default:
        "https://ik.imagekit.io/ConnectIn/ProfilePlaceholder.jpg?updatedAt=1743518582814",
    },
    cover_image: {
      type: String,
      default: "https://ik.imagekit.io/ConnectIn/placeholder.svg?updatedAt=1743836732290",
    },
    about: { type: String },
    skill: [{ type: String}],
    language: [LanguageSchema]
  },
  { timestamps: true }
);

const UserDetail =
  models?.UserDetail || model<IUserDetail>("UserDetail", userDetailSchema);

export default UserDetail;
