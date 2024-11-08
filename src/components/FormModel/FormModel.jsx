"use client";
import styles from "@/components/FormModel/FormModel.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";
import Image from "next/image";
import { addStudent } from "@/lib/actions";
import { useState } from "react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  parentPhone: z.string().min(1, { message: "Phone is required!" }),
  studentPhone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

// type Inputs = z.infer<typeof schema>;

const FormModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    // <form action={addStudent}>
    //   <h1>Create a New Student</h1>
    //   <input type="text" name="username" required />
    //   <br />
    //   <button type="submit">Create</button>
    // </form>
    // form
    <form action={addStudent} className={styles.wrapper}>
      <h1>Create a new teacher</h1>
      <span>Authentication Information</span>
      <div className={styles.elementBox}>
        <InputField
          label="Username"
          name="username"
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors?.password}
        />
      </div>
      <span>Personal Information</span>
      <div className={styles.elementBox}>
        <InputField
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Parent Phone Number"
          name="parentsPhone"
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Student Phone Number"
          name="studentPhone"
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          register={register}
          error={errors.bloodType}
        />
        {/* <InputField
          label="Birthday"
          name="birthday"
          register={register}
          error={errors.birthday}
          type="date"
        /> */}
        {/* </div>
      <div className={styles.elementBox}>
        <div>
          <select className={styles.inputStyle} {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className={styles.errText}>{errors.sex.message.toString()}</p>
          )}
        </div> */}
        {/* UPLOAD BUTTON */}
        {/* <div className={styles.itemBox}>
          <label htmlFor="img" className={styles.label}>
            <Image src="/upload.png" alt="" height={28} width={28} />
            <span>Upload a Photo</span>
          </label>
          <input
            className={styles.input}
            type="file"
            name=""
            id="img"
            {...register("img")}
          />
          {errors.img?.message && (
            <p className={styles.errText}>{errors.img.message.toString()}</p>
          )}
        </div> */}
      </div>

      <button type="submit" className={styles.createBtn}>
        Create
      </button>
    </form>
  );
};

export default FormModel;
