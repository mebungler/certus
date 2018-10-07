import React from "react";

export default class List extends React.Component {
  state = {
    search: ""
  };
  render() {
    const { title, header: Header, itemTemplate: Item } = this.props;
    return (
      <div className="card">
        <div className="card-header card-header-rose card-header-icon">
          <div className="card-icon">
            <i className="material-icons">assignment</i>
          </div>
          <div className="card-title">{title}</div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <div className="pull-right text-right" />
            </div>
            <div className="col-md-4">
              <div className="input-group no-border">
                <input
                  value=""
                  className="form-control"
                  placeholder="Search..."
                  type="text"
                  onChange={val => {
                    this.setState({ search: val });
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-rose btn-round btn-just-icon"
                  // onClick={this.props.search(this.state.search)}
                >
                  <i className="material-icons">search</i>
                  <div className="ripple-container" />
                </button>
                <div className="dropdown pull-right">
                  <button
                    type="submit"
                    id="moreLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    className="btn btn-rose btn-round btn-just-icon"
                  >
                    ...
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="moreLink"
                  >
                    <a
                      className="dropdown-item"
                      onClick={this.props.edit}
                      href="#"
                    >
                      Edit
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={this.props.add}
                      href="#"
                    >
                      Add
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-shopping">
              <Header />
              <tbody>
                {this.props.items&&this.props.items.map((item, index) => {
                  return <Item key={index} {...item} edit={this.props.edit} />;
                })}
                <tr>
                  <td colSpan="3" />
                  <td className="pull-right">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">
                            <i
                              className="fa fa-angle-double-left"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3<div className="ripple-container" />
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#link" aria-label="Next">
                          <span aria-hidden="true">
                            <i
                              className="fa fa-angle-double-right"
                              aria-hidden="true"
                            />
                          </span>
                          <div className="ripple-container" />
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
