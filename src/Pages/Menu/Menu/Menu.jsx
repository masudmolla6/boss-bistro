import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter((item) => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const pizza = menu.filter(item => item.category === "pizza");
    const salad = menu.filter(item => item.category === "salad");
    const offered = menu.filter(item => item.category === "offered");
    return (
      <div>
        <Helmet>
          <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* main Cover */}
            <Cover img={menuImg} title={"Our Menu"}></Cover>
            
            {/* offered */}
        <SectionTitle
          heading={"TODAY'S OFFER"}
          subHeading={"---Don't miss---"}
        ></SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
            
            {/* Desserts */}
        <MenuCategory items={desserts} title={"desserts"} coverImg={dessertImg}></MenuCategory>
            {/* pizza */}
        <MenuCategory items={pizza} title={"Pizza"} coverImg={pizzaImg}></MenuCategory>
            {/* Desserts */}
        <MenuCategory items={salad} title={"salad"} coverImg={saladImg}></MenuCategory>
            {/* Desserts */}
        <MenuCategory items={soup} title={"soup"} coverImg={soupImg}></MenuCategory>

      </div>
    );
};

export default Menu;