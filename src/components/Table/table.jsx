// import styles from "@/components/Table/table.module.css";

// const Table = ({ columns, renderRow, data }) => {
//   return (
//     <table className={styles.customTable}>
//       <thead>
//         <tr className={styles.headerText}>
//           {columns.map((col) => (
//             <th key={col.accessor}>{col.header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>{data.map((item) => renderRow(item))}</tbody>
//     </table>
//   );
// };

// export default Table;

/// new

import React from "react";
import styles from "@/components/Table/table.module.css";

// Table Component: Takes columns, renderRow, data, and optional custom styling
const Table = ({ columns, renderRow, data, className }) => {
  return (
    <div className={`${styles.tableContainer} ${className || ""}`}>
      <table className={styles.customTable}>
        <thead>
          <tr className={styles.headerText}>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </div>
  );
};

export default Table;
