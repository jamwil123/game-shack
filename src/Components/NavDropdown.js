import React from 'react'
import { getQueryCategories } from "../utils/api";
export default function NavDropdown({categories, setReviews}) {

    const handleClick = (e) => {
        getQueryCategories(e.target.value).then((res) => {
          setReviews(res);
        });
      };

return (

    <select onChange={handleClick} className="NavDropdown">
        <option>All categories</option>
        {categories.map((category) => {
            
          return (
            <React.Fragment className = 'NavDropDownMenu'>
              <option value={category.slug}>{category.slug.replace(/-/, ' ')}</option>;
            </React.Fragment>
          );
        })}
      </select>
) 

}
