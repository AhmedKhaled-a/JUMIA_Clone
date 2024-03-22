import React from "react";
import { Link } from "react-router-dom";
import { homeServices } from "../services/_home";

const FilterCategory = (props) => {
  const [cats, setCats] = React.useState();

  React.useEffect(() => {
    homeServices.getAllCats().then(
      (data) => {        
        setCats(data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [setCats]);

  return (
    <div className="card mb-3">
      <div className="card-header font-weight-bold text-uppercase">
        Categories
      </div>
      <ul className="list-group list-group-flush">
        {cats &&
          cats.map((item) => (
            <li className="list-group-item">
              <Link
                to={`/category/${item.nameEn}`}
                className="text-decoration-none stretched-link"
              >
                {item.nameEn}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
