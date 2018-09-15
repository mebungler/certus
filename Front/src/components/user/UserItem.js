import React from "react";
import { url } from "../../api/api";

export default user => {
  let imageUrl = url + "/public/images/user/" + user.id;
  let icon = "fa fa-tshirt";
  let usrType = "seamstress";
  switch (user.type) {
    case 1:
      usrType = "Cutter";
      icon = "fa fa-cut";
      break;
    case 2:
      icon = "fa fa-tshirt";
      usrType = "seamstress";
      break;
    case 3:
      usrType = "Controller";
      icon = "fa fa-cog";
      break;
    default:
      usrType = "Admin";
      icon = "fa fa-laptop-code";
  }
  return (
    <tr>
      <td>
        <img
          className="img"
          src={user.photo}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50px"
          }}
        />
      </td>
      <td className="td-name">
        <a href="#" onClick={() => user.editUser(user)}>
          {user.firstName} {user.lastName}
        </a>
        <br />
        <small>{user.email}</small>
      </td>
      <td>
        <span className={icon} /> {usrType}
      </td>
    </tr>
  );
};
