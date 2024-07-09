import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items,title, coverImg}) => {
    return (
      <>
        <div className="pt-8">
          {title && <Cover img={coverImg} title={title}></Cover>}
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 mt-16">
            {items.map((item) => (
              <MenuItem key={item._id} item={item}></MenuItem>
            ))}
          </div>
          <Link to={`/order/${title}`}>
            {" "}
            <button className="btn border-b-2 border-b-orange-500 my-4">
              Read More
            </button>
          </Link>
        </div>
      </>
    );
};

export default MenuCategory;