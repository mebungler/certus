import React from "react";

export default ({time_span,product_id}) => (
    <tr>
        <td>Product</td>
        <td>{product_id}</td>
    <td className="td-name">
        {Math.floor(time_span/60)} minutes {time_span%60} seconds
    </td>
    </tr>
);
