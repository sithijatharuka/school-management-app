// // DynamicForm.jsx
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import InputField from "../InputField/InputField";
// import styles from "@/components/FormModel/FormModel.module.css";

// const DynamicForm = ({ schema, submitHandler, title, fields }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   return (
//     <form action={submitHandler} className={styles.wrapper}>
//       <h1>{title}</h1>
//       <div className={styles.elementBox}>
//         {fields.map((field) => (
//           <InputField
//             key={field.name}
//             label={field.label}
//             name={field.name}
//             type={field.type || "text"}
//             register={register}
//             error={errors[field.name]}
//           />
//         ))}
//       </div>

//       <button type="submit" className={styles.createBtn}>
//         Create
//       </button>
//     </form>
//   );
// };

// export default DynamicForm;
